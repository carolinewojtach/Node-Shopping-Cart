const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/shop", {
  useNewUrlParser: true
});

module.exports = mongoose.model("user", {
  id: Number,
  username: String,
  password: String,
  cart: Array
});
