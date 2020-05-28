module.exports = (req, res, next) => {
	const timeStarted = Date.now();
	console.log(`${req.method} ${req.originalUrl} [STARTED]`);

	res.on('finish', () => {
		const timeEnded = Date.now();
		console.log(
			`${req.method} ${req.originalUrl} [FINISHED] in ${
				timeEnded - timeStarted
			}ms`
		);
	});

	res.on('close', () => {
		console.log(`${req.method} ${req.originalUrl} [CLOSED]`);
	});

	next();
};
