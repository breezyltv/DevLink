import { REQUEST_LOADING } from "./actionTypes";
//set LOADING
export const setLoading = loadingStatus => {
  const status = {
    loadingStatus: loadingStatus
  };
  return {
    type: REQUEST_LOADING,
    payload: status
  };
};
