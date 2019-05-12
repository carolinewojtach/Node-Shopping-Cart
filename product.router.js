const express = require("express");
const router = express.Router();

const accessAuth = require("./accessAuth");
const Product = require("./models/product.model");

router.all("*", express.json());

router
  .route("/product/:id?")
  // SHOW ALL PRODUCTS
  .get((req, res) => {
    const { id } = req.params;
    const result = id ? products.find(p => p.id === +id) : products;
    if (result) {
      res.send(result);
    } else {
      res.status(404).send();
    }
  })
  // ADD NEW PRODUCT TO STORE
  .post(accessAuth, async (req, res) => {
    const { id } = req.params;
    if (id) {
      res.send("You don't have to pass id");
    } else {
      const product = new Product({ ...req.body });
      await product.save();

      res.status(201).send(`New product ${product.name} added to the store`);
    }
  })
  // DELETE PRODUCT FROM STORE
  .delete(accessAuth, (req, res) => {
    const { id } = req.params;
    if (id) {
      const product = products.find(p => p.id === +id);
      if (product) {
        products = products.filter(p => p.id !== +id);
        saveToFile();
        res.status(201).send(`Product ${product.name} deleted from the store`);
      } else res.status(404).send("There is no product with such id");
    } else res.send("You have to pass product id to delete it");
  })
  // EDIT PRODUCT IN STORE
  .put(accessAuth, (req, res) => {
    const { id } = req.params;
    if (id) {
      const productIndex = products.findIndex(p => p.id === +id);

      if (productIndex !== -1) {
        const newProduct = {
          id: +id,
          ...req.body
        };
        products[productIndex] = newProduct;
        saveToFile();
        res.status(201).send(`Product ${product.name} updated`);
      } else {
        return res.status(404).send("There is no product with such id");
      }
    } else res.send("You have to pass product id to edit it");
  });

module.exports = router;
