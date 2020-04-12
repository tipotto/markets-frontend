import Validator from "../../constants/Validator";

const searchValidater = (values) => {
  const errors = {};
  const {
    KEYWORD_REQUIRED,
    PLATFORM_REQUIRED,
    RESULT_NUM_REQUIRED,
    SORT_INDEX_REQUIRED,
    SORT_ORDER_REQUIRED,
  } = Validator;

  if (!values.keyword) {
    errors.keyword = KEYWORD_REQUIRED;
  }
  if (!values.platform) {
    errors.platform = PLATFORM_REQUIRED;
  }
  if (!values.resultNum) {
    errors.resultNum = RESULT_NUM_REQUIRED;
  }
  if (!values.sortIndex) {
    errors.sortIndex = SORT_INDEX_REQUIRED;
  }
  if (!values.sortOrder) {
    errors.sortOrder = SORT_ORDER_REQUIRED;
  }
  return errors;
};

export default searchValidater;
