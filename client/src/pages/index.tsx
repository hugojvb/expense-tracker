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
				height: "150px",
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
			<Grid container spacing={5}>
				<Grid item lg={3} md={6} xs={12}>
					<Card className={classes.card}>
						<CardContent>
							<Typography variant="h3" align="center">
								€450 Month
							</Typography>
						</CardContent>
					</Card>
				</Grid>
				<Grid item lg={3} md={6} xs={12}>
					<Card>
						<CardContent>
							<Typography variant="h3" align="center">
								Last 5 Months of Expenses
							</Typography>
						</CardContent>
					</Card>
				</Grid>
				<Grid item lg={3} md={6} xs={12}>
					<Card>
						<CardContent>
							<Typography variant="h3" align="center">
								Current Goal
							</Typography>
						</CardContent>
					</Card>
				</Grid>
				<Grid item lg={3} md={6} xs={12}>
					<Card>
						<CardContent>
							<Typography variant="h3" align="center">
								Total Spent this Month
							</Typography>
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</Container>
	);
};

export default Home;
