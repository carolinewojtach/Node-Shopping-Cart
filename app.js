const express = require("express");
const productRouter = require("./product.router");
const accessMiddleware = require("./accessMiddleware");

const app = express();

app.use(
  express.urlencoded({
    extended: true
  })
);
app.use(express.json());
app.use(accessMiddleware);
app.use(productRouter);

app.get("/", (req, res) => {
  res.write("Welcome to our online store");
  res.end();
});
app.listen(5000, () => {
  console.log("app started");
});
