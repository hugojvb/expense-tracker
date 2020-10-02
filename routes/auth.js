const express = require("express");
const router = express.Router();
const {
  login,
  register,
  updateUser,
  deleteUser,
} = require("../controllers/auth.js");

router.post("/login", login);

router.post("/register", register);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

module.exports = router;
