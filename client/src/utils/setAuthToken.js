import axios from "axios";

const setAuthToken = token => {
  if (token) {
    //set token to header for any request
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    //delete token in header
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;
