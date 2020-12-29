import { SET_CURRENT_USER } from "../actions/actionTypes";
import isEmpty from "../utils/isEmpty_valid";
const initialState = {
  isAuthenticated: false,
  user: {}
};

const autReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    default:
      return state;
  }
};

export default autReducer;
