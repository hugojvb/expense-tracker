import { FC, useContext } from "react";

import Context from "./context/context";

// COMPONENTS IMPORT
import Home from "./pages";
import History from "./pages/History";
import Goals from "./pages/Goals";
import Login from "./pages/Login";
import Layout from "./components/Layout";

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

// FUNCTIONAL COMPONENT
const App = (): JSX.Element => {
	const context = useContext(Context);

	// LOGGED IN STATE
	const { loggedIn } = context;

	return (
		<Router>
			<Layout>
				<Route exact path="/">
					{!loggedIn && <Redirect to="/login" />}
					<Home />
				</Route>
				<Route exact path="/history" component={History} />
				<Route exact path="/goals" component={Goals} />
				<Route exact path="/login">
					{loggedIn && <Redirect to="/" />}
					<Login />
				</Route>
			</Layout>
		</Router>
	);
};

export default App;
