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

// GET LAST MONTH TOTAL EXPENSES
const getLastMonth = async () => {
	const lastMonthArray = await TransactionsSchema.find({
		user: req.user,
		date: {
			$gte: dayjs().subtract(1, "month").startOf("month"),
			$lt: dayjs().subtract(1, "month").endOf("month"),
		},
	}).sort({ date: -1 });

	return Math.round(lastMonthArray?.reduce((sum, current) => (sum += current.amount), 0));
};

exports.getStats = async (req, res) => {
	try {
		let stats = {};

		// GET LAST MONTH TOTAL EXPENSES
		stats.lastMonth = await getLastMonth();

		// GET LAST SEMESTER MEAN EXPENSES
		stats.lastSemesterMean = await getLastSemesterMeanService(req.user);

		// GET LAST GOAL
		const lastGoal = await getLastGoalService(req.user);

		stats.lastGoal = lastGoal.goal ? lastGoal.goal : 0;

		// GET SPENTH THIS MONTH
		stats.spentThisMonth = (await getSpentThisMonthService(req.user))
			? await getSpentThisMonthService(req.user)
			: 0;

		// GET HIGHGEST AND LOWEST SPENDING MONTHS
		const { max, maxMonth } = await getHighestAndLowestSpentMonthService(req.user);

		stats.highestSpentMonthAmount = max ? max : 0;
		stats.highestSpentMonth = maxMonth ? maxMonth : "-";

		const { min, minMonth } = await getHighestAndLowestSpentMonthService(req.user);

		stats.lowestSpentMonthAmount = min ? min : 0;
		stats.lowestSpentMonth = minMonth ? minMonth : "-";

		// GET LAST 12 MONTHS
		stats.last12months = await getLast12MonthsExpensesService(req.user);

		// GET LAST 5 YEARS EXPENSES
		stats.last5years = await getYearsMeanExpensesService(req.user);

		return res.status(200).json({ data: stats });
	} catch (error) {
		console.log(error);
		res.status(500).json({ Error: error });
	}
};
