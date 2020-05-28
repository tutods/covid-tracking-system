const genericController = (model) => {
	const getAll = (req, res) => {
		let query = model.find(req.filters);

		if (req.sort) {
			query = query.sort(req.sort);
		}

		query.then((data) => {
			res.send(data);
		});
	};

	const getById = async (req, res, next) => {
		const id = req.params.id;

		try {
			const founded = await model.findOne({ _id: id });

			let response;

			if (founded) {
				response = {
					message: founded,
					status: 200,
				};
			} else {
				response = {
					message: `${id} not found!`,
					status: 404,
				};
			}

			res.status(response.status).json({ message: response.message });
		} catch (catchError) {
			next({
				message: catchError,
				status: 404,
			});
		}
	};

	const create = (req, res) => {
		const data = req.body;

		new model(data).save((error, data) => {
			const response = error
				? { status: 400, body: error }
				: { status: 201, body: data };

			res.status(response.status).json(response.body);
		});
	};

	const getOneAndUpdate = async (req, res, next) => {
		const id = req.params.id;
		const data = req.body;

		try {
			const founded = await model.findOne({ _id: id });
			let response;

			if (founded) {
				const updated = await founded.update(data, {
					runValidators: true,
				});

				response = {
					status: 200,
					message: updated,
				};
			} else {
				response = {
					status: 404,
					message: `${id} not found and not updated!`,
				};
			}

			res.status(response.status);
		} catch (catchError) {
			next({
				status: 400,
				message: catchError,
			});
		}

		model.findOneAndUpdate(
			{ _id: id },
			data,
			{ runValidators: true },
			(error, data) => {
				const response = error
					? { status: 400, body: error }
					: { status: 200, body: data };

				res.status(response.status).json(response.body);
			}
		);
	};

	const getOneAndDelete = async (req, res, next) => {
		const id = req.params.id;

		try {
			const founded = await model.findOne(id);

			if (founded) {
				const data = await founded.delete();

				res.status(200).json(data);
			} else {
				res.status(404).json({ message: `${id} not found` });
			}
		} catch (catchError) {
			next({
				message: catchError,
				status: 400,
			});
		}
	};

	return {
		getAll,
		getById,
		create,
		getOneAndUpdate,
		getOneAndDelete,
	};
};

module.exports = genericController;
