import {
	FC,
	Fragment,
	ReactNode,
	useCallback,
	useEffect,
	useState,
} from "react";
import { useHistory } from "react-router";

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
	CardHeader,
	Avatar,
	IconButton,
} from "@material-ui/core";

import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import TrackChangesIcon from "@material-ui/icons/TrackChanges";
import TimelineIcon from "@material-ui/icons/Timeline";

const Home: FC = () => {
	const [innerWidth, setInnerWidth] = useState(window.innerWidth);
	const history = useHistory();

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
				padding: "2em",
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
				<CardContent
					style={{
						height: "100%",
						display: "flex",
						flexDirection: "column",
						justifyContent: "space-evenly",
					}}
				>
					<Typography variant="h4" color="primary" align="center">
						Welcome Back
					</Typography>
					<Grid item container spacing={3}>
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
								style={{ fontSize: 200 }}
							/>
							<hr />
							<Button
								variant="outlined"
								color="secondary"
								onClick={() => history.push("/history")}
							>
								View Expenses
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
							<TrackChangesIcon
								color="secondary"
								style={{ fontSize: 200 }}
							/>
							<hr />
							<Button
								variant="outlined"
								color="secondary"
								onClick={() => history.push("/goals")}
							>
								View Goals
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
							<TimelineIcon
								color="secondary"
								style={{ fontSize: 200 }}
							/>
							<hr />
							<Button
								variant="outlined"
								color="secondary"
								onClick={() => history.push("/summary")}
							>
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
