const mongoose = require("mongoose");

module.exports = mongoose.model("product", {
  id: Number,
  name: String,
  amount: Number
});
