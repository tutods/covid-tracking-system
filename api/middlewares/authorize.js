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
				next({
					message: "Not authorized",
					status: 403,
				});
			}
		} else {
			next({
				message: 'Not Authenticated',
				status: 401,
			});
		}
	};
};

module.exports = authorize;
