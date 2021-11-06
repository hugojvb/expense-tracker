import { FC, useState, useContext, MouseEvent } from "react";

import LeftDrawer from "./LeftDrawer";

// MATERIAL-UI COMPONENTS IMPORT
import {
	makeStyles,
	Theme,
	createStyles,
	AppBar,
	Typography,
	Toolbar,
	IconButton,
	Menu,
	MenuItem,
	withStyles,
	ListItemIcon,
	ListItemText,
} from "@material-ui/core";

// MATERIAL-UI ICONS IMPORT
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuIcon from "@material-ui/icons/Menu";

// ROUTER LINK IMPORT
import { Link } from "react-router-dom";

// CONTEXT IMPORT
import Context from "../context/context";

const drawerWidth: number = 240;

// CUSTOM MENU ITEM COMPONENT
const StyledMenuItem = withStyles((theme) => ({
	root: {
		"&:hover": {
			backgroundColor: theme.palette.primary.main,
			"& .MuiListItemIcon-root, & .MuiListItemText-primary": {
				color: theme.palette.common.white,
			},
		},
	},
}))(MenuItem);

// FUNCTIONAL COMPONENT
const Navbar: FC = (): JSX.Element => {
	const context = useContext(Context);

	const { logout, toggleDrawer, isDrawerOpen } = context;

	// MAKE STYLES
	const useStyles = makeStyles((theme: Theme) =>
		createStyles({
			root: {
				display: "flex",
			},
			menuButton: {
				marginRight: theme.spacing(2),
			},
			appBar: {
				zIndex: theme.zIndex.drawer + 1,
				transition: theme.transitions.create(["width", "margin"], {
					easing: theme.transitions.easing.sharp,
					duration: theme.transitions.duration.leavingScreen,
				}),
			},
			appBarShift: {
				flexGrow: 1,
				// marginLeft: drawerWidth,
				// width: `calc(100% - ${drawerWidth}px)`,
				transition: theme.transitions.create(["width", "margin"], {
					easing: theme.transitions.easing.sharp,
					duration: theme.transitions.duration.enteringScreen,
				}),
			},
			brand: {
				flexGrow: 1,
				marginLeft: 20,
			},
			link: {
				textDecoration: "none",
				color: "#444",
			},
			toolbar: {
				paddingLeft: theme.spacing(1),
				paddingRight: theme.spacing(2),
			},
		})
	);

	// USE STYLES HOOK
	const classes = useStyles();

	// MENU STATE
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const openMenu = Boolean(anchorEl);

	// OPEN MENU
	const handleMenu = (event: MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	// CLOSE MENU
	const handleCloseMenu = () => {
		setAnchorEl(null);
	};

	// CHANGE LOGGEDIN STATE
	const onLogout = () => {
		if (logout) {
			logout();
		}
	};

	return (
		<div className={classes.root}>
			<AppBar
				position="fixed"
				className={`${isDrawerOpen ? classes.appBarShift : ""} ${
					classes.appBar
				}`}
				color="primary"
			>
				<Toolbar disableGutters classes={{ root: classes.toolbar }}>
					<IconButton
						color="inherit"
						onClick={() => toggleDrawer(!isDrawerOpen)}
						className={classes.menuButton}
					>
						<MenuIcon />
					</IconButton>
					<img
						src="/logo.png"
						alt="logo"
						height="40"
						width="50"
						onClick={() => (window.location.pathname = "/")}
					/>
					<Typography variant="h6" className={classes.brand}>
						Expense Tracker
					</Typography>
					<div>
						<IconButton
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleMenu}
							color="inherit"
						>
							<AccountCircle />
						</IconButton>
						<Menu
							elevation={4}
							id="menu-appbar"
							anchorEl={anchorEl}
							anchorOrigin={{
								vertical: "bottom",
								horizontal: "center",
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "center",
							}}
							open={openMenu}
							onClose={handleCloseMenu}
						>
							<Link
								to="/login"
								className={classes.link}
								onClick={onLogout}
							>
								<StyledMenuItem onClick={handleCloseMenu}>
									<ListItemIcon>
										<ExitToAppIcon fontSize="small" />
									</ListItemIcon>
									<ListItemText primary="Logout" />
								</StyledMenuItem>
							</Link>
						</Menu>
					</div>
				</Toolbar>
			</AppBar>
			<LeftDrawer />
		</div>
	);
};

export default Navbar;
