import axios from "axios";
import {
  GET_ERRORS,
  GET_PROFILE,
  GET_PROJECT,
  GET_PROFILES,
  PROFILE_LOADING,
  PROFILE_NOT_FOUND,
  CLEAR_CURRENT_PROFILE,
  CLEAR_ERRORS,
  GET_ADMIN_PROFILE
} from "./actionTypes";

import { setLoading } from "./loadingAction";

export const getCurrentProfile = () => async dispatch => {
  dispatch(setProfileLoading());
  try {
    const res = await axios.get("/api/profile");
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: GET_PROFILE,
      payload: {}
    });
  }
};

export const getAdminProfile = () => async dispatch => {
  dispatch(setProfileLoading());
  try {
    const res = await axios.get("/api/profile/aboutMe");
    dispatch({
      type: GET_ADMIN_PROFILE,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: GET_ADMIN_PROFILE,
      payload: {}
    });
  }
};

// post to add a profile
export const addProfile = (profileData, history) => async dispatch => {
  try {
    dispatch(setLoading(true));
    const res = await axios.post("/api/profile", profileData);
    if (res) {
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
      history.push("/dashboard");
    }
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setLoading(false));
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};

export const addProject = (projectData, history) => async dispatch => {
  try {
    dispatch(setLoading(true));
    const res = await axios.post("/api/profile/project", projectData);
    if (res) {
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
      history.push("/dashboard");
    }
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setLoading(false));
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};

export const addEdu = (eduData, history) => async dispatch => {
  try {
    dispatch(setLoading(true));
    const res = await axios.post("/api/profile/education", eduData);
    if (res) {
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
      history.push("/dashboard");
    }
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setLoading(false));
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};

export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

export const clearCurrentProfile = () => {
  //remove current profile
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};

export const clearErrors = () => dispatch => {
  //call API to remove token in cookie
  dispatch({
    type: CLEAR_ERRORS
  });
};
