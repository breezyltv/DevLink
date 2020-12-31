export const domains = [
  "gmail.com",
  "aol.com",
  "att.net",
  "comcast.net",
  "facebook.com",
  "hotmail.com",
  "live.com",
  "outlook.com",
  "icloud.com"
];

export const upperFirstChar = text => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

//handle validation from backend
export const validateStatus = (errors, errorStatus) => {
  let status = {};
  if (errors && errorStatus) {
    status = {
      validateStatus: "error",
      help: errors
    };
  }

  return status;
};
