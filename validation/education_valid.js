const validator = require("validator");
const isEmpty = require("./is_empty");

module.exports = validateEduInput = data => {
  let errors = {};

  data.school = !isEmpty(data.school) ? data.school : "";
  data.degree = !isEmpty(data.degree) ? data.degree : "";
  data.major = !isEmpty(data.major) ? data.major : "";
  data.from = !isEmpty(data.from) ? data.from : "";

  if (validator.isEmpty(data.school)) {
    errors.school = "School name is required";
  }
  if (validator.isEmpty(data.degree)) {
    errors.degree = "Degree is required";
  }
  if (validator.isEmpty(data.major)) {
    errors.major = "Degree is required";
  }
  if (validator.isEmpty(data.from)) {
    errors.from = "From date is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
