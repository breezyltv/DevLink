import axios from "axios";
import { GET_ERRORS, SET_CURRENT_USER } from "./actionTypes";
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
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });

      setTimeout(() => {
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
      //localStorage.setItem("jwtToken", token);
      //setAuthToken(token);
      //decode token to get user data
      const user = jwt_decode(token);
      //set current user
      dispatch(setCurrentUser(user));
      dispatch(setLoading(false));
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
      setTimeout(() => {
        dispatch(setLoading(false));
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
      //set current user data
      dispatch(setCurrentUser(res.data));
      //check if token expired
      const currentTime = Date.now() / 1000;
      if (res.data.exp < currentTime) {
        //logout user
        dispatch(logout());
        //redirect to login
        history.push("/login");
      }
    } else {
      history.push("/login");
    }
  });
};

export const logout = () => dispatch => {
  //call API to remove token in cookie
  axios.get("api/users/logout").then(res => {
    console.log(res.data);
    // set current user to empty data
    dispatch(setCurrentUser({}));
  });
};
