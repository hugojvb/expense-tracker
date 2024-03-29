import { useReducer, FC } from "react";
import { useCookies } from "react-cookie";

// CONTEXT IMPORTS
import Context from "./context";
import reducer from "./reducer";

import axios from "axios";

// TYPES IMPORT
import { GET_GOALS, GET_TRANSACTIONS, LOGIN, LOGOUT, SET_LOADING, TOGGLE_DRAWER } from "./types";

const State: FC = (props: any): JSX.Element => {
	const [cookies, setCookie] = useCookies();

	// INITIAL STATE
	const initialState = {
		loggedIn: cookies.token ? true : false,
		isDrawerOpen: true,
		transactions: [],
		goals: [],
		loading: false,
		stats: undefined,
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

	const getData = async (data: string) => {
		const res = await axios.get(`/api/${data}`);

		dispatch({ type: `GET_${data.toUpperCase()}`, payload: res.data.data });
	};

	const setLoading = async (shouldBeLoading: boolean) => {
		dispatch({ type: SET_LOADING, payload: shouldBeLoading });
	};

	const createData = async (data: string, form: any) => {
		const res = await axios.post(`/api/${data}`, form);

		dispatch({ type: `SET_${data.toUpperCase()}`, payload: res.data.data });
	};

	const deleteData = async (data: string, ids: string[]) => {
		await axios.delete(`/api/${data}`, { data: { ids: ids } });

		dispatch({ type: `DELETE_${data.toUpperCase()}`, payload: ids });
	};

	const updateData = async (data: string, id: string, form: any) => {
		const res = await axios.put(`/api/${data}/${id}`, form);

		dispatch({ type: `UPDATE_${data.toUpperCase()}`, payload: { data: res.data.data, id: id } });
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
				stats: state.stats,
				setLoading,
				createData,
				deleteData,
				updateData,
			}}
		>
			{props?.children}
		</Context.Provider>
	);
};

export default State;
