const express = require("express");
const router = express.Router();
const { getUser } = require("../controllers/users.js");
const { postUser } = require("../controllers/users.js");
const { updateUser } = require("../controllers/users.js");
const { deleteUser } = require("../controllers/users.js");

router.get("/:id", getUser);

router.post("/", postUser);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

module.exports = router;
