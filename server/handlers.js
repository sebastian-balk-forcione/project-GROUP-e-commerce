require("dotenv").config();
const { MongoClient } = require("mongodb");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const { CONNECTION_STRING_URI } = process.env;

// :: Items Endpoints ----------
const getItems = async (req, res) => {
  const client = new MongoClient(CONNECTION_STRING_URI, options);
  const db = client.db("concordiadb");
  try {
    await client.connect();
    const items = await db.collection("items").find().toArray();
    if (items) {
      return res
        .status(200)
        .json({ status: 200, data: items, message: "success" });
    } else {
      return res.status(404).json({
        status: 404,
        data: null,
        message:
          "failed to retreive items data, please contact the system administrator or try again later",
      });
    }
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
};

const getItem = async (req, res) => {
  const client = new MongoClient(CONNECTION_STRING_URI, options);
  const db = client.db("concordiadb");
  const _id = parseInt(req.params._id);
  try {
    await client.connect();
    const itemfound = await db.collection("items").findOne({ _id: _id });
    if (itemfound) {
      return res
        .status(200)
        .json({ status: 200, data: itemfound, message: "success" });
    } else {
      return res.status(404).json({
        status: 404,
        data: null,
        message:
          "failed to retreive items data, please contact the system administrator or try again later",
      });
    }
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
};

// :: Companies Endpoints ----------
const getCompanies = async (req, res) => {
  const client = new MongoClient(CONNECTION_STRING_URI, options);
  const db = client.db("concordiadb");
  try {
    await client.connect();

    const items = await db.collection("companies").find().toArray();

    if (items) {
      return res
        .status(200)
        .json({ status: 200, data: items, message: "success" });
    } else {
      return res.status(404).json({
        status: 404,
        data: null,
        message:
          "failed to retreive companies data, please contact the system administrator or try again later",
      });
    }
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
};

const getCompany = async (req, res) => {
  const client = new MongoClient(CONNECTION_STRING_URI, options);
  const db = client.db("concordiadb");
  const _id = parseInt(req.params._id);
  try {
    await client.connect();
    const itemfound = await db.collection("companies").findOne({ _id: _id });
    if (itemfound) {
      return res
        .status(200)
        .json({ status: 200, data: itemfound, message: "success" });
    } else {
      return res.status(404).json({
        status: 404,
        data: null,
        message:
          "failed to retreive items data, please contact the system administrator or try again later",
      });
    }
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
};

// :: Cart Endpoints ----------
const getCart = async (req, res) => {
  const client = new MongoClient(CONNECTION_STRING_URI, options);
  const db = client.db("concordiadb");
  try {
    await client.connect();
    const cart = await db.collection("cart").find().toArray();
    if (cart) {
      return res
        .status(200)
        .json({ status: 200, data: cart, message: "success" });
    } else {
      return res.status(404).json({
        status: 404,
        data: null,
        message:
          "failed to retreive items data, please contact the system administrator or try again later",
      });
    }
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
};

const postCartItem = async (req, res) => {
  const client = new MongoClient(CONNECTION_STRING_URI, options);
  const db = client.db("concordiadb");

  const newItem = req.body;
try {
  await client.connect();

  const findResult = await db
    .collection("cart")
    .findOne({ _id: parseInt(newItem._id) });
  if (findResult) {
    return res.status(400).json({
      status: 400,
      data: findResult,
      message: "Sorry: This product is already in the cart",
    });
  }

  const result = await db.collection("cart").insertOne(newItem);
  if (result.acknowledged && result.insertedId) {
    return res.status(200).json({
      status: 200,
      data: result,
      message: "success : new item was added to the cart",
    });
  } else {
    return res.status(404).json({
      status: 404,
      data: null,
      message:
        "failed to retreive items data, please contact the system administrator or try again later",
    });
  }
} catch (err) {
  console.log(err);
} finally {
  client.close();
}
};

const patchCart = async (req, res) => {
  const client = new MongoClient(CONNECTION_STRING_URI, options);
  const db = client.db("concordiadb");
  const item = req.body;
  if (parseInt(item.quantity) === 0 || parseInt(item.quantity) < 0) return;

  try {
    await client.connect();
    const filter = { _id: item._id };
    const update = {
      $set: { quantity: item.quantity },
    };

    const cart = await db.collection("cart").updateOne(filter, update);
    if (cart) {
      return res
        .status(200)
        .json({ status: 200, data: req.body, message: "success" });
    } else {
      return res.status(404).json({
        status: 404,
        data: null,
        message:
          "failed to retreive items data, please contact the system administrator or try again later",
      });
    }
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
};

const deleteItem = async (req, res) => {
  const client = new MongoClient(CONNECTION_STRING_URI, options);
  const db = client.db("concordiadb");
  const _id = parseInt(req.params._id);

  try {
    await client.connect();
    console.log("connected");

    const filter = { _id: _id };

    const deletedItem = await db.collection("cart").deleteOne(filter);

    if (deletedItem) {
      return res.status(200).json({
        status: 200,
        data: deletedItem,
        message: "success: one item was deleted from the cart",
      });
    } else {
      return res.status(404).json({
        status: 404,
        data: null,
        message:
          "failed to delete, please check if the item you are deleting is in the cart or try again later",
      });
    }
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
};

module.exports = {
  getItems,
  getItem,
  getCompanies,
  getCompany,
  getCart,
  postCartItem,
  patchCart,
  deleteItem,
};
