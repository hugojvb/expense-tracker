const express = require("express");
const router = express.Router();
const { verify } = require("../middleware/verify.js");
const {
  login,
  register,
  updateUser,
  deleteUser,
  getMe,
} = require("../controllers/auth.js");

router.post("/login", login);

router.post("/register", register);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

router.get("/me", verify, getMe);

module.exports = router;
