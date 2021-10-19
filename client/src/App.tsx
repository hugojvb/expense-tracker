import { FC, useContext, useEffect, useLayoutEffect } from "react";

import Context from "./context/context";

// COMPONENTS IMPORT
import Home from "./pages";
import History from "./pages/History";
import Goals from "./pages/Goals";
import Login from "./pages/Login";
import Layout from "./components/Layout";

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { CookiesProvider } from "react-cookie";

// FUNCTIONAL COMPONENT
const App = (): JSX.Element => {
	const context = useContext(Context);

	// LOGGED IN STATE
	const { loggedIn, login } = context;

	useLayoutEffect(() => {}, []);

	return (
		<Router>
			<CookiesProvider>
				<Layout>
					<Route path="/">
						{!loggedIn && <Redirect to="/login" />}
						{loggedIn && <Redirect to="/" />}
					</Route>
					<Route exact path="/">
						<Home />
					</Route>
					<Route exact path="/history" component={History}></Route>
					<Route exact path="/goals" component={Goals}></Route>
					<Route exact path="/login">
						<Login />
					</Route>
				</Layout>
			</CookiesProvider>
		</Router>
	);
};

export default App;
