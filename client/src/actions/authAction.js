import axios from "axios";
import { GET_ERRORS, SET_CURRENT_USER } from "./actionTypes";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

//register an account
export const registerUser = (registerData, history) => async dispatch => {
  await axios
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
    });
};

//login
export const login = userData => async dispatch => {
  await axios
    .post("/api/users/login", userData)
    .then(res => {
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      setAuthToken(token);
      //decode token to get user data
      const user = jwt_decode(token);
      //set current user
      dispatch(setCurrentUser(user));
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

//set logged in user
export const setCurrentUser = user => {
  return {
    type: SET_CURRENT_USER,
    payload: user
  };
};
