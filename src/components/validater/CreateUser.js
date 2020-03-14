import Validator from "../../constants/Validator";

const createUserValidater = values => {
  const errors = {};
  const {
    USERNAME_REQUIRED,
    EMAIL_REQUIRED,
    PASSWORD_REQUIRED,
    PASSWORD_MIN_LENGTH
  } = Validator;

  if (!values.username) {
    errors.username = USERNAME_REQUIRED;
  } else if (!values.email) {
    errors.email = EMAIL_REQUIRED;
  } else if (!values.password) {
    errors.password = PASSWORD_REQUIRED;
  } else if (values.password.length < 5) {
    errors.password = PASSWORD_MIN_LENGTH;
  }
  return errors;
};

export default createUserValidater;
