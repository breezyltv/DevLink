const validator = require("validator");
const isEmpty = require("./is_empty");

module.exports = validateProfileInput = data => {
  let errors = {};

  data.handle = !isEmpty(data.handle) ? data.handle : "";
  data.status = !isEmpty(data.status) ? data.status : "";
  data.skills = !isEmpty(data.skills) ? data.skills : "";

  if (!validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = "Handle must be between 2 and 40 letters!";
  }

  // validator only check a string and data.handle is a object,
  // we need check it first from the line code above
  if (validator.isEmpty(data.handle)) {
    errors.handle = "Profile handle is required";
  }
  if (validator.isEmpty(data.status)) {
    errors.status = "Status is required";
  }
  // if (validator.isEmpty(data.skills)) {
  //   errors.skills = "skills field is required";
  // }
  if (!isEmpty(data.github)) {
    if (!validator.isURL(data.github)) {
      errors.github = "The url is invalid";
    }
  }
  if (!isEmpty(data.website)) {
    if (!validator.isURL(data.website)) {
      errors.website = "The url is invalid";
    }
  }
  if (!isEmpty(data.facebook)) {
    if (!validator.isURL(data.facebook)) {
      errors.facebook = "The url is invalid";
    }
  }
  if (!isEmpty(data.twitter)) {
    if (!validator.isURL(data.twitter)) {
      errors.twitter = "The url is invalid";
    }
  }
  if (!isEmpty(data.linkedin)) {
    if (!validator.isURL(data.linkedin)) {
      errors.linkedin = "The url is invalid";
    }
  }
  if (!isEmpty(data.instagram)) {
    if (!validator.isURL(data.instagram)) {
      errors.instagram = "The url is invalid";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
