import React, { useReducer } from "react";
import Context from "./context";
import reducer from "./reducer";
import { LOGIN, LOGOUT } from "./types";

const State = (props: any) => {
	const initialState = {
		logged_in: false,
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
				logged_in: state.logged_in,

				login,
				logout,
			}}
		>
			{props?.children}
		</Context.Provider>
	);
};

export default State;
