import { FC, Fragment, useContext, useCallback, useEffect, useState } from "react";
import { Card, CardContent, Typography, makeStyles, Container, Button, createStyles, Grid } from "@material-ui/core";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, BarChart, Tooltip, Legend, Bar } from "recharts";
import Context from "../context/context";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import theme from "../theme";

// FUNCTIONAL COMPONENT
const Summary: FC = () => {
	const [innerWidth, setInnerWidth] = useState(window.innerWidth);

	const resize = useCallback(() => {
		setInnerWidth(window.innerWidth);
	}, [setInnerWidth]);

	const context = useContext(Context);
	const { getData, stats, loading, setLoading } = context;

	useEffect(() => {
		window.addEventListener("resize", () => resize());

		(async () => {
			if (!stats) {
				setLoading(true);
				await getData("stats");
				setLoading(false);
			}
		})();

		return () =>
			document.removeEventListener("resize", () => {
				resize();
			});
	}, [resize]);

	// USE STYLES HOOK
	const useStyles = makeStyles((theme) =>
		createStyles({
			container: {
				display: "flex",
				minWidth: "100%",
			},
			card: {
				height: "15em",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
			},
			cardAlt: {
				height: "15em",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				backgroundColor: theme.palette.primary.main,
			},
			bigCard: {
				height: "20em",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
			},
			titles: {
				marginTop: "4vh",
			},
		})
	);
	const classes = useStyles();

	return (
		<Container className={classes.container}>
			<Grid container spacing={3}>
				<Grid item lg={3} md={6} xs={12}>
					<Card className={classes.cardAlt}>
						<CardContent>
							<Typography variant="body2" align="center" style={{ color: "#fff" }}>
								Current Goal
							</Typography>
							{loading ? (
								<div
									className="container"
									style={{
										width: "100%",
										display: "flex",
										flexDirection: "row",
										justifyContent: "center",
										alignItems: "center",
										marginTop: 10,
									}}
								>
									<img
										src="../../loading2.svg"
										alt="loading"
										style={{
											width: 50,
										}}
									/>
								</div>
							) : (
								<Typography variant="h3" align="center" style={{ color: "#fff" }}>
									€ {stats?.lastGoal}
								</Typography>
							)}
						</CardContent>
					</Card>
				</Grid>
				<Grid item lg={3} md={6} xs={12}>
					<Card className={classes.card}>
						<CardContent>
							<Typography variant="body2" align="center">
								Spent this Month
							</Typography>
							{loading ? (
								<div
									className="container"
									style={{
										width: "100%",
										display: "flex",
										flexDirection: "row",
										justifyContent: "center",
										alignItems: "center",
										marginTop: 10,
									}}
								>
									<img src="../../loading.svg" alt="loading" style={{ width: 50 }} />
								</div>
							) : (
								<Typography variant="h3" align="center" color="secondary">
									€ {stats?.spentThisMonth}
									{stats?.spentThisMonth > stats?.lastGoal ? (
										<ArrowDropUpIcon color="error" fontSize="large" />
									) : (
										<ArrowDropDownIcon style={{ color: "green" }} fontSize="large" />
									)}
								</Typography>
							)}
						</CardContent>
					</Card>
				</Grid>
				<Grid item lg={3} md={6} xs={12}>
					<Card className={classes.card}>
						<CardContent>
							<Typography variant="body2" align="center">
								Last Month
							</Typography>
							{loading ? (
								<div
									className="container"
									style={{
										width: "100%",
										display: "flex",
										flexDirection: "row",
										justifyContent: "center",
										alignItems: "center",
										marginTop: 10,
									}}
								>
									<img src="../../loading.svg" alt="loading" style={{ width: 50 }} />
								</div>
							) : (
								<Typography variant="h3" align="center" color="secondary">
									€ {stats?.lastMonth}
									{stats?.lastMonth > stats?.lastGoal ? (
										<ArrowDropUpIcon color="error" fontSize="large" />
									) : (
										<ArrowDropDownIcon style={{ color: "green" }} fontSize="large" />
									)}
								</Typography>
							)}
						</CardContent>
					</Card>
				</Grid>
				<Grid item lg={3} md={6} xs={12}>
					<Card className={classes.card}>
						<CardContent>
							<Typography variant="body2" align="center">
								Last 6 Months (Mean)
							</Typography>

							{loading ? (
								<div
									className="container"
									style={{
										width: "100%",
										display: "flex",
										flexDirection: "row",
										justifyContent: "center",
										alignItems: "center",
										marginTop: 10,
									}}
								>
									<img src="../../loading.svg" alt="loading" style={{ width: 50 }} />
								</div>
							) : (
								<Typography variant="h3" align="center" color="secondary">
									€ {stats?.lastSemesterMean}
									{stats?.lastSemesterMean > stats?.lastGoal ? (
										<ArrowDropUpIcon color="error" fontSize="large" />
									) : (
										<ArrowDropDownIcon style={{ color: "green" }} fontSize="large" />
									)}
								</Typography>
							)}
						</CardContent>
					</Card>
				</Grid>

				<Grid item lg={6} xs={12}>
					<Card className={classes.bigCard}>
						{loading ? (
							<div
								className="container"
								style={{
									width: "100%",
									display: "flex",
									flexDirection: "row",
									justifyContent: "center",
									alignItems: "center",
									marginTop: 10,
								}}
							>
								<img src="../../loading.svg" alt="loading" style={{ width: 50 }} />
							</div>
						) : (
							<BarChart
								width={innerWidth > 1280 ? innerWidth * 0.37 : innerWidth * 0.55}
								height={250}
								data={stats?.last12months}
							>
								<CartesianGrid strokeDasharray="3 3" stroke="#eee" />
								<XAxis dataKey="name" />
								<Legend />
								<YAxis dataKey="amount" />
								<Tooltip />
								<Bar dataKey="amount" fill={theme.palette.primary.main} />
							</BarChart>
						)}
					</Card>
				</Grid>
				<Grid item lg={3} md={6} xs={12}>
					<Card className={classes.bigCard}>
						<CardContent>
							<Typography variant="body1" align="center">
								Highest Spending Month
							</Typography>
							<Typography variant="body2" color="textSecondary" align="center">
								(Last 12 months)
							</Typography>

							{loading ? (
								<div
									className="container"
									style={{
										width: "100%",
										display: "flex",
										flexDirection: "row",
										justifyContent: "center",
										alignItems: "center",
										marginTop: 10,
									}}
								>
									<img src="../../loading.svg" alt="loading" style={{ width: 50 }} />
								</div>
							) : (
								<Fragment>
									<Typography variant="h3" align="center" color="secondary">
										Last {stats?.highestSpentMonth}
									</Typography>
									<Typography variant="h5" align="center" color="textSecondary">
										€ {stats?.highestSpentMonthAmount}
									</Typography>
								</Fragment>
							)}
						</CardContent>
					</Card>
				</Grid>
				<Grid item lg={3} md={6} xs={12}>
					<Card className={classes.bigCard}>
						<CardContent>
							<Typography variant="body2" align="center">
								Lowest Spending Month
							</Typography>

							<Typography variant="body2" color="textSecondary" align="center">
								(Last 12 months)
							</Typography>

							{loading ? (
								<div
									className="container"
									style={{
										width: "100%",
										display: "flex",
										flexDirection: "row",
										justifyContent: "center",
										alignItems: "center",
										marginTop: 10,
									}}
								>
									<img src="../../loading.svg" alt="loading" style={{ width: 50 }} />
								</div>
							) : (
								<Fragment>
									<Typography variant="h3" align="center" color="secondary">
										Last {stats?.lowestSpentMonth}
									</Typography>
									<Typography variant="h5" align="center" color="textSecondary">
										€ {stats?.lowestSpentMonthAmount}
									</Typography>
								</Fragment>
							)}
						</CardContent>
					</Card>
				</Grid>

				<Grid item lg={6} xs={12}>
					<Card className={classes.bigCard}>
						{loading ? (
							<div
								className="container"
								style={{
									width: "100%",
									display: "flex",
									flexDirection: "row",
									justifyContent: "center",
									alignItems: "center",
									marginTop: 10,
								}}
							>
								<img src="../../loading.svg" alt="loading" style={{ width: 50 }} />
							</div>
						) : (
							<LineChart
								width={innerWidth > 1280 ? innerWidth * 0.35 : innerWidth * 0.55}
								height={200}
								data={stats?.last5years}
								margin={{
									top: 0,
									right: 0,
									left: 0,
									bottom: 0,
								}}
							>
								<Line type="monotone" dataKey="amount" stroke="#8884d8" />
								<CartesianGrid stroke="#eee" />
								<Legend />
								<Tooltip />
								<XAxis dataKey="name" />
								<YAxis dataKey="amount" />
							</LineChart>
						)}
					</Card>
				</Grid>
				<Grid item lg={6} xs={12}>
					<Card className={classes.bigCard}>
						{loading ? (
							<div
								className="container"
								style={{
									width: "100%",
									display: "flex",
									flexDirection: "row",
									justifyContent: "center",
									alignItems: "center",
									marginTop: 10,
								}}
							>
								<img src="../../loading.svg" alt="loading" style={{ width: 50 }} />
							</div>
						) : (
							<LineChart
								width={innerWidth > 1280 ? innerWidth * 0.37 : innerWidth * 0.55}
								height={250}
								data={stats?.goalsLast3years}
							>
								<CartesianGrid strokeDasharray="3 3" />
								<XAxis dataKey="date" />
								<YAxis dataKey="goal" />
								<Tooltip />
								<Legend />
								<Line type="monotone" dataKey="goal" stroke="#8884d8" />
							</LineChart>
						)}
					</Card>
				</Grid>
			</Grid>
		</Container>
	);
};

export default Summary;
