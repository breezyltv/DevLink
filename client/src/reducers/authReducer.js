import { SET_CURRENT_USER, CLEAR_CURRENT_USER } from "../actions/actionTypes";
import isEmpty from "../utils/isEmpty_valid";
const initialState = {
  isAuthenticated: false,
  admin: false,
  isLogout: null,
  user: {}
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        admin: action.payload.role === "admin" ? true : false,
        isLogout: isEmpty(action.payload) ? null : true,
        user: action.payload
      };
    default:
      return state;
  }
};

export default authReducer;
