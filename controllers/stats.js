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

		stats.lastMonth = lastMonth ? lastMonth : 0;

		// GET LAST SEMESTER MEAN EXPENSES
		const lastSemesterMean = await getLastSemesterMeanService(req.user);

		stats.lastSemesterMean = lastSemesterMean;

		// GET LAST GOAL
		const lastGoal = await getLastGoalService(req.user);

		stats.lastGoal = lastGoal.goal ? lastGoal.goal : 0;

		// GET SPENTH THIS MONTH
		const spentThisMonth = await getSpentThisMonthService(req.user);

		stats.spentThisMonth = spentThisMonth ? spentThisMonth : 0;

		// GET HIGHGEST AND LOWEST SPENDING MONTHS
		const { max, maxMonth } = await getHighestAndLowestSpentMonthService(req.user);

		stats.highestSpentMonthAmount = max ? max : 0;
		stats.highestSpentMonth = maxMonth ? maxMonth : "-";

		const { min, minMonth } = await getHighestAndLowestSpentMonthService(req.user);

		stats.lowestSpentMonthAmount = min ? min : 0;
		stats.lowestSpentMonth = minMonth ? minMonth : "-";

		// GET LAST 12 MONTHS
		const monthExpensesArray = await getLast12MonthsExpensesService(req.user);

		stats.last12months = monthExpensesArray;

		return res.status(200).json({ data: stats });
	} catch (error) {
		console.log(error);
		res.status(500).json({ Error: error });
	}
};
