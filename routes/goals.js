const express = require("express");
const router = express.Router();
const { verify } = require("../middleware/verify.js");
const { getGoals, setGoals, deleteGoals } = require("../controllers/goals.js");

router.get("/", verify, getGoals);

router.post("/", verify, setGoals);

router.delete("/:id", verify, deleteGoals);

module.exports = router;
