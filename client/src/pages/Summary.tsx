import {
	FC,
	Fragment,
	useContext,
	useCallback,
	useEffect,
	useState,
} from "react";
import {
	Card,
	CardContent,
	Typography,
	makeStyles,
	Container,
	Button,
	createStyles,
	Grid,
} from "@material-ui/core";
import {
	LineChart,
	Line,
	CartesianGrid,
	XAxis,
	YAxis,
	BarChart,
	Tooltip,
	Legend,
	Bar,
	RadialBarChart,
	RadialBar,
} from "recharts";
import Context from "../context/context";

// FUNCTIONAL COMPONENT
const Summary: FC = () => {
	const [innerWidth, setInnerWidth] = useState(window.innerWidth);

	const resize = useCallback(() => {
		setInnerWidth(window.innerWidth);
	}, [setInnerWidth]);

	const context = useContext(Context);
	const { getData, transactions, loading } = context;

	useEffect(() => {
		window.addEventListener("resize", () => resize());

		(async () => {
			await getData("lastmonth", true);
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

	const data = [
		{ name: "Page A", uv: 400, pv: 2400, amt: 2400 },
		{ name: "Page B", uv: 200, pv: 2400, amt: 2400 },
		{ name: "Page C", uv: 300, pv: 2400, amt: 2400 },
		{ name: "Page D", uv: 150, pv: 2400, amt: 2400 },
		{ name: "Page E", uv: 350, pv: 2400, amt: 2400 },
	];

	return (
		<Container className={classes.container}>
			<Grid container spacing={3}>
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
									<img
										src="../../loading.svg"
										alt="loading"
										style={{ width: 50 }}
									/>
								</div>
							) : (
								<Typography
									variant="h3"
									align="center"
									color="secondary"
								>
									€450
								</Typography>
							)}
						</CardContent>
					</Card>
				</Grid>
				<Grid item lg={3} md={6} xs={12}>
					<Card className={classes.card}>
						<CardContent>
							<Typography variant="body2" align="center">
								Last 6 Months Mean
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
										src="../../loading.svg"
										alt="loading"
										style={{ width: 50 }}
									/>
								</div>
							) : (
								<Typography
									variant="h3"
									align="center"
									color="secondary"
								>
									€463
								</Typography>
							)}
						</CardContent>
					</Card>
				</Grid>
				<Grid item lg={3} md={6} xs={12}>
					<Card className={classes.card}>
						<CardContent>
							<Typography variant="body2" align="center">
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
										src="../../loading.svg"
										alt="loading"
										style={{ width: 50 }}
									/>
								</div>
							) : (
								<Typography
									variant="h3"
									align="center"
									color="secondary"
								>
									€430
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
									<img
										src="../../loading.svg"
										alt="loading"
										style={{ width: 50 }}
									/>
								</div>
							) : (
								<Typography
									variant="h3"
									align="center"
									color="secondary"
								>
									€263
								</Typography>
							)}
						</CardContent>
					</Card>
				</Grid>
				<Grid item lg={6} xs={12}>
					<Card className={classes.bigCard}>
						<LineChart
							width={innerWidth * 0.35}
							height={200}
							data={data}
							margin={{
								top: 0,
								right: 0,
								left: 0,
								bottom: 0,
							}}
						>
							<Line
								type="monotone"
								dataKey="uv"
								stroke="#8884d8"
							/>
							<CartesianGrid stroke="#ccc" />
							<XAxis dataKey="name" />
							<YAxis />
						</LineChart>
					</Card>
				</Grid>
				<Grid item lg={6} xs={12}>
					<Card className={classes.bigCard}>
						<BarChart width={730} height={250} data={data}>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis dataKey="name" />
							<YAxis />
							<Tooltip />
							<Legend />
							<Bar dataKey="pv" fill="#8884d8" />
							<Bar dataKey="uv" fill="#82ca9d" />
						</BarChart>
					</Card>
				</Grid>
				<Grid item lg={6} xs={12}>
					<Card className={classes.bigCard}>
						<BarChart width={730} height={250} data={data}>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis dataKey="name" />
							<YAxis />
							<Tooltip />
							<Legend />
							<Bar dataKey="pv" fill="#8884d8" />
							<Bar dataKey="uv" fill="#82ca9d" />
						</BarChart>
					</Card>
				</Grid>
				<Grid item lg={3} md={6} xs={12}>
					<Card className={classes.bigCard}>
						<RadialBarChart
							width={730}
							height={250}
							innerRadius="10%"
							outerRadius="80%"
							data={data}
							startAngle={180}
							endAngle={0}
						>
							{/* <RadialBar
								minAngle={15}
								label={{
									fill: "#666",
									position: "insideStart",
								}}
								background
								clockWise={true}
								dataKey="uv"
							/> */}
							<Legend
								iconSize={10}
								width={120}
								height={140}
								layout="vertical"
								verticalAlign="middle"
								align="right"
							/>
							<Tooltip />
						</RadialBarChart>
					</Card>
				</Grid>
				<Grid item lg={3} md={6} xs={12}>
					<Card className={classes.bigCard}></Card>
				</Grid>
			</Grid>
		</Container>
	);
};

export default Summary;
