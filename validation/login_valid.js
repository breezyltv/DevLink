const validator = require("validator");
const isEmpty = require("./is_empty");

module.exports = validateLoginInput = data => {
  let errors = {};

  data.password = !isEmpty(data.password) ? data.password : "";
  data.email = !isEmpty(data.email) ? data.email : "";

  if (!validator.isLength(data.password, { min: 5, max: 30 })) {
    errors.password = "Password must be between 5 and 30 letters!";
  }
  if (!validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }
  if (validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};