const express = require("express");
const { getLastMonth } = require("../controllers/stats.js");
const router = express.Router();

const { verify } = require("../middleware/verify.js");

router.get("/lastMonth", verify, getLastMonth);

module.exports = router;
