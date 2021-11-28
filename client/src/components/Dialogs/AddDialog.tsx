import { FC, useContext } from "react";
import Context from "../../context/context";

// MATERIAL UI COMPONENTS
import {
	Button,
	TextField,
	Dialog,
	DialogContent,
	DialogActions,
	DialogTitle,
	Divider,
	makeStyles,
	Grow,
} from "@material-ui/core";

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
	type: string;
}

const AddDialog: FC<Props> = ({ openAddDialog, setOpenAddDialog, setOpenAddedSuccess, setOpenAddedError, type }) => {
	const handleClose = () => {
		setOpenAddDialog(false);
	};

	const context = useContext(Context);
	const { createData } = context;

	const { register, handleSubmit, errors, control } = useForm();

	const classes = useStyles();

	const submitAddInstance = async (data: any) => {
		try {
			await createData(type, data);
			setOpenAddDialog(false);
			setOpenAddedSuccess(true);
		} catch (error) {
			setOpenAddedError(true);
			console.log(error);
		}
	};

	return (
		<div>
			<Dialog
				open={openAddDialog}
				onClose={handleClose}
				TransitionComponent={Grow}
				aria-labelledby="form-dialog-title"
			>
				<DialogTitle id="form-dialog-title" className={classes.title}>
					Add {type.substring(0, 1).toUpperCase() + type.substring(1)}
					<Divider />
				</DialogTitle>
				<form onSubmit={handleSubmit(submitAddInstance)}>
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
							fullWidth
							required
							InputLabelProps={{
								shrink: true,
							}}
							classes={{ root: classes.textField }}
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose} variant="outlined" color="primary">
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
