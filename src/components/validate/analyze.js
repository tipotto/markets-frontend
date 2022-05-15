import { KEYWORD_REQUIRED } from '../../constants/errorMessages';

const analyzeValidator = ({ keyword }) => {
  const errors = {};

  if (!keyword) {
    errors.keyword = KEYWORD_REQUIRED;
  }

  return errors;
};

export default analyzeValidator;
