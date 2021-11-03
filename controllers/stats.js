const TransactionsSchema = require("../models/TransactionsSchema");
const dayjs = require("dayjs");

exports.getLastMonth = async (req, res) => {
	try {
		const lastMonth = await TransactionsSchema.find({
			user: req.user,
			createdAt: {
				$gte: dayjs().subtract(1, "month"),
				$lt: dayjs().toDate(),
			},
		}).sort({ date: -1 });

		const totalAmount = lastMonth.reduce(
			(sum, current) => (sum += current.amount)
		);

		if (!lastMonth)
			return res
				.status(400)
				.json({ Error: "Last month transactions not found" });

		res.status(200).json({ success: true, data: totalAmount });
	} catch (error) {
		console.log(error);
		res.status(400).json({ Error: "Failed to get last month" });
	}
};
