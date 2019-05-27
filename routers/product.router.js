const express = require("express");
const router = express.Router();

const accessAuth = require("../accessAuth");
const Product = require("../models/product.model");

router.all("*", express.json());

router
  .route("/product/:id?")
  // SHOW ALL PRODUCTS OR ONE
  .get(async (req, res) => {
    const { id } = req.params;
    if (id) {
      await Product.findById(`${id}`)
        .then(result => res.send(result))
        .catch(err => res.send("Error, unable to get product"));
    } else {
      await Product.find()
        .then(result => res.send(result))
        .catch(err => res.send("Error, unable to get products"));
    }
  })
  // ADD NEW PRODUCT TO STORE
  .post(accessAuth, async (req, res) => {
    let product = await Product.findOne({ name: `${req.body.name}` });

    if (product !== null) {
      res.send("Product with such name exists in the store");
    } else {
      product = new Product(req.body);
      await product
        .save()
        .then(result =>
          res.status(201).send(`New product ${product.name} added to the store`)
        )
        .catch(err => res.status(400).send("Error, unable to save product"));
    }
  })
  // DELETE PRODUCT FROM STORE
  .delete(accessAuth, async (req, res) => {
    const { id } = req.params;
    if (id) {
      await Product.deleteOne({ _id: `${id}` })
        .then(result => {
          res.send(`Product deleted from the store`);
        })
        .catch(err => res.send("There is no product with such id"));
    } else res.send("You have to pass product id to delete it");
  })
  // EDIT PRODUCT IN STORE
  .put(accessAuth, async (req, res) => {
    const { id } = req.params;
    if (id) {
      await Product.findByIdAndUpdate(id, req.body, (error, result) => {
        if (error) {
          return res.status(500).send("There is no product with such id");
        } else {
          res.send("Product updated");
        }
      });
    } else {
      res.send("You have to pass product id to edit it");
    }
  });

module.exports = router;
