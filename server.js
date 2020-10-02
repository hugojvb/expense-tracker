const express = require("express");
const auth = require("./routes/auth.js");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");

dotenv.config({ path: "./config/config.env" });

connectDB();
const app = express();

// use body parser
app.use(express.json());

// use cookie parser
app.use(cookieParser());

// route for auth
app.use("/auth", auth);

// listenning at port 5000
const server = app.listen(process.env.PORT, () =>
  console.log("Server running at port: ", process.env.PORT)
);

// error handling
process.on("unhandledRejection", (err) => {
  console.log("Error: ", err.message);
  server.close(() => process.exit(1));
});
