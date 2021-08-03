import { FC } from "react";

import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Divider, makeStyles, Grow } from "@material-ui/core";

import { useForm, Controller } from "react-hook-form";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
	title: { color: theme.palette.primary.main },
	textField: { marginBottom: "20px" },
}));

interface Props {
	openUpdateDialog: any;
	setOpenUpdateDialog: any;
	rows: any;
	setOpenUpdatedSuccess: any;
	setOpenUpdatedError: any;
	selected: any;
}

const UpdateDialog: FC<Props> = ({ openUpdateDialog, setOpenUpdateDialog, rows, setOpenUpdatedSuccess, setOpenUpdatedError, selected }) => {
	const { register, handleSubmit, control } = useForm();

	const classes = useStyles();

	const handleClose = () => {
		setOpenUpdateDialog(false);
	};

	const submitUpdateInstance = async (data: any) => {
		try {
			console.log(data);
			const res = await axios.put("/api/", { data });
			setOpenUpdateDialog(false);
			setOpenUpdatedSuccess(true);
			return res;
		} catch (error) {
			console.log(error);
			setOpenUpdatedError(true);
		}
	};

	const formatDate = (date: any) => {
		var d = new Date(date),
			month = "" + (d.getMonth() + 1),
			day = "" + d.getDate(),
			year = d.getFullYear();

		if (month.length < 2) month = "0" + month;
		if (day.length < 2) day = "0" + day;

		return [year, month, day].join("-");
	};

	let selectedRow: any;
	rows.forEach((current: any) => {
		if (current.name === selected[0]) selectedRow = current;
	});

	return (
		<div>
			<Dialog open={openUpdateDialog} onClose={handleClose} TransitionComponent={Grow} aria-labelledby="form-dialog-title">
				<DialogTitle id="form-dialog-title" className={classes.title}>
					Update Instance
					<Divider />
				</DialogTitle>
				<form onSubmit={handleSubmit(submitUpdateInstance)}>
					<DialogContent>
						<TextField
							inputRef={register({ required: true })}
							margin="dense"
							id="name"
							name="name"
							label="Name"
							type="text"
							defaultValue={selectedRow?.name}
							fullWidth
							required
							classes={{ root: classes.textField }}
						/>
						<TextField
							inputRef={register({ required: true })}
							margin="dense"
							id="subdomain"
							name="subdomain"
							label="Subdomain"
							type="text"
							defaultValue={selectedRow?.subDomain}
							fullWidth
							required
							classes={{ root: classes.textField }}
						/>
						<TextField
							inputRef={register({ required: true })}
							margin="dense"
							id="maxUsers"
							name="maxUsers"
							label="Max Users"
							type="number"
							defaultValue={selectedRow?.maxUsers}
							fullWidth
							required
							classes={{ root: classes.textField }}
						/>
						<TextField
							inputRef={register}
							margin="dense"
							id="expirationDate"
							type="date"
							label="Expiration Date"
							name="expirationDate"
							defaultValue={formatDate(selectedRow?.expirationDate)}
							fullWidth
							InputLabelProps={{
								shrink: true,
							}}
							classes={{ root: classes.textField }}
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose} variant="outlined" color="secondary">
							Cancel
						</Button>
						<Button type="submit" color="primary">
							Update
						</Button>
					</DialogActions>
				</form>
			</Dialog>
		</div>
	);
};

export default UpdateDialog;
