const errorHandler = (err, req, res, next) => {
	// use the error's status or default to 500
	res.status(err.status || 500);

	// send back json data
	res.send({
		message: err.message,
	});
};

module.exports = errorHandler;
