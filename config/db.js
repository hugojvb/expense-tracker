const mongoose = require("mongoose");

const connectDB = async () => {
  const con = await mongoose.connect("mongodb+srv://hugojvb:mongoose@hugojvb.3wilw.mongodb.net/expenseTracker?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });

  console.log("MongoDB connected: ", con.connection.host);
};

module.exports = connectDB;
