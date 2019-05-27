const express = require("express");
const router = express.Router();

const accessAuth = require("../accessAuth");
const User = require("../models/user.model");
const Product = require("../models/product.model");

router.all("*", accessAuth, express.json());

router
  .route("/cart/:product_id?/:p_amount?")
  // SHOW CART
  .get(async (req, res) => {
    // user which is sign in
    let { username } = req.user;
    const product_id = req.params.product_id;

    if (product_id) {
      await User.findOne({
        username: username
        // , cart: { $elemMatch: { id: product_id } }
      })
        .then(result => res.send(result.cart))
        .catch(err => res.send("You don't have such product in your cart"));
    } else {
      await User.find({ username: username })
        .then(result =>
          result.length === 0
            ? res.send("Your cart is empty")
            : res.send(result)
        )
        .catch(err => res.send("Error, unable to get products"));
    }
  })
  // ADD PRODUCT TO CART
  .post(async (req, res) => {
    let user = req.user;
    const { product_id, product_amount } = req.params;

    if (product_id) {
      await Product.findOne({ _id: product_id });
    } else {
      res.status(404).send("We don't have such a product in our store");
    }
  })
  // DELETE PRODUCT FROM CART
  .delete(async (req, res) => {
    const user = req.user;
    const { product_id } = req.params;

    if (product_id) {
    } else {
      res
        .status(404)
        .send("You have to pass product id to delete the product from cart");
    }
  });

module.exports = router;
