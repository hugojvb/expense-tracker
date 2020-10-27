const express = require("express");
const transactions = require("./routes/transactions.js");
const goals = require("./routes/goals");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");
const auth = require("./routes/auth.js");

// dotenv config
dotenv.config({ path: "./config/config.env" });

// connect to database
connectDB();

// initiate express
const app = express();

// cors
app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://suspicious-roentgen-805db7.netlify.app/");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token,Authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT ,DELETE");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

// use bodyParser & cookieParser
app.use(express.json());
app.use(cookieParser());

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// routes
app.use("/api/auth", auth);
app.use("/api/transactions", transactions);
app.use("/api/goals", goals);

// listenning at port 5000
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => console.log("Server running at port: ", PORT));

// error handling
process.on("unhandledRejection", (err) => {
  console.log("Error: ", err.message);
  server.close(() => process.exit(1));
});
