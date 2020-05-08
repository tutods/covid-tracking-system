const authorize = (opts) => {
	opts = opts || [];

	return (req, res, next) => {
		if (!req.user) {
			next('Not authenticated');
		}

		console.log(req);

		const hasAuthorization = opts.includes(req.user);
		console.log('[AUTHORIZATION]', hasAuthorization);

		if (hasAuthorization) {
			next();
		} else {
			next('Not authorized');
		}
	};
};

module.exports = authorize;
