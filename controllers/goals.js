const GoalsSchema = require("../models/GoalsSchema");

exports.getGoals = async (req, res) => {
  try {
    const goals = await GoalsSchema.find({ user: req.user });

    res.status(200).json({ success: true, data: goals, count: goals.length });
  } catch (error) {
    console.log(error);
    res.status(500).json({ Error: "Failed getting goals" });
  }
};

exports.setGoals = async (req, res) => {
  try {
    req.body.date = new Date();
    req.body.user = req.user;
    const newGoal = await GoalsSchema.create(req.body);

    res.status(201).json({ success: true, data: newGoal });
  } catch (error) {
    console.log(error);
    res.status(400).json({ Error: "Failed to add a new goal" });
  }
};

exports.deleteGoals = async (req, res) => {
  try {
    const { id } = req.params;
    const goal = await UsersSchema.findByIdAndDelete(id);
    if (!goal) return res.status(400).json({ Error: "Id not found" });

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    res.status(400).json({ Error: "Failed to delete goal" });
  }
};
