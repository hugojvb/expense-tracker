// TYPES IMPORT
import { LOGIN, LOGOUT } from "./types";

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
		default:
			return state;
	}
};

export default reducer;
