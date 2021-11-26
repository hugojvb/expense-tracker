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
		let stats = {};

		// GET LAST MONTH TOTAL EXPENSES
		const lastMonthArray = await TransactionsSchema.find({
			user: req.user,
			date: {
				$gte: dayjs().subtract(1, "month").startOf("month"),
				$lt: dayjs().subtract(1, "month").endOf("month"),
			},
		}).sort({ date: -1 });

		const lastMonth = Math.round(lastMonthArray.reduce((sum, current) => (sum += current.amount), 0));
		if (!lastMonth) return res.status(400).json({ Error: "Last month transactions not found" });

		stats.lastMonth = lastMonth;

		// GET LAST SEMESTER MEAN EXPENSES
		const lastSemesterMean = await getLastSemesterMeanService(req.user);

		if (!lastSemesterMean) return res.status(400).json({ Error: "Last semester transactions mean not found" });

		stats.lastSemesterMean = lastSemesterMean;

		// GET LAST GOAL
		const lastGoal = await getLastGoalService(req.user);

		if (!lastGoal) return res.status(400).json({ Error: "Last goal not found" });

		stats.lastGoal = lastGoal.goal;

		// GET SPENTH THIS MONTH
		const spentThisMonth = await getSpentThisMonthService(req.user);

		if (!spentThisMonth) return res.status(400).json({ Error: "Spent this month not found" });

		stats.spentThisMonth = spentThisMonth;

		// GET HIGHGEST AND LOWEST SPENDING MONTHS
		const { max, maxMonth } = await getHighestAndLowestSpentMonthService(req.user);

		if (!max) return res.status(400).json({ Error: "Failed to get highest spent month" });

		stats.highestSpentMonthAmount = max;
		stats.highestSpentMonth = maxMonth;

		const { min, minMonth } = await getHighestAndLowestSpentMonthService(req.user);

		if (!min) return res.status(400).json({ Error: "Failed to get lowest spent month" });

		stats.lowestSpentMonthAmount = min;
		stats.lowestSpentMonth = minMonth;

		// GET LAST 12 MONTHS
		const monthExpensesArray = await getLast12MonthsExpensesService(req.user);

		stats.last12months = monthExpensesArray;

		return res.status(200).json({ data: stats });
	} catch (error) {
		console.log(error);
		res.status(500).json({ Error: error });
	}
};
