const mongooseSet = {
  url: "mongodb://localhost:27017/shop",
  options: {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
  }
};

module.exports = mongooseSet;
