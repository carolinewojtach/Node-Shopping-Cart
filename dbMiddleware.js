const options = {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true
};
const mongoose = require("mongoose");

const url = "mongodb://localhost:27017/shop";

module.exports = async (req, res, next) => {
  if (!mongoose.connection.readyState) {
    await mongoose.connect(url, options);
  }
  next();
};
