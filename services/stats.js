const TransactionsSchema = require("../models/TransactionsSchema");
const GoalsSchema = require("../models/GoalsSchema");
const dayjs = require("dayjs");

exports.getLastSemesterMeanService = async (user) => {
	const lastSemester = await TransactionsSchema.find({
		user,
		date: {
			$gte: dayjs().subtract(6, "month").startOf("month"),
			$lt: dayjs().subtract(1, "month").endOf("month"),
		},
	}).sort({ date: -1 });

	const lastSixMonthsSum = lastSemester.reduce((sum, current) => (sum += current.amount), 0);

	const semesterMean = Math.round(lastSixMonthsSum / 6);

	return semesterMean;
};

exports.getLastGoalService = async (user) => {
	const lastGoal = await GoalsSchema.findOne({
		user,
	}).sort({ date: -1 });

	return lastGoal;
};

exports.getSpentThisMonthService = async (user) => {
	const thisMonth = await TransactionsSchema.find({
		user,
		date: {
			$gte: dayjs().startOf("month"),
			$lt: dayjs(),
		},
	}).sort({ date: -1 });

	const spentThisMonth = Math.round(thisMonth.reduce((sum, current) => (sum += current.amount), 0));

	return spentThisMonth;
};

exports.getHighestAndLowestSpentMonthService = async (user) => {
	const allExpenses = TransactionsSchema.find({ user }).sort({ date: -1 });

	let monthExpensesArray = [];
	let summedExpensesPerMonth = [];
	let maximumSpent;
	let minimumSpent;

	for (let i = 0; i < 12; i++) {
		allExpenses.map((expense) =>
			dayjs(expense.date).get("month") === i ? monthExpensesArray[i][i].push(expense.amount) : ""
		);

		summedExpensesPerMonth = monthExpensesArray[i][i].reduce((sum, current) => (sum += current), 0);

		minimumSpent = Math.min(summedExpensesPerMonth.join());
		maximumSpent = Math.max(summedExpensesPerMonth.join());
	}

	return { max: maximumSpent, min: minimumSpent };
};
