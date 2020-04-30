const genericController = (model) => {
	const getAll = (req, res) => {
		// TODO implement filter and sort middleware
		model.find({}, (error, data) => {
			const response = error
				? { code: 500, body: error }
				: { code: 200, body: data };

			res.status(response.status).json(response.body);
		});
	};

	const getById = (req, res) => {
		const id = red.params.id;

		model.findOne({ _id: id }, (error, data) => {
			const response = error
				? { code: 500, body: error }
				: { code: 200, body: data };

			res.status(response.status).json(response.body);
		});
	};

	const create = (req, res) => {
		const data = req.body;

		new model(data).save((error, data) => {
			const response = error
				? { code: 500, body: error }
				: { code: 200, body: data };

			res.status(response.status).json(response.body);
		});
	};

	const getOneAndUpdate = (req, res) => {
		const id = req.params.id;
		const data = req.body;

		model.findOneAndUpdate(id, data, (error, data) => {
			const response = error
				? { code: 500, body: error }
				: { code: 200, body: `Updated id ${data.id}` };

			res.status(response.status).json({ status: response.body });
		});
	};

	const getOneAndDelete = (req, red) => {
		const id = req.params.id;

		model.findOneAndDelete(id, (error, data) => {
			const response = error
				? { code: 500, body: error }
				: { code: 200, body: `Deleted id ${data.id}` };

			res.status(response.code).json(response.body);
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
