const TransactionsSchema = require("../models/TransactionsSchema");

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
		req.body.date = new Date();
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
		const transaction = await TransactionsSchema.findByIdAndUpdate(
			id,
			req.body,
			{
				new: true,
				runValidators: true,
			}
		);

		if (!transaction)
			return res
				.status(400)
				.json({ Error: "Id not found or Input incorrect" });

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
		const transaction = await TransactionsSchema.findByIdAndDelete(
			req.params.id
		);
		if (!transaction)
			return res.status(400).json({ Error: "Id not found" });

		res.status(200).json({
			success: true,
			data: {},
		});
	} catch (error) {
		console.log(error);
		res.status(400).json({ Error: "Failed to delete transaction" });
	}
};

exports.getLastMonth = async (req, res) => {
	try {
		const lastMonth = await TransactionsSchema.find({
			user: req.user,
			createdAt: {
				$gte: new Date(),
				$lt: new Date(),
			},
		}).sort({ date: -1 });

		if (!lastMonth)
			return res
				.status(400)
				.json({ Error: "Last month transactions not found" });

		res.status(200).json({ success: true, data: lastMonth });
	} catch (error) {
		console.log(error);
		res.status(400).json({ Error: "Failed to get last month" });
	}
};
