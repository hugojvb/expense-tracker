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

export default function AddDialog({ openAddDialog, setOpenAddDialog, setOpenAddedSuccess, setOpenAddedError, isDemo }) {
	const handleClose = () => {
		setOpenAddDialog(false);
	};

	const { register, handleSubmit, errors, control } = useForm();

	const classes = useStyles();

	const submitAddInstance = async (data) => {
		try {
			console.log(data);
			const res = await axios.post("/api/", data);
			setOpenAddDialog(false);
			setOpenAddedSuccess(true);
			return res;
		} catch (error) {
			setOpenAddedError(true);
			console.log(error);
		}
	};

	return (
		<div>
			<Dialog open={openAddDialog} onClose={handleClose} TransitionComponent={Grow} aria-labelledby="form-dialog-title">
				<DialogTitle id="form-dialog-title" className={classes.title}>
					Add {isDemo ? "Demo" : "Production"} Instance
					<Divider />
				</DialogTitle>
				<form onSubmit={handleSubmit(submitAddInstance)}>
					<DialogContent>
						<TextField
							inputRef={register({ required: true })}
							margin="dense"
							id="name"
							name="name"
							label="Name"
							type="text"
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
							defaultValue={5}
							type="number"
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
							defaultValue="2022-01-01"
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
							render={({ onChange, value, name, ref }) => (
								<Checkbox name={name} onChange={(e) => onChange(e.target.checked)} checked={value} inputRef={ref} color="primary" />
							)}
						/>

						<FormLabel label="Demo"> Demo</FormLabel>
						<Controller
							control={control}
							name="Demo"
							label="Demo"
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
							Add
						</Button>
					</DialogActions>
				</form>
			</Dialog>
		</div>
	);
}
