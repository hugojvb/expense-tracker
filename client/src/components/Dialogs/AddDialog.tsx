import { FC } from "react";

// MATERIAL UI COMPONENTS
import { Button, TextField, Dialog, DialogContent, DialogActions, DialogTitle, Divider, makeStyles, Grow } from "@material-ui/core";

// REACT HOOK FORM
import { useForm, Controller } from "react-hook-form";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
	title: { color: theme.palette.primary.main },
	textField: { marginBottom: "20px" },
}));

interface Props {
	openAddDialog: any;
	setOpenAddDialog: any;
	setOpenAddedSuccess: any;
	setOpenAddedError: any;
}

const AddDialog: FC<Props> = ({ openAddDialog, setOpenAddDialog, setOpenAddedSuccess, setOpenAddedError }) => {
	const handleClose = () => {
		setOpenAddDialog(false);
	};

	const { register, handleSubmit, errors, control } = useForm();

	const classes = useStyles();

	const submitAddInstance = async (data: any) => {
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
					Add Instance
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
};

export default AddDialog;
