// TYPES IMPORT
import {
	DELETE_GOALS,
	DELETE_TRANSACTIONS,
	GET_GOALS,
	GET_STATS,
	GET_TRANSACTIONS,
	LOGIN,
	LOGOUT,
	SET_GOALS,
	SET_LOADING,
	SET_TRANSACTIONS,
	TOGGLE_DRAWER,
	UPDATE_GOALS,
	UPDATE_TRANSACTIONS,
} from "./types";

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
		case SET_GOALS: {
			return {
				...state,
				goals: [...state.goals, action.payload],
			};
		}
		case SET_TRANSACTIONS: {
			return {
				...state,
				transactions: [...state.transactions, action.payload],
			};
		}
		case DELETE_GOALS: {
			return {
				...state,
				goals: state.goals.filter((goal: any) => goal.id !== action.payload),
			};
		}
		case DELETE_TRANSACTIONS: {
			return {
				...state,
				transactions: state.transactions.filter((transaction: any) => transaction.id !== action.payload),
			};
		}
		case UPDATE_GOALS: {
			return {
				...state,
				goals: state.goals.filter((goal: any) => goal.id !== action.payload.id).concat(action.payload.data),
			};
		}
		case UPDATE_TRANSACTIONS: {
			return {
				...state,
				transactions: state.transactions
					.filter((transaction: any) => transaction.id !== action.payload.id)
					.concat(action.payload.data),
			};
		}
		default:
			return state;
	}
};

export default reducer;
