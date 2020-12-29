export const domains = [
  "aol.com",
  "att.net",
  "comcast.net",
  "facebook.com",
  "gmail.com",
  "hotmail.com",
  "msn.com",
  "live.com",
  "outlook.com",
  "icloud.com"
];

//handle validation from backend
export const validateStatus = (errors, errorStatus) => {
  let status = {};
  if (errors) {
    status = {
      validateStatus: errors && errorStatus ? "error" : "",
      help: errorStatus ? errors : ""
    };
  }
  return status;
};
