const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/shop", {
  useNewUrlParser: true
});

module.exports = mongoose.model("product", {
  id: Number,
  name: String,
  amount: Number
});
