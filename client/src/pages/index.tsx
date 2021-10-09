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

// MAKE STYLES
const useStyles = makeStyles((theme) =>
	createStyles({
		root: {
			width: 500,
			padding: "2vw",
			textAlign: "center",
			marginTop: "10vh",
		},
		container: {
			display: "flex",
			justifyContent: "center",
		},
		titles: {
			marginTop: "4vh",
		},
	})
);

// FUNCTIONAL COMPONENT
const Home: FC = () => {
	// USE STYLES HOOK
	const classes = useStyles();

	return (
		<Fragment>
			<Navbar />
			<Container maxWidth="sm" className={classes.container}>
				<Card className={classes.root}>
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

export default Layout(Home);
