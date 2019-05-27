const mongoose = require("mongoose");

module.exports = mongoose.model("user", {
  id: Number,
  username: String,
  password: String,
  cart: [Object]
});
