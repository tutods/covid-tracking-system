const authorize = (opts) => {
	opts = opts || [];

	return (req, res, next) => {
		if (req.user) {
			const hasOneScope = opts.some((accessScope) => {
				return req.user.scopes.includes(accessScope);
			});

			if (hasOneScope) {
				next();
			} else {
				next('Not authorized');
			}
		} else {
			next('Not authenticated');
		}
	};
};

module.exports = authorize;
