import {
  KEYWORD_REQUIRED,
  PLATFORMS_REQUIRED,
} from '../../constants/errorMessages';

const searchValidator = ({ keyword, platforms }) => {
  const errors = {};

  if (!keyword) {
    errors.keyword = KEYWORD_REQUIRED;
  }

  if (platforms && !platforms.length) {
    errors.platforms = PLATFORMS_REQUIRED;
  }

  return errors;
};

export default searchValidator;
