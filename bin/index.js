#!/usr/bin/env node
const path = require('path');

const Logger = require('../lib/Logger')('WPU');
const Execute = require('../lib/Execute');
const EvaluateAction = require('../lib/EvaluateAction');
const { withParams } = require('../lib/Translate');

const errorExit = (message) => {
	Logger.error(message);
	process.exit(0);
};

const config = require(path.join(process.cwd(), 'wpu.config.js'));
const args = process.argv.slice(2);

const actions = Object.keys(config);
Logger.info(`Found ${actions.length} actions in 'wpu.config.js'`);

// List options
if (args?.length == 0) {
	//TODO: list options
	errorExit('You must specify some parameters');
}

let currentAction = undefined;

// Get chosen action
if (!(currentAction = config[args[0]]))
	currentAction = ((config, action) => {
		for (let item in config)
			if (config[item].alt?.includes(action)) return config[item];
	})(config, args[0]);
if (!currentAction) errorExit(`Action '${args[0]}' was not found`);

// Map params from arguments
const mappedParams = (() => {
	let ret = [];
	for (
		let i = 0, keys = Object.keys(currentAction.params);
		i < keys.length;
		i++
	) {
		if (!args[i + 1] && keys[i][0] != '!')
			errorExit(
				`Param '${keys[i]}' is not optional(${keys[i]}: ${
					currentAction.params[keys[i]]
				})`
			);
		ret.push([keys[i].replace('!', ''), args[i + 1]]);
	}
	return ret;
})();

// Run config-specified pre/post commands
const runActions = (action, type) => {
	const len = action?.run[type]?.length;
	if (len > 0) {
		Logger.info(`Executing ${len} found ${type}-run commands`);
		Execute(
			action.params
				? action.run[type].map((command) =>
						withParams(command, mappedParams)
				  )
				: action.run[type],
			Logger
		);
	}
};

// Execute pre actions
runActions(currentAction, 'pre');

// Evaluate action
EvaluateAction(currentAction, mappedParams, Logger);

// Execure post actions
runActions(currentAction, 'post');
