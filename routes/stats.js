const express = require("express");
const {
	getLastMonth,
	getLastSemesterMean,
	getLastGoal,
	getSpentThisMonth,
	getHighestSpentMonth,
	getLowestSpentMonth,
} = require("../controllers/stats.js");
const router = express.Router();

const { verify } = require("../middleware/verify.js");

router.get("/lastmonth", verify, getLastMonth);

router.get("/lastsemestermean", verify, getLastSemesterMean);

router.get("/lastgoal", verify, getLastGoal);

router.get("/spentthismonth", verify, getSpentThisMonth);

router.get("/highestspentmonth", verify, getHighestSpentMonth);

router.get("/lowestspentmonth", verify, getLowestSpentMonth);

module.exports = router;
