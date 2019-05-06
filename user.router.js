const fs = require("fs");
const express = require('express');
const router = express.Router();

const usersList = "users.json";
const users = JSON.parse(fs.readFileSync(usersList, "utf8"));


module.exports = router;