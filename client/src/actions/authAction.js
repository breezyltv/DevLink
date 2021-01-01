import axios from "axios";
import { GET_ERRORS, SET_CURRENT_USER, CLEAR_ERRORS } from "./actionTypes";
import { setLoading } from "./loadingAction";
import jwt_decode from "jwt-decode";

//register an account
export const registerUser = (registerData, history) => dispatch => {
  dispatch(setLoading(true));
  axios
    .post("/api/users/register", registerData)
    .then(res => {
      console.log(res.data);
      history.push("/login");
    })
    .catch(err => {
      setTimeout(() => {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        });
        dispatch(setLoading(false));
      }, 300);
    });
};

//login
export const login = userData => dispatch => {
  dispatch(setLoading(true));
  axios
    .post("/api/users/login", userData)
    .then(res => {
      const { token } = res.data;
      //decode token to get user data
      const user = jwt_decode(token);
      //set current user
      dispatch(setCurrentUser(user));
      dispatch(setLoading(false));
    })
    .catch(err => {
      setTimeout(() => {
        //set loading
        dispatch(setLoading(false));
        //send data to reducer
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        });
      }, 300);
    });
};

//set logged in user
export const setCurrentUser = user => {
  return {
    type: SET_CURRENT_USER,
    payload: user
  };
};

export const auth = history => dispatch => {
  axios.get("/api/users/currentUser").then(res => {
    //console.log("current user", res.data);
    if (res.data) {
      //console.log("call auth", res.data);

      //set current user data
      dispatch(setCurrentUser(res.data));
      //check if token expired
      // const currentTime = Date.now() / 1000;
      // if (res.data.exp < currentTime) {
      //   //logout user
      //   logout();
      //   //redirect to login
      //   history.push("/login");
      // }
    } else {
      history.push("/login");
    }
  });
};

export const logout = () => dispatch => {
  //call API to remove token in cookie
  axios.get("api/users/logout").then(res => {
    console.log(res.data);
    dispatch(setLoading(false));
    // set current user to empty data
    dispatch(setCurrentUser({}));
  });
};

export const clearErrors = () => dispatch => {
  //call API to remove token in cookie
  dispatch({
    type: CLEAR_ERRORS
  });
};
