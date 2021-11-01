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
				<Grid item xs={12}>
					<Card className={classes.card}>
						<CardContent>
							<Typography variant="h4" align="center">
								Add an Expense
							</Typography>
							<Button variant="contained" color="primary">
								Add
							</Button>
						</CardContent>
					</Card>
				</Grid>
				<Grid item xs={12}>
					<Card className={classes.card}>
						<CardContent>
							<Typography variant="h4" align="center">
								Add an Expense
							</Typography>
							<Button variant="contained" color="primary">
								Add
							</Button>
						</CardContent>
					</Card>
				</Grid>
				<Grid item xs={12}>
					<Card className={classes.card}>
						<CardContent>
							<Typography variant="h4" align="center">
								Add an Expense
							</Typography>
							<Button variant="contained" color="primary">
								Add
							</Button>
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</Container>
	);
};

export default Home;
