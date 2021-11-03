const express = require("express");
const { getLastMonth } = require("../controllers/stats.js");
const router = express.Router();

const { verify } = require("../middleware/verify.js");

router.get = ("/lastmonth", verify, getLastMonth);

module.exports = router;
