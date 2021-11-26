const express = require("express");
const {
	getLastMonth,
	getLastSemesterMean,
	getLastGoal,
	getSpentThisMonth,
	getHighestSpentMonth,
	getLowestSpentMonth,
	getLast12MonthsExpenses,
} = require("../controllers/stats.js");
const router = express.Router();

const { verify } = require("../middleware/verify.js");

router.get("/stats", verify, getStats);

module.exports = router;
