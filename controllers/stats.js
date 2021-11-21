const TransactionsSchema = require("../models/TransactionsSchema");
const GoalsSchema = require("../models/GoalsSchema");
const dayjs = require("dayjs");
const {
	getSpentThisMonthService,
	getHighestAndLowestSpentMonthService,
	getLastGoalService,
	getLastSemesterMeanService,
} = require("../services/stats");

exports.getLastMonth = async (req, res) => {
	try {
		const lastMonth = await TransactionsSchema.find({
			user: req.user,
			date: {
				$gte: dayjs().subtract(1, "month").startOf("month"),
				$lt: dayjs().subtract(1, "month").endOf("month"),
			},
		}).sort({ date: -1 });

		const totalAmount = Math.round(lastMonth.reduce((sum, current) => (sum += current.amount), 0));
		if (!lastMonth) return res.status(400).json({ Error: "Last month transactions not found" });

		res.status(200).json({ success: true, data: totalAmount });
	} catch (error) {
		console.log(error);
		res.status(400).json({ Error: "Failed to get last month" });
	}
};

exports.getLastSemesterMean = async (req, res) => {
	try {
		const semesterMean = await getLastSemesterMeanService(req.user);

		if (!semesterMean) return res.status(400).json({ Error: "Last semester transactions mean not found" });

		res.status(200).json({ success: true, data: semesterMean });
	} catch (error) {
		console.log(error);
		res.status(400).json({ Error: "Failed to get last semester mean" });
	}
};

exports.getLastGoal = async (req, res) => {
	try {
		const lastGoal = await getLastGoalService(req.user);

		if (!lastGoal) return res.status(400).json({ Error: "Last goal not found" });

		res.status(200).json({ success: true, data: lastGoal.goal });
	} catch (error) {
		console.log(error);
		res.status(400).json({ Error: "Failed to get last goal" });
	}
};

exports.getSpentThisMonth = async (req, res) => {
	try {
		const spentThisMonth = await getSpentThisMonthService(req.user);

		if (!spentThisMonth) return res.status(400).json({ Error: "Spent this month not found" });

		res.status(200).json({ success: true, data: spentThisMonth });
	} catch (error) {
		console.log(error);
		res.status(400).json({ Error: "Failed to get spent this month" });
	}
};

exports.getHighestSpentMonth = async (req, res) => {
	try {
		const { max, maxMonth } = await getHighestAndLowestSpentMonthService(req.user);

		if (!max) return res.status(400).json({ Error: "Failed to get highest spent month" });

		return res.status(200).json({ data: max, month: maxMonth });
	} catch (error) {
		console.log(error);
		res.status(400).json({ Error: error });
	}
};

exports.getLowestSpentMonth = async (req, res) => {
	try {
		const { min, minMonth } = await getHighestAndLowestSpentMonthService(req.user);

		if (!min) return res.status(400).json({ Error: "Failed to get lowest spent month" });

		return res.status(200).json({ data: min, month: minMonth });
	} catch (error) {
		console.log(error);
		res.status(400).json({ Error: error });
	}
};
