import { useReducer, FC } from "react";

// CONTEXT IMPORTS
import Context from "./context";
import reducer from "./reducer";

// TYPES IMPORT
import { LOGIN, LOGOUT, TOGGLE_DRAWER } from "./types";

const State: FC = (props: any): JSX.Element => {
	// INITIAL STATE
	const initialState = {
		loggedIn: true,
		drawer: true,
		isDrawerOpen: true,
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

	// TOGGLE DRAWER
	const toggleDrawer = (isOpened: boolean) => {
		dispatch({ type: TOGGLE_DRAWER, payload: isOpened });
	};

	return (
		<Context.Provider
			value={{
				loggedIn: state.loggedIn,
				login,
				logout,
				isDrawerOpen: state.isDrawerOpen,
				toggleDrawer,
			}}
		>
			{props?.children}
		</Context.Provider>
	);
};

export default State;
