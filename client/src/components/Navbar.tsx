import { FC, Fragment, useState, useContext } from "react";

import { makeStyles, Theme, createStyles, AppBar, Typography, Toolbar, IconButton, Menu, MenuItem } from "@material-ui/core";

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
	})
);

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
					{context?.logged_in && (
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
					)}
				</Toolbar>
			</AppBar>
		</Fragment>
	);
};

export default Navbar;
