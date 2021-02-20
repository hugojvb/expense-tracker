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

import InboxIcon from "@material-ui/icons/MoveToInbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import SendIcon from "@material-ui/icons/Send";
import AccountCircle from "@material-ui/icons/AccountCircle";

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
		"&:focus": {
			backgroundColor: theme.palette.primary.main,
			"& .MuiListItemIcon-root, & .MuiListItemText-primary": {
				color: theme.palette.common.white,
			},
		},
	},
}))(MenuItem);

const Navbar: FC = () => {
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
									<SendIcon fontSize="small" />
								</ListItemIcon>
								<ListItemText primary="Sent mail" />
							</StyledMenuItem>
							<StyledMenuItem onClick={handleCloseMenu}>
								<ListItemIcon>
									<DraftsIcon fontSize="small" />
								</ListItemIcon>
								<ListItemText primary="Drafts" />
							</StyledMenuItem>
							<StyledMenuItem onClick={handleCloseMenu}>
								<ListItemIcon>
									<InboxIcon fontSize="small" />
								</ListItemIcon>
								<ListItemText primary="Inbox" />
							</StyledMenuItem>
						</Menu>
					</div>
				</Toolbar>
			</AppBar>
		</Fragment>
	);
};

export default Navbar;
