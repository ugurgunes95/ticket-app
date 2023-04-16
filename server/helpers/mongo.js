require("dotenv").config();
const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connectToMongoDB = async () => {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    const db = client.db(process.env.MONGODB_DATABASE || "taskdatabase");
    return { db, client };
  } catch (err) {
    console.error(err);
    throw err;
  }
};

module.exports = connectToMongoDB;
