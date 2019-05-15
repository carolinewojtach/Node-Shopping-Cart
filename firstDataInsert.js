const fs = require("fs");
const products = JSON.parse(fs.readFileSync("products.json", "utf8"));
const users = JSON.parse(fs.readFileSync("users.json", "utf8"));

const User = require("./models/user.model");
const Product = require("./models/product.model");

// first insert data from files
async function firstDataInsert() {
  for (let i = 0; i < users.length; i++) {
    const user = new User({ ...users[i] });
    await user.save();

    for (let i = 0; i < products.length; i++) {
      const product = new Product({ ...products[i] });
      await product.save();
    }
  }
}
module.exports = { firstDataInsert };
