// TYPES IMPORT
import { GET_GOALS, GET_STATS, GET_TRANSACTIONS, LOGIN, LOGOUT, SET_LOADING, TOGGLE_DRAWER } from "./types";

const reducer = (state: any, action: { type: string; payload?: any }) => {
	switch (action.type) {
		case LOGIN:
			return {
				...state,
				loggedIn: true,
			};
		case LOGOUT:
			return {
				...state,
				loggedIn: false,
			};
		case TOGGLE_DRAWER:
			return {
				...state,
				isDrawerOpen: action.payload,
			};
		case GET_TRANSACTIONS:
			return {
				...state,
				transactions: action.payload,
			};
		case GET_GOALS:
			return {
				...state,
				goals: action.payload,
			};
		case SET_LOADING:
			return {
				...state,
				loading: action.payload,
			};
		case GET_STATS:
			return {
				...state,
				stats: action.payload,
			};
		default:
			return state;
	}
};

export default reducer;
