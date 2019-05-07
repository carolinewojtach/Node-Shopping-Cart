const express = require("express");
const productRouter = require("./product.router");
const cartRouter = require("./cart.router");

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
