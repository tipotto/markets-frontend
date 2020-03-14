import Validator from "../../constants/Validator";

const loginValidater = values => {
  const errors = {};
  const { EMAIL_REQUIRED, PASSWORD_REQUIRED, PASSWORD_MIN_LENGTH } = Validator;

  if (!values.email) {
    errors.email = EMAIL_REQUIRED;
  } else if (!values.password) {
    errors.password = PASSWORD_REQUIRED;
  } else if (values.password.length < 5) {
    errors.password = PASSWORD_MIN_LENGTH;
  }
  return errors;
};

export default loginValidater;
