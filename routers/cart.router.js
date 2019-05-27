const express = require("express");
const router = express.Router();

const accessAuth = require("../accessAuth");
const User = require("../models/user.model");

router.all("*", accessAuth, express.json());

router
  .route("/cart/:product_id?/:p_amount?")
  // SHOW CART
  .get(async (req, res) => {
    // user which is sign in
    let { username } = req.user;

    const id = req.params.product_id;
    console.log("id: " + id);

    if (id) {
      await User.find({
        username: username,
        cart: { $elemMatch: { id: `${id}` } }
      })
        .then(r => console.log(r))
        //.then(u => u.cart)
        //.then(cart => cart.find(e => e.id === id))
        .then(result => res.send(result))
        //.catch(err  => res.send("You don't have such product in your cart"));
        .catch(err => console.log(err));
    } else {
      await User.find()
        .then(result => res.send(result))
        .then(result => console.log("2 " + result.name))
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
    const { product_id, p_amount } = req.params;

    if (product_id) {
      const product = products.find(p => p.id === +product_id);

      if (+p_amount <= product.amount) {
        const productLeft = {
          id: product.id,
          ...product,
          amount: product.amount - +p_amount
        };

        // update cart
        // check if such product is in cart already
        let productInCart = user.cart.find(e => e.id === product.id);

        if (productInCart) {
          productInCart = {
            id: product.id,
            ...productInCart,
            amount: productInCart.amount + +p_amount
          };

          const productInCartIndex = user.cart.findIndex(
            p => p.id === product.id
          );
          user.cart[productInCartIndex] = productInCart;
        } else {
          productInCart = {
            id: product.id,
            ...product,
            amount: +p_amount
          };

          user.cart.push(productInCart);
        }

        const userIndex = users.findIndex(u => u.id === user.id);
        users[userIndex].cart = user.cart;
        fs.writeFileSync(usersList, JSON.stringify(users));

        // update amount of products left in store
        const productIndex = products.findIndex(p => p.id === product.id);
        products[productIndex] = productLeft;
        fs.writeFileSync(productsList, JSON.stringify(products));

        res
          .status(201)
          .send(`Product: ${productInCart.name} added to your cart`);
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
  .delete(async (req, res) => {
    const user = req.user;
    const { product_id } = req.params;

    if (product_id) {
      const product = products.find(p => p.id === +product_id);
      const productInCart = user.cart.find(p => p.id === +product_id);

      if (productInCart) {
        const productReturned = {
          id: product.id,
          ...product,
          amount: product.amount + productInCart.amount
        };

        // update cart
        user.cart = user.cart.filter(p => p.id !== +product_id);
        const userIndex = users.findIndex(u => u.id === user.id);
        users[userIndex] = user;
        fs.writeFileSync(usersList, JSON.stringify(users));

        // return products to store
        const productIndex = products.findIndex(p => p.id === product.id);
        products[productIndex] = productReturned;
        fs.writeFileSync(productsList, JSON.stringify(products));

        res
          .status(201)
          .send(`You deleted product: ${product.name} from your cart`);
      } else res.status(404).send("You don't have such a product in your cart");
    } else {
      res
        .status(404)
        .send("You have to pass product id to delete the product from cart");
    }
  });

module.exports = router;
