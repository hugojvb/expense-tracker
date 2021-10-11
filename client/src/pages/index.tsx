import { FC, Fragment, ReactNode } from "react";

// MATERIAL-UI COMPONENTS IMPORT
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
	ResponsiveContainer,
} from "recharts";

// FUNCTIONAL COMPONENT
const Home: FC = () => {
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
				height: "40em",
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
			<Grid container spacing={5}>
				<Grid item lg={3} md={6} xs={12}>
					<Card className={classes.card}>
						<CardContent>
							<Typography variant="body2" align="center">
								Last Month
							</Typography>
							<Typography
								variant="h3"
								align="center"
								color="secondary"
							>
								€450
							</Typography>
						</CardContent>
					</Card>
				</Grid>
				<Grid item lg={3} md={6} xs={12}>
					<Card className={classes.card}>
						<CardContent>
							<Typography variant="body2" align="center">
								Last 5 Months Mean
							</Typography>

							<Typography
								variant="h3"
								align="center"
								color="secondary"
							>
								€463
							</Typography>
						</CardContent>
					</Card>
				</Grid>
				<Grid item lg={3} md={6} xs={12}>
					<Card className={classes.card}>
						<CardContent>
							<Typography variant="body2" align="center">
								Current Goal
							</Typography>
							<Typography
								variant="h3"
								align="center"
								color="secondary"
							>
								€430
							</Typography>
						</CardContent>
					</Card>
				</Grid>
				<Grid item lg={3} md={6} xs={12}>
					<Card className={classes.card}>
						<CardContent>
							<Typography variant="body2" align="center">
								Spent this Month
							</Typography>
							<Typography
								variant="h3"
								align="center"
								color="secondary"
							>
								€263
							</Typography>
						</CardContent>
					</Card>
				</Grid>
				<Grid item lg={6} md={12}>
					<Card className={classes.bigCard}>
						<LineChart
							width={550}
							height={400}
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
			</Grid>
		</Container>
	);
};

export default Home;
