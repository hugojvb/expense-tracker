import { FC, useContext, useEffect } from "react";

import Context from "./context/context";

// COMPONENTS IMPORT
import Home from "./pages";
import History from "./pages/History";
import Goals from "./pages/Goals";
import Login from "./pages/Login";
import Layout from "./components/Layout";

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { useCookies } from "react-cookie";
import { CookiesProvider } from "react-cookie";

// FUNCTIONAL COMPONENT
const App = (): JSX.Element => {
	const context = useContext(Context);

	// LOGGED IN STATE
	const { loggedIn, login } = context;

	const [cookies, setCookie] = useCookies();

	useEffect(() => {
		if (cookies.token) login();
		console.log(cookies.token);
	}, []);

	return (
		<Router>
			<CookiesProvider>
				<Layout>
					<Route exact path="/">
						{!loggedIn && <Redirect to="/login" />}
						<Home />
					</Route>
					<Route exact path="/history" component={History}>
						{!loggedIn && <Redirect to="/login" />}
					</Route>
					<Route exact path="/goals" component={Goals}>
						{!loggedIn && <Redirect to="/login" />}
					</Route>
					<Route exact path="/login">
						{loggedIn && <Redirect to="/" />}
						<Login />
					</Route>
				</Layout>
			</CookiesProvider>
		</Router>
	);
};

export default App;
