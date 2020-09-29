const express = require("express");
const bodyParser = require("body-parser");
const users = require("./routes/users.js");

const app = express();

app.use(bodyParser.json());

app.use("/users", users);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("Server running at port: ", PORT));
