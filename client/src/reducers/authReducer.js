import {
  SET_CURRENT_USER,
  CLEAR_CURRENT_PROFILE
} from "../actions/actionTypes";
import isEmpty from "../utils/isEmpty_valid";
const initialState = {
  isAuthenticated: null,
  admin: false,
  user: {}
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        admin: action.payload.role === "admin" ? true : false,
        user: action.payload
      };
    default:
      return state;
  }
};

export default authReducer;
