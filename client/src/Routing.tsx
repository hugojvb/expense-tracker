import { FC, useContext } from "react";

// REACT ROUTER DOM IMPORTS
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

// CONTEXT IMPORT
import Context from "./context/context";

// COMPONENTS IMPORT
import Home from "./components/Home";
import History from "./components/History/History";
import Goals from "./components/Goals/Goals";
import Login from "./components/Login";

// FUNCTIONAL COMPONENT
const Routing: FC = () => {
	// USE CONTEXT HOOK
	const context = useContext(Context);

	// LOGGED IN STATE
	const { loggedIn } = context;

	return (
		<>
			<Router>
				<Route exact path="/">
					{!loggedIn && <Redirect to="/login" />}
				</Route>
				<Route exact path="/login">
					<Login />
					{loggedIn && <Redirect to="/" />}
				</Route>
				<Route exact path="/" component={Home} />
				<Route exact path="/history" component={History} />
				<Route exact path="/goals" component={Goals} />
			</Router>
		</>
	);
};

export default Routing;
