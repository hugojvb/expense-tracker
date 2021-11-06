const express = require("express");
const {
	getLastMonth,
	getLastSemesterMean,
} = require("../controllers/stats.js");
const router = express.Router();

const { verify } = require("../middleware/verify.js");

router.get("/lastMonth", verify, getLastMonth);

router.get("/lastSemesterMean", verify, getLastSemesterMean);

module.exports = router;
