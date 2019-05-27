const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  amount: Number
});

module.exports = mongoose.model("product", productSchema);
