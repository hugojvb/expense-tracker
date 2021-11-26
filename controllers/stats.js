const TransactionsSchema = require("../models/TransactionsSchema");
const GoalsSchema = require("../models/GoalsSchema");
const dayjs = require("dayjs");
const {
	getSpentThisMonthService,
	getHighestAndLowestSpentMonthService,
	getLastGoalService,
	getLastSemesterMeanService,
	getLast12MonthsExpensesService,
} = require("../services/stats");

exports.getStats = async (req, res) => {
	try {
		let stats;

		const lastMonth = await TransactionsSchema.find({
			user: req.user,
			date: {
				$gte: dayjs().subtract(1, "month").startOf("month"),
				$lt: dayjs().subtract(1, "month").endOf("month"),
			},
		}).sort({ date: -1 });

		const totalAmount = Math.round(lastMonth.reduce((sum, current) => (sum += current.amount), 0));
		if (!lastMonth) return res.status(400).json({ Error: "Last month transactions not found" });

		stats.totalAmount = totalAmount;

		const semesterMean = await getLastSemesterMeanService(req.user);

		if (!semesterMean) return res.status(400).json({ Error: "Last semester transactions mean not found" });

		stats.semesterMean = semesterMean;

		const lastGoal = await getLastGoalService(req.user);

		if (!lastGoal) return res.status(400).json({ Error: "Last goal not found" });

		stats.lastGoal = lastGoal.goal;

		const spentThisMonth = await getSpentThisMonthService(req.user);

		if (!spentThisMonth) return res.status(400).json({ Error: "Spent this month not found" });

		stats.spentThisMonth = spentThisMonth;

		const { max, maxMonth } = await getHighestAndLowestSpentMonthService(req.user);

		if (!max) return res.status(400).json({ Error: "Failed to get highest spent month" });

		stats.max = max;
		stats.maxMonth = maxMonth;

		const { min, minMonth } = await getHighestAndLowestSpentMonthService(req.user);

		if (!min) return res.status(400).json({ Error: "Failed to get lowest spent month" });

		stats.min = min;
		stats.minMonth = minMonth;

		const monthExpensesArray = await getLast12MonthsExpensesService(req.user);

		stats.monthExpensesArray = monthExpensesArray;

		return res.status(200).json({ data: stats });
	} catch (error) {
		console.log(error);
		res.status(500).json({ Error: error });
	}
};
