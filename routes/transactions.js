const express = require("express");
const router = express.Router();
const { verify } = require("../middleware/verify.js");
const {
  getTransactions,
  addTransaction,
  updateTransaction,
  deleteTransaction,
} = require("../controllers/transactions.js");

router.get("/:id", verify, getTransactions);

router.post("/", verify, addTransaction);

router.put("/:id", verify, updateTransaction);

router.delete("/:id", verify, deleteTransaction);

module.exports = router;
