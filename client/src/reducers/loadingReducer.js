import { REQUEST_LOADING } from "../actions/actionTypes";

const initialState = {};

const loadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_LOADING:
      return action.payload;
    default:
      return state;
  }
};

export default loadingReducer;
