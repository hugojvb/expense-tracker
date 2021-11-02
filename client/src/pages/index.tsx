import {
	FC,
	Fragment,
	ReactNode,
	useCallback,
	useEffect,
	useState,
} from "react";

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
	Box,
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
import { StylesContext } from "@material-ui/styles";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";

// FUNCTIONAL COMPONENT
const Home: FC = () => {
	const [innerWidth, setInnerWidth] = useState(window.innerWidth);

	const resize = useCallback(() => {
		setInnerWidth(window.innerWidth);
	}, [setInnerWidth]);

	useEffect(() => {
		window.addEventListener("resize", () => resize());
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
				height: "50em",
				minWidth: "100%",
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
			<Card className={classes.card}>
				<CardContent>
					<Grid container spacing={3}>
						<Grid
							item
							container
							direction="column"
							xs={4}
							justify="center"
							alignItems="center"
						>
							<AttachMoneyIcon
								color="secondary"
								style={{ fontSize: 250 }}
							/>
							<Button variant="contained" color="primary">
								Add an Expense
							</Button>
						</Grid>
						<Grid
							item
							container
							direction="column"
							xs={4}
							justify="center"
							alignItems="center"
						>
							<AttachMoneyIcon
								color="secondary"
								style={{ fontSize: 250 }}
							/>
							<Button variant="contained" color="primary">
								Add a Goal
							</Button>
						</Grid>
						<Grid
							item
							container
							direction="column"
							xs={4}
							justify="center"
							alignItems="center"
						>
							<AttachMoneyIcon
								color="secondary"
								style={{ fontSize: 250 }}
							/>
							<Button variant="contained" color="primary">
								View Summary
							</Button>
						</Grid>
					</Grid>
				</CardContent>
			</Card>
		</Container>
	);
};

export default Home;
