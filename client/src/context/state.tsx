import React, { useReducer } from "react";
import Context from "./context";
import reducer from "./reducer";
import { LOGIN, LOGOUT } from "./types";

const State = (props: any) => {
	const initialState = {
		loggedIn: true,
		drawer: true,
	};

	const [state, dispatch] = useReducer(reducer, initialState);

	// actions
	const login = () => {
		dispatch({ type: LOGIN });
	};

	const logout = () => {
		dispatch({ type: LOGOUT });
	};

	return (
		<Context.Provider
			value={{
				loggedIn: state.loggedIn,
				login,
				logout,
			}}
		>
			{props?.children}
		</Context.Provider>
	);
};

export default State;
