const fs = require("fs");

const usersList = "users.json";
const users = JSON.parse(fs.readFileSync(usersList, "utf8"));

const accessMiddleware = (req, res, next) => {
  const username = req.headers["username"];
  const password = req.headers["password"];

  if (username) {
    const user = users.find(u => u.username === username);

    if (user) {
      req.user = user; // to pass user to next()
      if (password === user.password && username === user.username) {
        next();
      } else {
        res.status(401).send("Wrong login or password");
      }
    } else {
      res.status(401).send("User doesn't exist");
    }
  } else {
    res.send("Pass login")
  }
};

module.exports = accessMiddleware;
