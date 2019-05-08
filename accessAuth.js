const fs = require("fs");

const usersList = "users.json";
const users = JSON.parse(fs.readFileSync(usersList, "utf8"));

const accessMiddleware = (req, res, next) => {
  const username = req.headers["username"];
  const password = req.headers["password"];

  const user = users.find(u => u.username === username);

  if (user) {
    req.user = user;
    if (password === user.password) {
      next();
    } else {
      res.status(401).send("Wrong password");
    }
  } else {
    res.status(401).send("User doesn't exist");
  }
};

module.exports = accessMiddleware;
