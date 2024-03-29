const TransactionsSchema = require("../models/TransactionsSchema");
const dayjs = require("dayjs");

// get all transactions
exports.getTransactions = async (req, res) => {
	try {
		const transactions = await TransactionsSchema.find({
			user: req.user,
		}).sort({ date: -1 });

		res.status(200).json({
			success: true,
			data: transactions,
			count: transactions.length,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ Error: "Failed getting transactions" });
	}
};

// add transaction
exports.addTransaction = async (req, res, next) => {
	try {
		req.body.user = req.user;
		const newTransaction = await TransactionsSchema.create(req.body);

		res.status(201).json({ success: true, data: newTransaction });
	} catch (error) {
		console.log(error);
		res.status(400).json({ Error: "Failed to add a new transaction" });
	}
};

// update transaction
exports.updateTransaction = async (req, res) => {
	try {
		const { id } = req.params;
		const transaction = await TransactionsSchema.findByIdAndUpdate(id, req.body, {
			new: true,
			runValidators: true,
		});

		if (!transaction) return res.status(400).json({ Error: "Id not found or Input incorrect" });

		res.status(200).json({
			success: true,
			data: transaction,
			body: req.body,
		});
	} catch (error) {
		res.status(400).json({ Error: "Failed to update transaction" });
	}
};

// delete transaction
exports.deleteTransaction = async (req, res) => {
	try {
		const { ids } = req.body;
		ids.forEach(async (id) => {
			const deleted = await TransactionsSchema.findByIdAndDelete(id);
			if (!deleted) return res.status(400).json({ Error: "Id not found" });
		});

		res.status(200).json({
			success: true,
			data: ids,
		});
	} catch (error) {
		console.log(error);
		res.status(400).json({ Error: "Failed to delete transaction" });
	}
};
