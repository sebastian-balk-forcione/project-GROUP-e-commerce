const router = require("express").Router();
const {
  getItems,
  getItem,
  getCompanies,
  getCompany,
  getCart,
  postCartItem,
  patchCart,
  deleteItem,
} = require("./handlers");

router.get("/api/items", getItems);
router.get("/api/item/:_id", getItem);

router.get("/api/companies", getCompanies);
router.get("/api/company/:_id", getCompany);

router.get("/api/cart", getCart);
router.post("/api/cart", postCartItem);
router.patch("/api/cart", patchCart);
router.delete("/api/cart/:_id", deleteItem);

router.get("/bacon", (req, res) => res.status(200).json("1111🥓"));

module.exports = router;