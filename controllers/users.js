const UsersModel = require("../models/UsersModel");

exports.getUsers = (req, res, next) => {
  res.send("get user");
};

exports.postUser = (req, res) => {
  res.send("post user");
};
