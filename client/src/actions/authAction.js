import axios from "axios";
import { GET_ERRORS } from "./actionTypes";
export const registerUser = credentials => dispatch => {
  axios
    .post("/api/users/register", credentials)
    .then(res => console.log(res.data))
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
