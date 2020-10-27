const jwt = require("jsonwebtoken");
const UsersSchema = require("../models/UsersSchema");

// Verify Authorization
exports.verify = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(401).json({ Error: "Not authorized to access this route" });
  }

  try {
    // Verify Token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await UsersSchema.findById(decoded.id);

    console.log(decoded);
    next();
  } catch (error) {
    return res.status(401).json({ Error: error.message });
  }
};
