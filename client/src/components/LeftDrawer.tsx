import { useState, useContext } from "react";

import {
	Theme,
	makeStyles,
	createStyles,
	IconButton,
	Divider,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Drawer,
} from "@material-ui/core";

import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import HomeIcon from "@material-ui/icons/Home";
import TrackChangesIcon from "@material-ui/icons/TrackChanges";

import Context from "../context/context";
import { useHistory } from "react-router";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		drawer: {
			width: drawerWidth,
			flexShrink: 0,
			whiteSpace: "nowrap",
		},
		toolbar: {
			display: "flex",
			alignItems: "center",
			justifyContent: "flex-end",
			padding: theme.spacing(0, 1),
			// necessary for content to be below app bar
			...theme.mixins.toolbar,
		},
		drawerOpen: {
			width: drawerWidth,
			transition: theme.transitions.create("width", {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.enteringScreen,
			}),
		},
		drawerClose: {
			transition: theme.transitions.create("width", {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen,
			}),
			overflowX: "hidden",
			width: theme.spacing(8),
		},
		content: {
			flexGrow: 1,
			padding: theme.spacing(3),
			transition: theme.transitions.create("margin", {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen,
			}),
		},
		contentShift: {
			transition: theme.transitions.create("margin", {
				easing: theme.transitions.easing.easeOut,
				duration: theme.transitions.duration.enteringScreen,
			}),
		},
	})
);

const LeftDrawer = () => {
	const classes = useStyles();
	const [open, setOpen] = useState(true);
	const history = useHistory();

	const context = useContext(Context);
	const { toggleDrawer, isDrawerOpen } = context;

	const handleDrawerOpen = () => {
		toggleDrawer(true);
	};

	const handleDrawerClose = () => {
		toggleDrawer(false);
	};

	return (
		<div>
			<Drawer
				variant="permanent"
				className={
					isDrawerOpen ? classes.drawerOpen : classes.drawerClose
				}
				classes={{
					paper: isDrawerOpen
						? classes.drawerOpen
						: classes.drawerClose,
				}}
			>
				<div className={classes.toolbar}>
					<IconButton onClick={handleDrawerClose}>
						<ChevronLeftIcon />
					</IconButton>
				</div>
				<List>
					<ListItem button onClick={() => history.push("/")}>
						<ListItemIcon>
							<HomeIcon />
						</ListItemIcon>
						<ListItemText primary="Home" />
					</ListItem>

					<Divider />
					<ListItem button onClick={() => history.push("/goals")}>
						<ListItemIcon>
							<TrackChangesIcon />
						</ListItemIcon>
						<ListItemText primary="Goals" />
					</ListItem>
				</List>
			</Drawer>
		</div>
	);
};

export default LeftDrawer;
