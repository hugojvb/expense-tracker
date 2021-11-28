import { FC } from "react";

import {
	Button,
	TextField,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Divider,
	makeStyles,
	Grow,
} from "@material-ui/core";

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
	type: string;
}

const UpdateDialog: FC<Props> = ({
	openUpdateDialog,
	setOpenUpdateDialog,
	rows,
	setOpenUpdatedSuccess,
	setOpenUpdatedError,
	selected,
	type,
}) => {
	const { register, handleSubmit, control } = useForm();

	const classes = useStyles();

	const handleClose = () => {
		setOpenUpdateDialog(false);
	};

	const submitUpdateInstance = async (data: any) => {
		try {
			console.log(data);
			const res = await axios.put(`/api/${type}s/${selected}`, { data });
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
		if (current._id === selected[0]) selectedRow = current;
	});

	return (
		<div>
			<Dialog
				open={openUpdateDialog}
				onClose={handleClose}
				TransitionComponent={Grow}
				aria-labelledby="form-dialog-title"
			>
				<DialogTitle id="form-dialog-title" className={classes.title}>
					Update {type.substring(0, 1).toUpperCase() + type.substring(1)}
					<Divider />
				</DialogTitle>
				<form onSubmit={handleSubmit(submitUpdateInstance)}>
					<DialogContent>
						{type === "transactions" ? (
							<>
								<TextField
									inputRef={register({ required: true })}
									margin="dense"
									id="name"
									name="name"
									label="Transaction"
									type="text"
									defaultValue={selectedRow?.name}
									fullWidth
									required
									classes={{ root: classes.textField }}
								/>

								<TextField
									inputRef={register({ required: true })}
									margin="dense"
									id="amount"
									name="amount"
									label="Amount"
									type="number"
									defaultValue={selectedRow?.amount}
									fullWidth
									required
									classes={{ root: classes.textField }}
								/>
							</>
						) : (
							<TextField
								inputRef={register({ required: true })}
								margin="dense"
								id="goal"
								name="goal"
								label="Goal"
								type="number"
								defaultValue={selectedRow?.goal}
								fullWidth
								required
								classes={{ root: classes.textField }}
							/>
						)}
						<TextField
							inputRef={register}
							margin="dense"
							id="date"
							type="date"
							label="Date"
							name="date"
							defaultValue={formatDate(selectedRow?.date)}
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
