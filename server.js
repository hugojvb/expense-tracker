const express = require("express");
const transactions = require("./routes/transactions.js");
const goals = require("./routes/goals");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");
const auth = require("./routes/auth.js");
const path = require("path");

// dotenv config
dotenv.config({ path: ".env" });

// connect to database
connectDB();

// initiate express
const app = express();

// get frontend build
app.use(express.static(path.join(__dirname, "client/build")));
app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "client/build", "index.html"));
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

const server = app.listen(PORT, () =>
	console.log("Server running at port: ", PORT)
);

// error handling
process.on("unhandledRejection", (err) => {
	console.log("Error: ", err.message);
	server.close(() => process.exit(1));
});
