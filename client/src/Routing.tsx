import { FC, Fragment, useContext } from "react";

import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import Context from "./context/context";

import Home from "./components/Home";

const Routing: FC = () => {
	const context = useContext(Context);

	const { loggedIn } = context;

	return (
		<Fragment>
			<Router>
				<Route exact path="/">
					{loggedIn ? <Redirect to="/home" /> : <Redirect to="/login" />}
				</Route>
				<Route exact path="/login">
					{loggedIn && <Redirect to="/home" />}
				</Route>
				<Route exact path="/home" component={Home} />
			</Router>
		</Fragment>
	);
};

export default Routing;
