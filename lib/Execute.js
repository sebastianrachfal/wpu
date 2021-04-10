const { execSync } = require('child_process');

module.exports = function Execute(items, logger) {
	items?.forEach((item) => {
		logger
			.subtype('COMMANDS', logger.COLORS.brightCyan)
			.info(`Running command '${item}'`);
		try {
			logger
				.subtype('STDOUT')
				.log(execSync(item, { stdio: 'pipe' }).toString());
		} catch (error) {
			if (error.stderr) {
				logger.subtype('ERR').error(error.message);
				return;
			}
			if (error.stderr) {
				logger.subtype('STDERR').error(stderr);
				return;
			}
			logger.subtype('STDOUT').log(error.stdout);
		}
	});
};
