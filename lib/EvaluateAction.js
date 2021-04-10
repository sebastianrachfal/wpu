module.exports = function EvaluateAction(action, logger) {
	const { type, params, schema } = action;
	switch (type) {
		case 'schema':
			require('./Actions/Schema')(schema, params, logger);
			break;
		default:
			logger.error(`Invalid action type(type provided: '${type}')`);
	}
};
