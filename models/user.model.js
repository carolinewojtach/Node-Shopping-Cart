const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = Schema({
  _id: Schema.Types.ObjectId,
  username: String,
  password: String,
  cart: [{ type: Schema.Types.ObjectId, ref: "Product" }]
});

module.exports = mongoose.model("user", userSchema);
