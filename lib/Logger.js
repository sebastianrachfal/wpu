const colors = require('colors');

module.exports = (prefix) => new Logger(prefix);

function Logger(prefix) {
	this.prefix = colors.bold(colors.magenta(`[${prefix}]`));
	this.COLORS = colors;

	this.log = function (message, subtype = '') {
		console.log(`${this.prefix}${subtype} ${colors.green(message)}`);
	};

	this.info = function (message, subtype = '') {
		console.log(`${this.prefix}${subtype} ${colors.gray(message)}`);
	};

	this.error = function (message, subtype = '') {
		console.log(`${this.prefix}${subtype} ${colors.red(message)}`);
	};
	this.subtype = function (type, color = colors.blue) {
		const subtype = color(`[${type}]`);
		return {
			log: (message) => this.log(message, subtype),
			info: (message) => this.info(message, subtype),
			error: (message) => this.error(message, subtype),
		};
	};
}
