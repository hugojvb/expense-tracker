import {
  LOGIN,
  LOGOUT,
  STOP_LOADING,
  GET_ACTIVITY,
  GET_BODYFAT,
  GET_BODYWEIGHT,
  GET_SLEEP,
  GET_HEARTRATE,
  GET_FOOD,
  OPEN_GOALS_MODAL,
  CLOSE_GOALS_MODAL,
  OPEN_CALORIESOUT_MODAL,
  CLOSE_CALORIESOUT_MODAL,
  OPEN_CALORIESBMR_MODAL,
  CLOSE_CALORIESBMR_MODAL,
  OPEN_STEPS_MODAL,
  CLOSE_STEPS_MODAL,
  OPEN_BMI_MODAL,
  CLOSE_BMI_MODAL,
  OPEN_DISTANCE_MODAL,
  CLOSE_DISTANCE_MODAL,
  OPEN_CALORIEINTAKE_MODAL,
  CLOSE_CALORIEINTAKE_MODAL,
  OPEN_WEIGHT_MODAL,
  CLOSE_WEIGHT_MODAL,
  OPEN_BODYFAT_MODAL,
  CLOSE_BODYFAT_MODAL,
  OPEN_ACTIVITY_MODAL,
  CLOSE_ACTIVITY_MODAL,
  OPEN_HEARTRATE_MODAL,
  CLOSE_HEARTRATE_MODAL,
  OPEN_SLEEP_MODAL,
  CLOSE_SLEEP_MODAL,
} from "./types";

export default (state, action) => {
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
    case STOP_LOADING:
      return {
        ...state,
        loading: false,
      };
    case GET_ACTIVITY:
      return {
        ...state,
        activity: action.payload,
      };
    case GET_BODYFAT:
      return {
        ...state,
        bodyFat: action.payload,
      };
    case GET_BODYWEIGHT:
      return {
        ...state,
        bodyWeight: action.payload,
      };
    case GET_SLEEP:
      return {
        ...state,
        sleep: action.payload,
      };
    case GET_HEARTRATE:
      return {
        ...state,
        heartRate: action.payload,
      };
    case GET_FOOD:
      return {
        ...state,
        food: action.payload,
      };
    case OPEN_GOALS_MODAL:
      return {
        ...state,
        showGoalsModal: true,
      };
    case CLOSE_GOALS_MODAL:
      return {
        ...state,
        showGoalsModal: false,
      };
    case OPEN_CALORIESOUT_MODAL:
      return {
        ...state,
        showCaloriesOutModal: true,
      };
    case CLOSE_CALORIESOUT_MODAL:
      return {
        ...state,
        showCaloriesOutModal: false,
      };
    case OPEN_CALORIESBMR_MODAL:
      return {
        ...state,
        showCaloriesBMRModal: true,
      };
    case CLOSE_CALORIESBMR_MODAL:
      return {
        ...state,
        showCaloriesBMRModal: false,
      };
    case OPEN_STEPS_MODAL:
      return {
        ...state,
        showStepsModal: true,
      };
    case CLOSE_STEPS_MODAL:
      return {
        ...state,
        showStepsModal: false,
      };
    case OPEN_BMI_MODAL:
      return {
        ...state,
        showBMIModal: true,
      };
    case CLOSE_BMI_MODAL:
      return {
        ...state,
        showBMIModal: false,
      };
    case OPEN_DISTANCE_MODAL:
      return {
        ...state,
        showDistanceModal: true,
      };
    case CLOSE_DISTANCE_MODAL:
      return {
        ...state,
        showDistanceModal: false,
      };
    case OPEN_CALORIEINTAKE_MODAL:
      return {
        ...state,
        showCalorieIntakeModal: true,
      };
    case CLOSE_CALORIEINTAKE_MODAL:
      return {
        ...state,
        showCalorieIntakeModal: false,
      };
    case OPEN_WEIGHT_MODAL:
      return {
        ...state,
        showWeightModal: true,
      };
    case CLOSE_WEIGHT_MODAL:
      return {
        ...state,
        showWeightModal: false,
      };
    case OPEN_BODYFAT_MODAL:
      return {
        ...state,
        showBodyFatModal: true,
      };
    case CLOSE_BODYFAT_MODAL:
      return {
        ...state,
        showBodyFatModal: false,
      };
    case OPEN_ACTIVITY_MODAL:
      return {
        ...state,
        showActivityModal: true,
      };
    case CLOSE_ACTIVITY_MODAL:
      return {
        ...state,
        showActivityModal: false,
      };
    case OPEN_HEARTRATE_MODAL:
      return {
        ...state,
        showHeartRateModal: true,
      };
    case CLOSE_HEARTRATE_MODAL:
      return {
        ...state,
        showHeartRateModal: false,
      };
    case OPEN_SLEEP_MODAL:
      return {
        ...state,
        showSleepModal: true,
      };
    case CLOSE_SLEEP_MODAL:
      return {
        ...state,
        showSleepModal: false,
      };
    default:
      return state;
  }
};
