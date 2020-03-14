import Validator from "../../constants/Validator";

const addItemValidater = values => {
  const errors = {};
  const { TITLE_REQUIRED, DESCRIPTION_REQUIRED } = Validator;

  if (!values.title) {
    errors.title = TITLE_REQUIRED;
  } else if (!values.description) {
    errors.description = DESCRIPTION_REQUIRED;
  }
  return errors;
};

export default addItemValidater;
