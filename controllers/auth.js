const UsersSchema = require("../models/UsersSchema");

// login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ Error: "Email or Password Missing" });

    const user = await UsersSchema.findOne({ email }).select("+password");
    if (!user) return res.status(400).json({ Error: "Email or Password Invalid" });

    const isValid = await user.validatePassword(password);
    if (!isValid) return res.status(401).json({ Error: "Invalid Password" });

    sendTokenResponse(user, res);
  } catch (error) {
    console.log(error);
    res.status(400).json({ Error: "Failed login" });
  }
};

// register
exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const newUser = await UsersSchema.create({ email, password });

    sendTokenResponse(newUser, res);
  } catch (error) {
    console.log(error);
    res.status(400).json({ Error: "Failed register" });
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

// get token, create cookie and send it
const sendTokenResponse = (user, res) => {
  const token = user.getSignedJwtToken();
  const options = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 3600 * 1000),
    httpOnly: true,
    sameSite: "none",
    secure: "true",
  };

  res.status(200).cookie("token", token, options).json({ success: true, token: token });
};

// Get Current Logged in user

exports.getMe = async (req, res, next) => {
  try {
    const user = await UsersSchema.findById(req.user.id);

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ Error: error.message });
  }
};
