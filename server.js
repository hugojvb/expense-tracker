const express = require("express");
// const bodyParser = require("body-parser");
const auth = require("./routes/auth.js");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config({ path: "./config/config.env" });

connectDB();
const app = express();

// use body parser
app.use(express.json());

app.use("/auth", auth);

// listenning at port 5000
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () =>
  console.log("Server running at port: ", PORT)
);

// error handling
process.on("unhandledRejection", (err, promise) => {
  console.log("Error: ", err.message);
  server.close(() => process.exit(1));
});
