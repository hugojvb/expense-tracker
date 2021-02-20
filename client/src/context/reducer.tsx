import { LOGIN, LOGOUT } from "./types";

const reducer = (state: any, action: any) => {
	switch (action.type) {
		case LOGIN:
			return {
				...state,
				logged_in: true,
			};
		case LOGOUT:
			return {
				...state,
				logged_in: false,
			};
		default:
			return state;
	}
};

export default reducer;
