const express = require("express");
const router = express.Router();
const { login } = require("../controllers/auth.js");
const { register } = require("../controllers/auth.js");
const { updateUser } = require("../controllers/auth.js");
const { deleteUser } = require("../controllers/auth.js");

router.get("/login", login);

router.post("/register", register);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

module.exports = router;
