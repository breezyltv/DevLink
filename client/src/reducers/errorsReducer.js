import { GET_ERRORS } from "../actions/actionTypes";

const initialState = {};

const autReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload;
    default:
      return state;
  }
};

export default autReducer;
