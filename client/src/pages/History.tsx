import { Fragment, useContext } from "react";

// COMPONENTS
import HistoryTable from "../components/History/HistoryTable/HistoryTable";
import Navbar from "../components/Navbar";

// MATERIAL-UI COMPONENTS
import { Box, makeStyles, createStyles } from "@material-ui/core";
import clsx from "clsx";

// CONTEXT API
import Context from "../context/context";

const drawerWidth = 240;

const useStyles = makeStyles((theme) =>
	createStyles({
		drawerHeader: {
			display: "flex",
			alignItems: "center",
			padding: theme.spacing(0, 1),
			// necessary for content to be below app bar
			...theme.mixins.toolbar,
			justifyContent: "flex-start",
		},
		content: {
			flexGrow: 1,
			padding: theme.spacing(7, 6),
			transition: theme.transitions.create("margin", {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen,
			}),
			marginLeft: drawerWidth,
		},
		contentShift: {
			transition: theme.transitions.create("margin", {
				easing: theme.transitions.easing.easeOut,
				duration: theme.transitions.duration.enteringScreen,
			}),
			marginLeft: theme.spacing(7.5) + 1,
		},
	})
);

export default function DemoInstances() {
	const classes = useStyles();

	const context = useContext(Context);
	// const { drawer } = context;

	return (
		<Fragment>
			<Navbar />
			<Box
				className={clsx(classes.content, {
					// [classes.contentShift]: !drawer,
				})}
			>
				<HistoryTable />
			</Box>
		</Fragment>
	);
}
