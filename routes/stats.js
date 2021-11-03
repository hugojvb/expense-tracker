const express = require("express");
const { getLastMonth } = require("../controllers/transactions.js");
const router = express.Router();

const { verify } = require("../middleware/verify.js");

router.get = ("/lastmonth", verify, getLastMonth);

module.exports = router;
