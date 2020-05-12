// Model
const covidTest = require("../models/CovidTest");

//Path
const path = './public/covidTests/';

const covidTestController  = () => {
  const getOneAndUpdate = (req, res) => {
    const id = req.params.id;
    const data = req.body;

    data.pathFile = `${path}test_${req.params.id}.pdf`;

    covidTest.findOneAndUpdate(
      { _id: id },
      data,
      { runValidators: true },
      (error, data) => {
        const response = error
          ? { status: 401, body: error }
          : { status: 200, body: data };

        res.status(response.status).json(response.body);
      }
    );
  };

  return {getOneAndUpdate};
};

module.exports = covidTestController();