import axios from "axios";
import {
  GET_ERRORS,
  SET_CURRENT_USER,
  CLEAR_ERRORS,
  REQUEST_LOADING_AUTH
} from "./actionTypes";
import { setLoading, setLoadingAuth } from "./loadingAction";
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
      console.log("login err", err);

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

export const auth = () => dispatch => {
  //dispatch(setLoadingAuth(true));
  axios
    .get("/api/users/currentUser")
    .then(res => {
      console.log("current user", res.data);
      if (!res.data.isLoggedOut || res.data.isLoggedOut === undefined) {
        //set current user data
        dispatch(setLoadingAuth(false));
        dispatch(setCurrentUser(res.data));
      } else {
        dispatch(setLoadingAuth(false));
        window.location.href = "/login";
      }
    })
    .catch(err => {
      //console.log("check auth err", err);
      dispatch(setLoadingAuth(false));
      dispatch(setCurrentUser({}));
    });
};

// export const setLoadingAuth = () => {
//   return {
//     type: REQUEST_LOADING_AUTH
//   };
// };

export const logout = history => dispatch => {
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
