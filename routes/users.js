const express = require("express");
const router = express.Router();
const { getUsers } = require("../controllers/users.js");
const { postUser } = require("../controllers/users.js");

router.get("/", getUsers);

router.post("/", postUser);

module.exports = router;
