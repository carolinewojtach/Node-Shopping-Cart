const express = require("express");
const productRouter = require("./routers/product.router");
const cartRouter = require("./routers/cart.router");

// mongoose connect
const mongoose = require("mongoose");
const mongooseSet = require("./mongooseSet");
mongoose.connect(mongooseSet.url, mongooseSet.options);

// const { firstDataInsert } = require("./firstDataInsert");
// firstDataInsert();

const app = express();

app.use(
  express.urlencoded({
    extended: true
  })
);

app.get("/", (req, res) => {
  res.write("Welcome to our online store");
  res.end();
});

app.use(productRouter);
app.use(cartRouter);

app.listen(5000, () => {
  console.log("app started");
});
