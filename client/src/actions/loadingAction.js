import { REQUEST_LOADING, REQUEST_LOADING_AUTH } from "./actionTypes";
//set LOADING
export const setLoading = loadingStatus => {
  return {
    type: REQUEST_LOADING,
    payload: loadingStatus
  };
};

export const setLoadingAuth = loadingStatus => {
  return {
    type: REQUEST_LOADING_AUTH,
    payload: loadingStatus
  };
};
