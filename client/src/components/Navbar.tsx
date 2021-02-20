import { FC, Fragment, useState, useContext } from "react";

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

import HomeIcon from "@material-ui/icons/Home";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AccountCircle from "@material-ui/icons/AccountCircle";
import TrackChangesIcon from "@material-ui/icons/TrackChanges";
import HistoryIcon from "@material-ui/icons/History";

import Context from "../context/context";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			flexGrow: 1,
		},
		title: {
			flexGrow: 1,
			marginLeft: 20,
		},
		menu: {
			marginTop: "5vh",
		},
	})
);

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

const Navbar: FC = (): JSX.Element => {
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const openMenu = Boolean(anchorEl);

	const context = useContext(Context);

	const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleCloseMenu = () => {
		setAnchorEl(null);
	};

	return (
		<Fragment>
			<AppBar position="sticky" className={classes.root} color="primary">
				<Toolbar>
					<img src="/logo.png" alt="logo" height="40" width="50" />
					<Typography variant="h6" className={classes.title}>
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
							className={classes.menu}
						>
							<StyledMenuItem onClick={handleCloseMenu}>
								<ListItemIcon>
									<HomeIcon fontSize="small" />
								</ListItemIcon>
								<ListItemText primary="Home" />
							</StyledMenuItem>
							<StyledMenuItem onClick={handleCloseMenu}>
								<ListItemIcon>
									<TrackChangesIcon fontSize="small" />
								</ListItemIcon>
								<ListItemText primary="Goals" />
							</StyledMenuItem>
							<StyledMenuItem onClick={handleCloseMenu}>
								<ListItemIcon>
									<HistoryIcon fontSize="small" />
								</ListItemIcon>
								<ListItemText primary="History" />
							</StyledMenuItem>
							<StyledMenuItem onClick={handleCloseMenu}>
								<ListItemIcon>
									<ExitToAppIcon fontSize="small" />
								</ListItemIcon>
								<ListItemText primary="Logout" />
							</StyledMenuItem>
						</Menu>
					</div>
				</Toolbar>
			</AppBar>
		</Fragment>
	);
};

export default Navbar;
