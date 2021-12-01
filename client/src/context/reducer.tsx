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
				goals: [action.payload, ...state.goals],
			};
		}
		case SET_TRANSACTIONS: {
			return {
				...state,
				transactions: [action.payload, ...state.transactions],
			};
		}
		case DELETE_GOALS: {
			return {
				...state,
				goals: state.goals.filter((goal: any) => goal._id !== action.payload[0]),
			};
		}
		case DELETE_TRANSACTIONS: {
			return {
				...state,
				transactions: state.transactions.filter(
					(transaction: any) => !action.payload.includes(transaction._id)
				),
			};
		}
		case UPDATE_GOALS: {
			return {
				...state,
				goals: state.goals.map((goal: any) => (goal._id === action.payload.id[0] ? action.payload.data : goal)),
			};
		}
		case UPDATE_TRANSACTIONS: {
			return {
				...state,
				transactions: state.transactions.map((transaction: any) =>
					transaction._id === action.payload.id[0] ? action.payload.data : transaction
				),
			};
		}
		default:
			return state;
	}
};

export default reducer;
