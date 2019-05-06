const fs = require("fs");

const express = require("express");
const router = express.Router();

const productsList = "products.json";
let products = JSON.parse(fs.readFileSync(productsList, "utf8"));

const saveToFile = () => {
  fs.writeFileSync(productsList, JSON.stringify(products));
};

// adres: http://localhost:5000/product/2
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
  .post((req, res) => {
    const lastId = products.reduce((max, p) => (max < p.id ? p.id : max), 0);
    const newProduct = {
      id: lastId + 1,
      ...req.body
    };
    products.push(newProduct);
    saveToFile();
    res.status(201).send(newProduct);
  })
  // DELETE PRODUCT FROM STORE
  .delete((req, res) => {
    const { id } = req.params;
    products = products.filter(p => p.id !== +id);
    saveToFile();
    res.send();
  })
  // EDIT PRODUCT IN STORE
  .put((req, res) => {
    const { id } = req.params;
    const productIndex = products.findIndex(p => p.id === +id);
    if (productIndex === -1) {
      return res.status(404).send();
    }
    const newProduct = {
      id: +id,
      ...req.body
    };
    products[productIndex] = newProduct;
    saveToFile();
    res.status(201).send(newProduct);
  });

module.exports = router;
