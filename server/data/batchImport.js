require("dotenv").config();

const { MongoClient } = require("mongodb");
const companies = require("./companies.json");
const items = require("./items.json");

const { CONNECTION_STRING_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const batchImport = async () => {
  const client = new MongoClient(CONNECTION_STRING_URI, options);

  const db = client.db("concordiadb");

  try {
    await client.connect();
    console.log("connected to db!");
    await db.collection("companies").insertMany(companies);
    await db.collection("items").insertMany(items);
  } catch (err) {
    console.log(err);
  }
};

batchImport();

module.exports = { batchImport };
