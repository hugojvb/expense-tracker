const express = require("express");
const router = express.Router();
const {
  getTransaction,
  addTransaction,
  updateTransaction,
  deleteTransaction,
} = require("../controllers/transactions.js");

router.get("/:id", getTransaction);

router.post("/", addTransaction);

router.put("/:id", updateTransaction);

router.delete("/:id", deleteTransaction);

module.exports = router;
