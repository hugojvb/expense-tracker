const TransactionsSchema = require("../models/TransactionsSchema");
const GoalsSchema = require("../models/GoalsSchema");
const dayjs = require("dayjs");
const { Mongoose } = require("mongoose");

let lastYearExpenses = [];

const getAllExpensesFromLastYear = async (user) => {
	const allExpensesFromLastYear = await TransactionsSchema.find({
		user,
		date: {
			$gte: dayjs().subtract(11, "months").startOf("month"),
			$lt: dayjs(),
		},
	}).sort({ date: -1 });

	lastYearExpenses = allExpensesFromLastYear;

	return allExpensesFromLastYear;
};

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
	const allExpenses = lastYearExpenses.length === 0 ? await getAllExpensesFromLastYear(user) : lastYearExpenses;

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
			minimumSpentMonth = dayjs().set("month", i).format("MMMM");
		}
		if (tmp > maximumSpent) {
			maximumSpent = Math.round((tmp * 100) / 100);
			maximumSpentMonth = dayjs().set("month", i).format("MMMM");
		}
	}

	return {
		max: maximumSpent,
		min: minimumSpent,
		maxMonth: maximumSpentMonth,
		minMonth: minimumSpentMonth,
	};
};

exports.getLast12MonthsExpensesService = async (user) => {
	const allExpenses = lastYearExpenses.length === 0 ? await getAllExpensesFromLastYear(user) : lastYearExpenses;

	let monthExpensesArray = [];

	for (let i = 0; i < 12; i++) {
		const currentMonth =
			dayjs().get("month") + i + 1 > 11 ? dayjs().get("month") + i - 11 : dayjs().get("month") + i + 1;
		monthExpensesArray.push({
			name: dayjs().set("month", currentMonth).format("MMM"),
			amount: allExpenses.reduce(
				(sum, expense) =>
					dayjs(expense.date).get("month") === currentMonth &&
					dayjs(expense.date).isAfter(dayjs().subtract(1, "year"))
						? (sum += Math.round(+expense.amount))
						: sum,
				0
			),
		});
	}

	return monthExpensesArray;
};

exports.getYearsMeanExpensesService = async (user) => {
	const allExpenses = await TransactionsSchema.find({
		user,
		date: {
			$gte: dayjs().subtract(5, "years").endOf("month"),
			$lt: dayjs(),
		},
	});

	let yearExpensesArray = [];
	let sumOfExpensesInCurrentYear = 0;

	for (let i = 4; i >= 0; i--) {
		const currentYear = dayjs().get("year") - i;
		let firstRecordedMonthInYear = dayjs().set("year", dayjs().format("YYYY")).set("month", 11).endOf("month");

		allExpenses.forEach((expense) => {
			if (dayjs(expense.date).get("year") === currentYear) {
				sumOfExpensesInCurrentYear += Math.round(+expense.amount);
				if (dayjs(expense.date).isBefore(firstRecordedMonthInYear)) {
					firstRecordedMonthInYear = dayjs(expense.date).format("M");
				}
			}
		}, 0);

		sumOfExpensesInCurrentYear = Math.round(sumOfExpensesInCurrentYear / (13 - +firstRecordedMonthInYear));

		yearExpensesArray.push({
			name: dayjs().set("year", currentYear).format("YYYY"),
			amount: sumOfExpensesInCurrentYear,
		});

		yearExpensesArray = yearExpensesArray.filter((year) => year.amount !== 0);
	}

	return yearExpensesArray;
};

exports.getLast3yearsGoalsService = async (user) => {
	let allGoals = await GoalsSchema.find({
		user,
		date: {
			$gte: dayjs().subtract(3, "years").endOf("month"),
			$lt: dayjs(),
		},
	});

	allGoals = allGoals.map((goal) => ({ goal: goal.goal, date: dayjs(goal.date).format("MM-YYYY") }));

	return allGoals;
};
