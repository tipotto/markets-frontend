import initState from '../initState';
import {
  REQUEST_SEARCH,
  REQUEST_NEXT_SEARCH,
  REQUEST_ANALYSIS,
  FAILED_SEARCH,
  FAILED_ANALYSIS,
} from '../../actions';

const errorReducer = (state = initState.error, { type, error }) => {
  switch (type) {
    case REQUEST_SEARCH:
    case REQUEST_NEXT_SEARCH:
    case REQUEST_ANALYSIS:
      return {
        ...state,
        hasError: false,
        status: null,
        message: null,
      };

    case FAILED_SEARCH:
    case FAILED_ANALYSIS:
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
