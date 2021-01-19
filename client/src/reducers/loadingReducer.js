import { REQUEST_LOADING, REQUEST_LOADING_AUTH } from "../actions/actionTypes";

const initialState = {
  loadingStatus: false,
  loadingAuth: true
};

const loadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_LOADING:
      return {
        ...state,
        loadingStatus: action.payload
      };
    case REQUEST_LOADING_AUTH:
      return {
        ...state,
        loadingAuth: action.payload
      };
    default:
      return state;
  }
};

export default loadingReducer;
