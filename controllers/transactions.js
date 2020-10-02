const TransactionsSchema = require("../models/TransactionsSchema");

// get transaction
exports.getTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const transaction = await TransactionsSchema.findById({ id: "_id" });

    if (!transaction) return res.status(400).json({ Error: "Id not found" });

    res.status(200).json({ success: true, transaction: transaction });
  } catch (error) {
    console.log(error);
    res.status(400).json({ Error: "Failed getting transaction" });
  }
};

// add transaction
exports.addTransaction = async (req, res) => {
  try {
    const { name, amount, date } = req.body;
    const newTransaction = await TransactionsSchema.create({
      name,
      amount,
      date,
    });

    res.status(201).json({ success: true, transaction: newTransaction });
  } catch (error) {
    console.log(error);
    res.status(400).json({ Error: "Failed to add a new transaction" });
  }
};

// update transaction
exports.updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const transaction = await TransactionsSchema.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!transaction)
      return res.status(400).json({ Error: "Id not found or Input incorrect" });

    res.status(200).json({
      success: true,
      transaction: transaction,
    });
  } catch (error) {
    res.status(400).json({ Error: "Failed to update transaction" });
  }
};

// delete transaction
exports.deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const transaction = await UsersSchema.findByIdAndDelete(id);
    if (!transaction) return res.status(400).json({ Error: "Id not found" });

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    res.status(400).json({ Error: "Failed to delete transaction" });
  }
};
