const connectToMongoDB = require("../helpers/mongo");

const buyTicketController = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Bir hata oluştu daha sonra tekrar deneyin" });
  }
};

const listTicketsController = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Bir hata oluştu daha sonra tekrar deneyin" });
  }
};

module.exports = { buyTicketController, listTicketsController };
