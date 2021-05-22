import initState from '../initState';
import {
  REQUEST_SEARCH,
  REQUEST_ADDITIONAL_SEARCH,
  FAILED_SEARCH,
} from '../../actions';

const errorReducer = (state = initState.error, { type, error }) => {
  switch (type) {
    case REQUEST_SEARCH:
    case REQUEST_ADDITIONAL_SEARCH:
      return {
        ...state,
        hasError: false,
        status: null,
        message: null,
      };

    case FAILED_SEARCH:
      return {
        ...state,
        hasError: true,
        status: error.status,
        message: error.message,
      };

    default:
      return state;
  }
};

export default errorReducer;
