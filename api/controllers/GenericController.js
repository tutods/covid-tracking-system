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

	const getById = (req, res) => {
		const id = req.params.id;

		model.findOne({ _id: id }, (error, data) => {
			const response = error
				? { status: 403, body: error }
				: { status: 200, body: data };

			res.status(response.status).send(response.body);
		});
	};

	const create = (req, res) => {
		const data = req.body;

		new model(data).save((error, data) => {
			const response = error
				? { status: 403, body: error }
				: { status: 200, body: data };

			res.status(response.status).send(response.body);
		});
	};

	const getOneAndUpdate = (req, res) => {
		const id = req.params.id;
		const data = req.body;

		model.findOneAndUpdate(id, data, (error, data) => {
			const response = error
				? { status: 403, body: error }
				: { status: 200, body: data.id };

			res.status(response.status).send({ status: response.body });
		});
	};

	const getOneAndDelete = (req, res) => {
		const id = req.params.id;

		model.findOneAndDelete(id, (error, data) => {
			const response = error
				? { status: 403, body: error }
				: { status: 200, body: data.id };

			res.status(response.status).send({ status: response.body });
		});
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
