import { useReducer, FC } from "react";
import { useCookies } from "react-cookie";

// CONTEXT IMPORTS
import Context from "./context";
import reducer from "./reducer";

import axios from "axios";

// TYPES IMPORT
import {
	GET_GOALS,
	GET_TRANSACTIONS,
	LOGIN,
	LOGOUT,
	SET_LOADING,
	TOGGLE_DRAWER,
} from "./types";

const State: FC = (props: any): JSX.Element => {
	const [cookies, setCookie] = useCookies();

	// INITIAL STATE
	const initialState = {
		loggedIn: cookies.token ? true : false,
		isDrawerOpen: true,
		transactions: [],
		goals: [],
		loading: false,
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

	const getData = async (data: string, stats?: boolean) => {
		dispatch({ type: SET_LOADING, payload: true });
		const res = await axios.get(`/api/${stats ? "stats/" : ""}${data}`);

		dispatch({ type: `GET_${data.toUpperCase()}`, payload: res.data.data });
	};

	return (
		<Context.Provider
			value={{
				loggedIn: state.loggedIn,
				login,
				logout,
				isDrawerOpen: state.isDrawerOpen,
				toggleDrawer,
				transactions: state.transactions,
				goals: state.goals,
				getData,
				loading: state.loading,
			}}
		>
			{props?.children}
		</Context.Provider>
	);
};

export default State;
