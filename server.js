const express = require("express");
const bodyParser = require("body-parser");
const users = require("./routes/users.js");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config({ path: "./config/config.env" });

connectDB();
const app = express();

app.use(bodyParser.json());

app.use("/users", users);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () =>
  console.log("Server running at port: ", PORT)
);

process.on("unhandledRejection", (err, promise) => {
  console.log("Error: ", err.message);
  server.close(() => process.exit(1));
});
