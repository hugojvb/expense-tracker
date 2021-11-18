// TYPES IMPORT
import {
	GET_GOALS,
	GET_HIGHESTSPENTMONTH,
	GET_LASTGOAL,
	GET_LASTMONTH,
	GET_LASTSEMESTERMEAN,
	GET_LOWESTSPENTMONTH,
	GET_SPENTTHISMONTH,
	GET_TRANSACTIONS,
	LOGIN,
	LOGOUT,
	SET_LOADING,
	TOGGLE_DRAWER,
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
				loading: false,
			};
		case GET_GOALS:
			return {
				...state,
				goals: action.payload,
				loading: false,
			};
		case SET_LOADING:
			return {
				...state,
				loading: action.payload,
			};
		case GET_LASTMONTH:
			return {
				...state,
				stats: { ...state.stats, lastMonth: action.payload },
				loading: false,
			};
		case GET_LASTSEMESTERMEAN:
			return {
				...state,
				stats: { ...state.stats, lastSemesterMean: action.payload },
				loading: false,
			};
		case GET_LASTGOAL:
			return {
				...state,
				stats: { ...state.stats, lastGoal: action.payload },
				loading: false,
			};
		case GET_SPENTTHISMONTH:
			return {
				...state,
				stats: { ...state.stats, spentThisMonth: action.payload },
				loading: false,
			};
		case GET_HIGHESTSPENTMONTH:
			return {
				...state,
				stats: { ...state.stats, highestSpentMonth: action.payload },
				loading: false,
			};
		case GET_LOWESTSPENTMONTH:
			return {
				...state,
				stats: { ...state.stats, lowestSpentMonth: action.payload },
				loading: false,
			};
		default:
			return state;
	}
};

export default reducer;
