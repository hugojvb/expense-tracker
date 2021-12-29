import { useState, useContext, FC } from "react";

// USE FORM IMPORT
import { useForm } from "react-hook-form";

// AXIOS IMPORT
import axios from "axios";

// CONTEXT IMPORT
import Context from "../context/context";

// USE HISTORY IMPORT
import { useHistory } from "react-router-dom";

// MATERIAL-UI COMPONENTS IMPORT
import {
	FormGroup,
	InputAdornment,
	Container,
	Button,
	TextField,
	IconButton,
	Card,
	CardContent,
	makeStyles,
	createStyles,
	Typography,
	Snackbar,
	Grow,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";

// MATERIAL-UI ICONS IMPORT
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";

// MAKE STYLES
const useStyles = makeStyles((theme) =>
	createStyles({
		center: {
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
		},
		card: { marginTop: "15vh", padding: "2vw" },
		footerCopyright: {
			color: "grey",
			textAlign: "center",
			marginTop: "40px",
		},
		footerCopyrightCompany: { color: "inherit", textDecoration: "none" },
		formGroup: { marginBottom: "10px", marginTop: "5px" },
		button: { marginTop: "30px" },
		instructions: { margin: theme.spacing(2, 0), lineHeight: 2 },
		logo: { marginRight: "10px" },
	})
);

// FUNCTIONAL COMPONENT
const Form: FC = () => {
	// USE STYLES HOOK
	const classes = useStyles();

	// USE CONTEXT HOOK
	const context = useContext(Context);

	// LOGIN STATE
	const { login, loggedIn }: { login: () => any; loggedIn: boolean } = context;

	// PASSWORD VISIBILITY STATE
	const [passwordVisible, setPasswordVisible] = useState(false);

	// TOGGLE PASSWORD VISIBILITY
	const togglePassword = () => {
		setPasswordVisible(!passwordVisible);
	};

	// LOGIN VALIDATION STATE
	const [wasValidated, setWasValidated] = useState(false);
	const [notValidated, setNotValidated] = useState(false);

	// USE FORM METHODS
	const { register, handleSubmit, errors, setValue } = useForm();

	// LOGIN SUBMIT
	const onSubmit = async (data: any) => {
		try {
			// LOGIN POST REQUEST
			const res = await axios.post("/api/auth/login", data);

			if (res.data.success === true) {
				setWasValidated(true);
				setValue("email", "");
				setValue("password", "");
				login();
			}
		} catch (error) {
			setNotValidated(true);
		}
	};

	// CLOSE SNACKBAR
	const handleCloseSnackbar = (reason: any) => {
		if (reason === "clickaway") {
			return;
		}
		setNotValidated(false);
	};

	// PAGE TITLE
	document.title = "Login - Expense Tracker";

	return (
		<>
			<Container maxWidth="sm">
				<Card className={classes.card}>
					<Container className={classes.center}>
						<img src="/logo.png" alt="logo" height="50" width="60" className={classes.logo} />

						<Typography variant="h5" color="secondary">
							Expense Tracker
						</Typography>
					</Container>
					<CardContent>
						<form onSubmit={handleSubmit(onSubmit)}>
							<FormGroup className={classes.formGroup}>
								<TextField
									inputRef={register({ required: true })}
									type="email"
									id="email"
									name="email"
									aria-describedby="email"
									label="Email"
									required
									error={errors.email ? true : false}
								/>
							</FormGroup>
							<FormGroup>
								<TextField
									inputRef={register({
										required: true,
										minLength: 6,
									})}
									type={passwordVisible ? "text" : "password"}
									id="password"
									name="password"
									aria-describedby="password"
									label="Password"
									required
									error={errors.password ? true : false}
									InputProps={{
										endAdornment: (
											<InputAdornment position="end">
												<IconButton
													aria-label="toggle password visibility"
													onClick={togglePassword}
												>
													{passwordVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}
												</IconButton>
											</InputAdornment>
										),
									}}
								/>
							</FormGroup>

							<Snackbar
								open={notValidated}
								autoHideDuration={3000}
								onClose={handleCloseSnackbar}
								TransitionComponent={Grow}
							>
								<Alert elevation={6} variant="filled" onClose={handleCloseSnackbar} severity="error">
									Email or Password Incorrect! Please try again.
								</Alert>
							</Snackbar>

							<Button variant="contained" type="submit" color="secondary" className={classes.button}>
								Login
							</Button>
						</form>
					</CardContent>
				</Card>

				<div className={classes.footerCopyright}>
					<p>
						&copy; {new Date().getFullYear()} -{" "}
						<a
							href="/"
							target="_blank"
							rel="noopener noreferrer "
							className={classes.footerCopyrightCompany}
						>
							Expense Tracker
						</a>
					</p>
				</div>
			</Container>
		</>
	);
};

export default Form;
