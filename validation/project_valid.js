const validator = require("validator");
const isEmpty = require("./is_empty");

module.exports = validateProjectInput = data => {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : "";

  data.from = !isEmpty(data.from.toString()) ? data.from : "";

  if (validator.isEmpty(data.title)) {
    errors.title = "title is required";
  }

  if (validator.isEmpty(data.from.toString())) {
    errors.from = "From date is required";
  }

  if (!isEmpty(data.demo_link)) {
    if (!validator.isURL(data.demo_link)) {
      errors.demo_link = "The url is invalid";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
