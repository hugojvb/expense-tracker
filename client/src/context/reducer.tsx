import { LOGIN, LOGOUT } from "./types";

const reducer = (state: any, action: any) => {
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
