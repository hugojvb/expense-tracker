import { useReducer, FC } from "react";

// CONTEXT IMPORTS
import Context from "./context";
import reducer from "./reducer";

// TYPES IMPORT
import { LOGIN, LOGOUT } from "./types";

const State: FC = (props: any): JSX.Element => {
	// INITIAL STATE
	const initialState = {
		loggedIn: true,
		drawer: true,
	};

	// USE REDUCER FUNCTION
	const [state, dispatch] = useReducer(reducer, initialState);

	// LOGIN ACTION
	const login = () => {
		dispatch({ type: LOGIN });
	};

	// LOGOUT ACTION
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
