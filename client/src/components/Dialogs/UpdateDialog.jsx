import {
	Button,
	TextField,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Divider,
	Checkbox,
	makeStyles,
	FormLabel,
	Grow,
} from "@material-ui/core";

import { useForm, Controller } from "react-hook-form";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
	title: { color: theme.palette.primary.main },
	textField: { marginBottom: "20px" },
}));

export default function UpdateDialog({ openUpdateDialog, setOpenUpdateDialog, rows, setOpenUpdatedSuccess, setOpenUpdatedError, selected, isDemo }) {
	const { register, handleSubmit, control } = useForm();

	const classes = useStyles();

	const handleClose = () => {
		setOpenUpdateDialog(false);
	};

	const submitUpdateInstance = async (data) => {
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

	const formatDate = (date) => {
		var d = new Date(date),
			month = "" + (d.getMonth() + 1),
			day = "" + d.getDate(),
			year = d.getFullYear();

		if (month.length < 2) month = "0" + month;
		if (day.length < 2) day = "0" + day;

		return [year, month, day].join("-");
	};

	let selectedRow;
	rows.forEach((current) => {
		if (current.name === selected[0]) selectedRow = current;
	});

	return (
		<div>
			<Dialog open={openUpdateDialog} onClose={handleClose} TransitionComponent={Grow} aria-labelledby="form-dialog-title">
				<DialogTitle id="form-dialog-title" className={classes.title}>
					Update {isDemo ? "Demo" : "Production"} Instance
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
						<FormLabel label="Enabled"> Enabled</FormLabel>
						<Controller
							control={control}
							name="Enabled"
							label="Enabled"
							defaultValue={selectedRow?.isEnabled}
							render={({ onChange, value, name, ref }) => (
								<Checkbox name={name} onChange={(e) => onChange(e.target.checked)} checked={value} inputRef={ref} color="primary" />
							)}
						/>
						<FormLabel label="Demo"> Demo</FormLabel>
						<Controller
							control={control}
							name="Demo"
							label="Demo"
							defaultValue={selectedRow?.isDemo}
							render={({ onChange, value, name, ref }) => (
								<Checkbox
									name={name}
									onChange={(e) => onChange(e.target.checked)}
									checked={isDemo ? true : false}
									inputRef={ref}
									color="primary"
								/>
							)}
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
}
