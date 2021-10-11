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

import useDrawerState from "../hooks/useDrawerState";

// FUNCTIONAL COMPONENT
const Home: FC = () => {
	// USE STYLES HOOK
	const useStyles = makeStyles((theme) =>
		createStyles({
			container: {
				display: "flex",
				justifyContent: "center",
			},
			titles: {
				marginTop: "4vh",
			},
		})
	);
	const classes = useStyles();

	return (
		<Container fixed className={classes.container}>
			<Grid container>
				<Grid item md={6}>
					<h1>Hello</h1>
				</Grid>
				<Grid item md={6}>
					<h1>Hello</h1>
				</Grid>
				<Grid item md={6}>
					<h1>Hello</h1>
				</Grid>
				<Grid item md={6}>
					<h1>Hello</h1>
				</Grid>
			</Grid>
		</Container>
	);
};

export default Home;
