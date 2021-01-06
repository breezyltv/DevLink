import axios from "axios";
import {
  GET_ERRORS,
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_NOT_FOUND,
  CLEAR_CURRENT_PROFILE
} from "./actionTypes";
import { dispatch } from "rxjs/internal/observable/pairs";

import { setLoading } from "./loadingAction";

export const getCurrentProfile = () => async dispatch => {
  try {
    dispatch(setLoading(true));
    const res = await axios.get("/api/profile");
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setLoading(false));
    dispatch({
      type: GET_PROFILE,
      payload: {}
    });
  }
};

// post to add a profile
export const addProfile = (profileData, history) => async dispatch => {
  try {
    dispatch(setLoading(true));
    const res = await axios.post("/api/profile", profileData);
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
    dispatch(setLoading(false));
  } catch (error) {}
  dispatch(setLoading(false));
  dispatch({
    type: GET_PROFILE,
    payload: {}
  });
};

export const clearCurrentProfile = () => {
  //remove current profile
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};
