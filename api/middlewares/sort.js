module.exports = (req, _, next) => {
	if (req.query['sort'] && req.query['sort'].length) {
		const [field, sortOrder = 'asc'] = req.query['sort'].split(',');
		req.sort = {
			[field]: sortOrder.toLowerCase() === 'desc' ? -1 : 1,
		};
	}
	next();
};
