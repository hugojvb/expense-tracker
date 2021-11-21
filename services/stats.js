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
	const allExpenses = await TransactionsSchema.find({ user }).sort({ date: -1 });

	let monthExpensesArray = [];
	let maximumSpent = Number.NEGATIVE_INFINITY;
	let minimumSpent = Number.POSITIVE_INFINITY;
	let tmp, minimumSpentMonth, maximumSpentMonth;

	for (let i = 0; i < 12; i++) {
		monthExpensesArray.push({
			i: allExpenses.reduce(
				(sum, expense) => (dayjs(expense.date).get("month") === i ? (sum += +expense.amount) : sum),
				0
			),
		});
	}

	for (let i = 0; i < 12; i++) {
		tmp = monthExpensesArray[i].i;
		if (tmp < minimumSpent) {
			minimumSpent = Math.round((tmp * 100) / 100);
			minimumSpentMonth = dayjs().set("month", i).format("MMM");
		}
		if (tmp > maximumSpent) {
			maximumSpent = Math.round((tmp * 100) / 100);
			maximumSpentMonth = dayjs().set("month", i).format("MMM");
		}
	}

	return { max: maximumSpent, min: minimumSpent, maxMonth: maximumSpentMonth, minMonth: minimumSpentMonth };
};

exports.getLast12MonthsExpensesService = async (user) => {
	const allExpenses = await TransactionsSchema.find({ user }).sort({ date: -1 });

	let monthExpensesArray = [];

	for (let i = 0; i < 12; i++) {
		monthExpensesArray.push({
			name: dayjs().set("month", i).format("MMM"),
			amount: allExpenses.reduce(
				(sum, expense) => (dayjs(expense.date).get("month") === i ? (sum += +expense.amount) : sum),
				0
			),
		});
	}

	return monthExpensesArray;
};