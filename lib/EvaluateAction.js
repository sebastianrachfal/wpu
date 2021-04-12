module.exports = function EvaluateAction(action, params, logger) {
	const { type, schema } = action;
	switch (type) {
		case 'schema':
			require('./Actions/Schema')(schema, params, logger);
			break;
		default:
			logger.error(`Invalid action type(type provided: '${type}')`);
	}
};
