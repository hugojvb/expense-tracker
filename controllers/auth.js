const UsersSchema = require("../models/UsersSchema");

// get a user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UsersSchema.find(email, password);

    if (!user) return res.status(400).json({ success: false });

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};

// create a user
exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const newUser = await UsersSchema.create(email, password);

    res.status(201).json({
      success: true,
      data: newUser,
    });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};

// update user
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UsersSchema.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};

// delete user
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UsersSchema.findByIdAndDelete(id);

    if (!user) return res.status(400).json({ success: false });

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};
