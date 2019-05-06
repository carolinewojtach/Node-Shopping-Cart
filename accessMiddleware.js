const fs = require("fs");

const usersList = "users.json";
let users = JSON.parse(fs.readFileSync(usersList, "utf8"));

const accessMiddleware = (req, res, next) => {
  let username = req.headers["username"];
  let password = req.headers["password"];

  let user = users.find(u => u.username === username);
  res.user = user;

  if (user) {
    if (password === user.password) {
      next();
    } else {
      res.status(401).send("bad password");
    }
  } else {
    res.status(401).send("user doesn't exist");
  }
};

module.exports = accessMiddleware;
