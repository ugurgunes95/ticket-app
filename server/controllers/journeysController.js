const connectToMongoDB = require("../helpers/mongo");
const ObjectId = require("mongodb").ObjectId;

const journeysController = async (req, res) => {
  try {
    connectToMongoDB().then(async ({ db }) => {
      const journeys = await db.collection("journeys").find({}).toArray();

      return res.status(200).json({ journeys });
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Bir hata oluştu daha sonra tekrar deneyin" });
  }
};

const filteredJourneysController = async (req, res) => {
  try {
    const { from, to } = req.body;
    connectToMongoDB().then(async ({ db }) => {
      const journeys = await db
        .collection("journeys")
        .find({ $and: [{ from: from }, { to: to }] })
        .project({ _id: 1, from: 1, to: 1, ticketPrice: 1, startedDate: 1 })
        .toArray();

      return res.status(200).json({ journeys });
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Bir hata oluştu daha sonra tekrar deneyin" });
  }
};

const journeyDetailsController = async (req, res) => {
  try {
    const { id } = req.params;

    connectToMongoDB().then(async ({ db }) => {
      const journey = await db
        .collection("journeys")
        .find({ _id: new ObjectId(id) })
        .toArray();

      return res.status(200).json({ journey });
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Bir hata oluştu daha sonra tekrar deneyin" });
  }
};

module.exports = {
  journeysController,
  filteredJourneysController,
  journeyDetailsController,
};
