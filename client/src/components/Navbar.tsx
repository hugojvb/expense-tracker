import { FC, Fragment, useState } from "react";

import { makeStyles, Theme, createStyles, AppBar, Typography, Toolbar, IconButton, Menu, MenuItem } from "@material-ui/core";

import AccountCircle from "@material-ui/icons/AccountCircle";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			flexGrow: 1,
		},

		title: {
			flexGrow: 1,
			marginLeft: 10,
		},
	})
);

const Navbar: FC = () => {
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const openMenu = Boolean(anchorEl);

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
					<img src="/logo.png" alt="logo" height="50" width="50" />
					<Typography variant="h6" className={classes.title}>
						Expense Tracker
					</Typography>
					{/* {loggedIn && (
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
								id="menu-appbar"
								anchorEl={anchorEl}
								anchorOrigin={{
									vertical: "top",
									horizontal: "right",
								}}
								keepMounted
								transformOrigin={{
									vertical: "top",
									horizontal: "right",
								}}
								open={openMenu}
								onClose={handleCloseMenu}
							>
								<MenuItem onClick={handleCloseMenu}>Profile</MenuItem>
								<MenuItem onClick={handleCloseMenu}>My account</MenuItem>
							</Menu>
						</div>
					)} */}
				</Toolbar>
			</AppBar>
		</Fragment>
	);
};

export default Navbar;
