const validator = require("validator");
const isEmpty = require("./is_empty");

module.exports = validateRegisterInput = data => {
  let errors = {};

  data.first_name = !isEmpty(data.first_name) ? data.first_name : "";
  data.last_name = !isEmpty(data.last_name) ? data.last_name : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.confirm_password = !isEmpty(data.confirm_password)
    ? data.confirm_password
    : "";
  data.email = !isEmpty(data.email) ? data.email : "";

  if (!validator.isLength(data.first_name, { min: 2, max: 30 })) {
    errors.first_name = "First name must be between 2 and 30 letters!";
  }

  if (!validator.isLength(data.last_name, { min: 2, max: 30 })) {
    errors.last_name = "last name must be between 2 and 30 letters!";
  }
  if (!validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be between 6 and 30 letters!";
  }
  if (!validator.equals(data.password, data.confirm_password)) {
    errors.confirm_password = "Password is not matched!";
  }
  if (!validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }
  // validator only check a string and data.first_name is a object,
  // we need check it first from the line code above
  if (validator.isEmpty(data.first_name)) {
    errors.first_name = "First name is required";
  }
  if (validator.isEmpty(data.last_name)) {
    errors.last_name = "Last name is required";
  }
  if (validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  }
  if (validator.isEmpty(data.confirm_password)) {
    errors.confirm_password = "Confirm password is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
