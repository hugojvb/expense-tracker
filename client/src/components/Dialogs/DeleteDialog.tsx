import { FC } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grow, makeStyles, Divider } from "@material-ui/core";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
	title: { color: theme.palette.primary.main },
	yes: { color: "red" },
}));

interface Props {
	openDeleteDialog: any;
	setOpenDeleteDialog: any;
	selected: any;
	setOpenDeletedSuccess: any;
	setOpenDeletedError: any;
}

const AlertDialog: FC<Props> = ({ openDeleteDialog, setOpenDeleteDialog, selected, setOpenDeletedSuccess, setOpenDeletedError }) => {
	const classes = useStyles();

	const handleClose = () => {
		setOpenDeleteDialog(false);
	};

	const deleteInstance = async () => {
		try {
			const res = await axios.delete("/api", { data: selected });
			setOpenDeleteDialog(false);
			setOpenDeletedSuccess(true);
			return res;
		} catch (error) {
			setOpenDeleteDialog(false);
			setOpenDeletedError(true);
		}
	};

	return (
		<div>
			<Dialog
				disableBackdropClick
				disableEscapeKeyDown
				open={openDeleteDialog}
				onClose={handleClose}
				TransitionComponent={Grow}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title" className={classes.title}>
					{"Delete Instances"}
					<Divider />
				</DialogTitle>

				<DialogContent>
					<DialogContentText id="alert-dialog-description">Are you sure you want to delete the selected Instances?</DialogContentText>
				</DialogContent>

				<DialogActions>
					<Button onClick={handleClose} variant="outlined" color="secondary">
						Cancel
					</Button>
					<Button
						onClick={deleteInstance}
						classes={{
							root: classes.yes,
							label: classes.yes,
						}}
						autoFocus
					>
						Yes
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default AlertDialog;
