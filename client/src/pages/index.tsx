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
} from "@material-ui/core";

// NAVBAR IMPORT
import Navbar from "../components/Navbar";
import Layout from "../components/Layout";
import useDrawerState from "../hooks/useDrawerState";

// FUNCTIONAL COMPONENT
const Home: FC = () => {
	const { isDrawerOpen } = useDrawerState();

	// USE STYLES HOOK
	const useStyles = makeStyles((theme) =>
		createStyles({
			container: {
				minWidth: "100%",
				display: "flex",
				justifyContent: "center",
				marginLeft: isDrawerOpen ? "100px" : "0px",
			},
			titles: {
				marginTop: "4vh",
			},
		})
	);
	const classes = useStyles();

	return (
		<Fragment>
			<Navbar />
			<Container fixed className={classes.container}>
				<Card>
					<CardContent>
						<Typography variant="h6" className={classes.titles}>
							Goal
						</Typography>
						<Typography variant="h3">400</Typography>
						<Typography variant="h6" className={classes.titles}>
							This Month
						</Typography>
						<Typography variant="h3">358</Typography>
						<Typography variant="h6" className={classes.titles}>
							Per Month
						</Typography>
						<Typography variant="h3">581</Typography>
					</CardContent>
					<br />
					<Button size="large" color="secondary" variant="contained">
						Add Expense
					</Button>
				</Card>
			</Container>
		</Fragment>
	);
};

export default Home;
