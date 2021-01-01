import { GET_ERRORS, CLEAR_ERRORS } from "../actions/actionTypes";

const initialState = {};

const autReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_ERRORS:
      return state;
    case GET_ERRORS:
      return action.payload;
    default:
      return state;
  }
};

export default autReducer;
