import { Fragment, useState, useContext } from "react";

import { useForm } from "react-hook-form";

import axios from "axios";

import Context from "../context/context";

import { useHistory } from "react-router-dom";

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

import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";

const useStyles = makeStyles((theme) =>
	createStyles({
		center: { display: "flex", justifyContent: "center", alignItems: "center" },
		card: { marginTop: "15vh", padding: "2vw" },
		footerCopyright: { color: "grey", textAlign: "center", marginTop: "40px" },
		footerCopyrightCompany: { color: "inherit", textDecoration: "none" },
		formGroup: { marginBottom: "10px", marginTop: "5px" },
		button: { marginTop: "30px" },
		instructions: { margin: theme.spacing(2, 0), lineHeight: 2 },
		logo: { marginRight: "10px" },
	})
);

export default function Form() {
	const classes = useStyles();
	const context = useContext(Context);

	const { login, loggedIn } = context;

	const [passwordVisible, setPasswordVisible] = useState(false);
	const [wasValidated, setWasValidated] = useState(false);
	const [notValidated, setNotValidated] = useState(false);

	const { register, handleSubmit, errors, setValue } = useForm();

	const history = useHistory();

	const togglePassword = () => {
		setPasswordVisible(!passwordVisible);
	};

	const firstSubmit = async (data: any) => {
		const login = await axios.post("/api/signin", data);

		if (login.data.success === true) {
			setWasValidated(true);
			setValue("username", "");
			setValue("password", "");
			const twoFa = await axios.get("/api/2fa");
		} else {
			setNotValidated(true);
		}
	};

	const handleCloseSnackbar = (reason: any) => {
		if (reason === "clickaway") {
			return;
		}
		setNotValidated(false);
	};

	document.title = "Login - Expense Tracker";

	return (
		<Fragment>
			<Container maxWidth="sm">
				<Card className={classes.card}>
					<Container className={classes.center}>
						<img src="/logo.png" alt="logo" height="50" width="60" className={classes.logo} />

						<Typography variant="h5" color="secondary">
							Expense Tracker
						</Typography>
					</Container>
					<CardContent>
						<form onSubmit={handleSubmit(firstSubmit)}>
							<FormGroup className={classes.formGroup}>
								<TextField
									inputRef={register({ required: true })}
									type="text"
									id="username"
									name="username"
									aria-describedby="username"
									label="Username"
									required
									error={errors.username ? true : false}
								/>
							</FormGroup>
							<FormGroup>
								<TextField
									inputRef={register({ required: true, minLength: 6 })}
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
												<IconButton aria-label="toggle password visibility" onClick={togglePassword}>
													{passwordVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}
												</IconButton>
											</InputAdornment>
										),
									}}
								/>
							</FormGroup>

							<Snackbar open={notValidated} autoHideDuration={3000} onClose={handleCloseSnackbar} TransitionComponent={Grow}>
								<Alert elevation={6} variant="filled" onClose={handleCloseSnackbar} severity="error">
									Nom d'utilisateur ou mot de passe incorrect! Veuillez réessayer.
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
						<a href="/" target="_blank" rel="noopener noreferrer " className={classes.footerCopyrightCompany}>
							Expense Tracker
						</a>
					</p>
				</div>
			</Container>
		</Fragment>
	);
}
