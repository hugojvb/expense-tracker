const UsersModel = require("../models/UsersModel");

// get a user
exports.getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UsersModel.findById(id);

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
exports.postUser = async (req, res) => {
  try {
    const newUser = await UsersModel.create();

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
    const user = await UsersModel.findByIdAndUpdate(id, req.body, {
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
    const user = await UsersModel.findByIdAndDelete(id);

    if (!user) return res.status(400).json({ success: false });

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};
