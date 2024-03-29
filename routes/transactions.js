const express = require("express");
const router = express.Router();
const { verify } = require("../middleware/verify.js");
const {
	getTransactions,
	addTransaction,
	updateTransaction,
	deleteTransaction,
} = require("../controllers/transactions.js");

router.get("/", verify, getTransactions);

router.post("/", verify, addTransaction);

router.put("/:id", verify, updateTransaction);

router.delete("/", verify, deleteTransaction);

module.exports = router;
