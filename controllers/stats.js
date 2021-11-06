const TransactionsSchema = require("../models/TransactionsSchema");
const GoalsSchema = require("../models/GoalsSchema");
const dayjs = require("dayjs");

exports.getLastMonth = async (req, res) => {
	try {
		const lastMonth = await TransactionsSchema.find({
			user: req.user,
			date: {
				$gte: dayjs().subtract(1, "month"),
				$lt: dayjs().toDate(),
			},
		}).sort({ date: -1 });

		const totalAmount = Math.round(
			lastMonth.reduce((sum, current) => (sum += current.amount), 0)
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

exports.getLastSemesterMean = async (req, res) => {
	try {
		const lastSemester = await TransactionsSchema.find({
			user: req.user,
			date: {
				$gte: dayjs().subtract(6, "month"),
				$lt: dayjs().toDate(),
			},
		}).sort({ date: -1 });

		const semesterMean = Math.round(
			lastSemester.reduce((sum, current) => (sum += current.amount), 0) /
				6
		);
		if (!lastSemester)
			return res
				.status(400)
				.json({ Error: "Last semester transactions mean not found" });

		res.status(200).json({ success: true, data: semesterMean });
	} catch (error) {
		console.log(error);
		res.status(400).json({ Error: "Failed to get last semester mean" });
	}
};

exports.getLastGoal = async (req, res) => {
	try {
		const lastGoal = await GoalsSchema.findOne({
			user: req.user,
		}).sort({ date: -1 });

		if (!lastGoal)
			return res.status(400).json({ Error: "Last goal not found" });

		res.status(200).json({ success: true, data: lastGoal });
	} catch (error) {
		console.log(error);
		res.status(400).json({ Error: "Failed to get last goal" });
	}
};
