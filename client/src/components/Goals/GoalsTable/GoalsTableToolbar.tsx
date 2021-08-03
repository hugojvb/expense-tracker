import { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { lighten, fade, makeStyles, Toolbar, Typography, IconButton, Tooltip, InputBase, Snackbar, Grow } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import DeleteIcon from "@material-ui/icons/Delete";
import SearchIcon from "@material-ui/icons/Search";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";

import DeleteDialog from "../../Dialogs/DeleteDialog";
import AddDialog from "../../Dialogs/AddDialog";
import UpdateDialog from "../../Dialogs/UpdateDialog";

const useToolbarStyles = makeStyles((theme) => ({
	root: {
		paddingLeft: theme.spacing(2),
		paddingRight: theme.spacing(1),
	},
	highlight:
		theme.palette.type === "light"
			? {
					color: theme.palette.secondary.main,
					backgroundColor: lighten(theme.palette.secondary.light, 0.85),
			  }
			: {
					color: theme.palette.text.primary,
					backgroundColor: theme.palette.secondary.dark,
			  },
	title: {
		flex: "1 1 100%",
	},
	search: {
		position: "relative",
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade("#aaa", 0.15),
		"&:hover": {
			backgroundColor: fade("#999", 0.25),
		},
		marginRight: theme.spacing(2),
		marginLeft: 0,
		width: "100%",
		[theme.breakpoints.up("sm")]: {
			marginLeft: theme.spacing(3),
			width: "auto",
		},
	},
	searchIcon: {
		padding: theme.spacing(0, 2),
		height: "100%",
		position: "absolute",
		pointerEvents: "none",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	inputRoot: {
		color: "inherit",
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
		transition: theme.transitions.create("width"),
		width: "100%",
		[theme.breakpoints.up("md")]: {
			width: "20ch",
		},
	},
	sortLabel: { marginLeft: theme.spacing(3) },
	icons: { display: "flex" },
}));

export default function GoalsTableToolbar({ numSelected, search, setSearch, rows, setFiltered, selected }) {
	const classes = useToolbarStyles();

	const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
	const [openAddDialog, setOpenAddDialog] = useState(false);
	const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
	const [openAddedSuccess, setOpenAddedSuccess] = useState(false);
	const [openAddedError, setOpenAddedError] = useState(false);
	const [openDeletedSuccess, setOpenDeletedSuccess] = useState(false);
	const [openDeletedError, setOpenDeletedError] = useState(false);
	const [openUpdatedSuccess, setOpenUpdatedSuccess] = useState(false);
	const [openUpdatedError, setOpenUpdatedError] = useState(false);

	const handleOpenDeleteDialog = () => {
		setOpenDeleteDialog(true);
	};

	const handleOpenAddDialog = () => {
		setOpenAddDialog(true);
	};

	const handleOpenUpdateDialog = () => {
		setOpenUpdateDialog(true);
	};

	// Close popups
	const handleCloseAddedSuccess = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}
		setOpenAddedSuccess(false);
	};

	const handleCloseAddedError = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}
		setOpenAddedError(false);
	};

	const handleCloseDeletedSuccess = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}
		setOpenDeletedSuccess(false);
	};

	const handleCloseDeletedError = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}
		setOpenDeletedError(false);
	};

	const handleCloseUpdatedSuccess = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}

		setOpenUpdatedSuccess(false);
	};

	const handleCloseUpdatedError = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}

		setOpenUpdatedError(false);
	};

	const onSearch = (e) => {
		setSearch(e.target.value);
		let arr = [];

		for (let i = 0; i < rows.length; i++) {
			if (
				Object.values(rows[i])
					.map((x) => x.toString().search(new RegExp(e.target.value, "gi")))
					.some((y) => y !== -1)
			) {
				arr.push(rows[i]);
			}
		}
		setFiltered(arr);
	};

	return (
		<Toolbar
			className={clsx(classes.root, {
				[classes.highlight]: numSelected > 0,
			})}
		>
			{numSelected > 0 ? (
				<Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
					{numSelected} selected
				</Typography>
			) : (
				<Typography className={classes.title} variant="h6" id="tableTitle" component="div" color="primary">
					Demo Instances
				</Typography>
			)}
			<div className={classes.search}>
				<div className={classes.searchIcon}>
					<SearchIcon />
				</div>
				<InputBase
					placeholder="Search…"
					classes={{
						root: classes.inputRoot,
						input: classes.inputInput,
					}}
					inputProps={{ "aria-label": "search" }}
					value={search}
					onChange={onSearch}
				/>
			</div>

			{numSelected === 1 ? (
				<div className={classes.icons}>
					<Tooltip title="Update">
						<IconButton aria-label="Update">
							<EditIcon color="secondary" onClick={handleOpenUpdateDialog} />
						</IconButton>
					</Tooltip>
					<Tooltip title="Delete">
						<IconButton aria-label="delete" onClick={handleOpenDeleteDialog}>
							<DeleteIcon color="error" />
						</IconButton>
					</Tooltip>
				</div>
			) : numSelected > 0 ? (
				<div className={classes.icons}>
					<Tooltip title="Delete">
						<IconButton aria-label="delete" onClick={handleOpenDeleteDialog}>
							<DeleteIcon color="error" />
						</IconButton>
					</Tooltip>
				</div>
			) : (
				<div className={classes.icons}>
					<Tooltip title="Add">
						<IconButton aria-label="add" onClick={handleOpenAddDialog}>
							<AddIcon color="primary" />
						</IconButton>
					</Tooltip>
				</div>
			)}
			<DeleteDialog
				openDeleteDialog={openDeleteDialog}
				setOpenDeleteDialog={setOpenDeleteDialog}
				selected={selected}
				setOpenDeletedSuccess={setOpenDeletedSuccess}
				setOpenDeletedError={setOpenDeletedError}
			/>
			<AddDialog
				openAddDialog={openAddDialog}
				setOpenAddDialog={setOpenAddDialog}
				setOpenAddedSuccess={setOpenAddedSuccess}
				setOpenAddedError={setOpenAddedError}
				isDemo={true}
			/>
			<UpdateDialog
				openUpdateDialog={openUpdateDialog}
				setOpenUpdateDialog={setOpenUpdateDialog}
				selected={selected}
				rows={rows}
				setOpenUpdatedSuccess={setOpenUpdatedSuccess}
				setOpenUpdatedError={setOpenUpdatedError}
				isDemo={true}
			/>
			<Snackbar open={openAddedSuccess} autoHideDuration={3000} onClose={handleCloseAddedSuccess} TransitionComponent={Grow}>
				<Alert elevation={6} variant="filled" onClose={handleCloseAddedSuccess} severity="success">
					Your instance was successfully added!
				</Alert>
			</Snackbar>
			<Snackbar open={openAddedError} autoHideDuration={3000} onClose={handleCloseAddedError} TransitionComponent={Grow}>
				<Alert elevation={6} variant="filled" onClose={handleCloseAddedError} severity="error">
					Something went wrong while adding your instance! Please try again.
				</Alert>
			</Snackbar>
			<Snackbar open={openDeletedSuccess} autoHideDuration={3000} onClose={handleCloseDeletedSuccess} TransitionComponent={Grow}>
				<Alert elevation={6} variant="filled" onClose={handleCloseDeletedSuccess} severity="success">
					Your instance was successfully deleted!
				</Alert>
			</Snackbar>
			<Snackbar open={openDeletedError} autoHideDuration={3000} onClose={handleCloseDeletedError} TransitionComponent={Grow}>
				<Alert elevation={6} variant="filled" onClose={handleCloseDeletedError} severity="error">
					Something went wrong while deleting your instance! Please try again.
				</Alert>
			</Snackbar>
			<Snackbar open={openUpdatedSuccess} autoHideDuration={3000} onClose={handleCloseUpdatedSuccess} TransitionComponent={Grow}>
				<Alert elevation={6} variant="filled" onClose={handleCloseUpdatedSuccess} severity="success">
					Your instance was successfully updated!
				</Alert>
			</Snackbar>
			<Snackbar open={openUpdatedError} autoHideDuration={3000} onClose={handleCloseUpdatedError} TransitionComponent={Grow}>
				<Alert elevation={6} variant="filled" onClose={handleCloseUpdatedError} severity="error">
					Something went wrong while updating your instance! Please try again.
				</Alert>
			</Snackbar>
		</Toolbar>
	);
}

GoalsTableToolbar.propTypes = {
	numSelected: PropTypes.number.isRequired,
};
