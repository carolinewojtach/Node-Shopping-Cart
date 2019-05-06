const fs = require("fs");

const express = require("express");
const router = express.Router();

const usersList = "users.json";
const users = JSON.parse(fs.readFileSync(usersList, "utf8"));
const productsList = "products.json";
const products = JSON.parse(fs.readFileSync(productsList, "utf8"));

router
  .route("/cart/:product_id?/:amount?")
  // SHOW CART
  .get((req, res) => {
    // user which is sign in
    const user = req.user;
    const { product_id } = req.params;

    const result = product_id
      ? user.cart.find(p => p.id === +product_id)
      : user.cart;

    if (result) {
      res.send(result);
    } else {
      res.status(404).send();
    }
  })
  // ADD PRODUCT TO CART
  .post((req, res) => {
    const user = req.user;
    const { product_id, amount } = req.params;

    if (product_id) {
      const product = products.find(p => p.id === +product_id);

      if (amount <= product.amount) {
        const productInCart = {
          id: product_id,
          ...product,
          amount: amount
        };

        const productLeft = {
          id: product_id,
          ...product,
          amount: product.amount - amount
        };

        // update cart
        user.cart.push(productInCart);
        users = [...users, user];
        fs.writeFileSync(usersList, JSON.stringify(users));

        // update amount of products left in store
        products = [...products, productLeft];
        fs.writeFileSync(productsList, JSON.stringify(products));

        res.status(201).send(productToBuy);
      } else {
        res
          .status(401)
          .send(`Only ${product.amount} items available in our store`);
      }
    } else {
      res.status(404).send("We don't have such a product in our store");
    }
  })
  // DELETE PRODUCT FROM CART
  .delete((req, res) => {
    const user = req.user;
    const { product_id } = req.params;

    if (product_id) {
      let product = user.cart.find(p => p.id === +product_id);

      const productReturned = {
        id: product_id,
        ...product,
        amount: amount + product.amount
      };

      // update cart
      user.cart.filter(p => p.id !== product_id);
      users = [...users, user];
      fs.writeFileSync(usersList, JSON.stringify(users));

      // return products to store
      products = [...products, productReturned];
      fs.writeFileSync(productsList, JSON.stringify(products));

      res.status(201).send(`You deleted ${product.name} from your cart`);
    } else {
      res.status(404).send("You don't have such a product in your cart");
    }
  });
module.exports = router;
