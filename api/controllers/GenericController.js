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
					message: `${model} not found!`,
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

	const create = async (req, res, next) => {
		const data = req.body;

		try {
			const newModel = await new model(data).save();

			let response;

			if (newModel) {
				response = { status: 201, message: newModel };
			} else {
				response = {
					status: 400,
					message: { message: `Error on create ${model}` },
				};
			}

			res.status(response.status).json(response.message);
		} catch (catchError) {
			next({
				message: catchError,
				status: 400,
			});
		}
	};

	const getOneAndUpdate = async (req, res, next) => {
		const id = req.params.id;
		const data = req.body;

		try {
			const founded = await model.findOne({ _id: id });

			let response;
			if (founded) {
				const updated = await founded.updateOne(data, {
					runValidators: true,
					new: true,
				});

				response = {
					status: 200,
					message: updated,
				};
			} else {
				response = {
					status: 404,
					message: `${model} not founded!`,
				};
			}

			res.status(response.status).json(response.message);
		} catch (catchError) {
			next({
				status: 400,
				message: catchError.errmsg,
			});
		}
	};

	const getOneAndDelete = async (req, res, next) => {
		const id = req.params.id;

		try {
			const founded = await model.findOne({ _id: id });

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
