import ErrorMessage from "../../constants/ErrorMessage";

const searchValidater = (values) => {
  const errors = {};
  const { KEYWORD_REQUIRED, PLATFORMS_REQUIRED } = ErrorMessage;
  const { keyword, platforms } = values;

  if (!keyword) {
    errors.keyword = KEYWORD_REQUIRED;
  }

  if (platforms && !platforms.length) {
    errors.platforms = PLATFORMS_REQUIRED;
  }

  return errors;
};

export default searchValidater;
