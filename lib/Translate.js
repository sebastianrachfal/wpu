module.exports = {
	withParams: (str, params) => {
		let ret = str;
		params
			.map((param) => [`$!{${param[0]}}`, param[1]])
			.forEach((param) => {
				while (ret.indexOf(param[0]) > -1) {
					ret = ret.replace(param[0], param[1]);
				}
			});
		return ret;
	},
};
