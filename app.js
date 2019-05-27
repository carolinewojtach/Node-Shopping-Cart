const express = require("express");
const productRouter = require("./routers/product.router");
const cartRouter = require("./routers/cart.router");

// const { firstDataInsert } = require("./firstDataInsert");
// firstDataInsert();

const app = express();

// mongoose connect
const dbMiddleware = require("./dbMiddleware");
app.use(dbMiddleware);

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
