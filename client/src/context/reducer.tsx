// TYPES IMPORT
import { GET_TRANSACTIONS, LOGIN, LOGOUT, TOGGLE_DRAWER } from "./types";

// REDUCER FUNCTION
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
		default:
			return state;
	}
};

export default reducer;
