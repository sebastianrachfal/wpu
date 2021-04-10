#!/usr/bin/env node
const path = require('path');

const Logger = require('../lib/Logger')('WPU');
const Execute = require('../lib/Execute');
const EvaluateAction = require('../lib/EvaluateAction');

const config = require(path.join(process.cwd(), 'wpu.config.js'));
const args = process.argv.slice(2);

const actions = Object.keys(config);
Logger.info(`Found ${actions.length} actions in 'wpu.config.js'`);

let currentAction = undefined;

// Get chosen action
if (!(currentAction = config[args[0]]))
	currentAction = ((config, action) => {
		for (let item in config)
			if (config[item].alt?.includes(action)) return config[item];
	})(config, args[0]);
if (!currentAction) {
	Logger.error(`Action '${args[0]}' was not found`);
	process.exit(0);
}

// Execute pre actions
const preLength = currentAction?.run?.pre?.length;
if (preLength > 0) {
	Logger.info(`Executing ${preLength} found pre-run commands`);
	Execute(currentAction.run.pre, Logger);
}

EvaluateAction(currentAction, Logger);

// Execure post actions
const postLength = currentAction?.run?.post?.length;
if (postLength > 0) {
	Logger.info(`Executing ${postLength} found post-run commands`);
	Execute(currentAction.run.post, Logger);
}
