import initState from '../initState';
import {
  REQUEST_SEARCH,
  REQUEST_ADDITIONAL_SEARCH,
  REQUEST_ANALYSIS,
  SUCCEEDED_SEARCH,
  SUCCEEDED_ANALYSIS,
  FAILED_SEARCH,
  FAILED_ANALYSIS,
  CHANGE_ITEM_TYPE,
} from '../../actions';

const stateReducer = (state = initState.state, { type, data }) => {
  switch (type) {
    case REQUEST_SEARCH:
    case REQUEST_ADDITIONAL_SEARCH:
      return { ...state, isLoading: true, selectedTab: 'all' };

    case REQUEST_ANALYSIS:
      return { ...state, isLoading: true, selectedTab: data };

    case SUCCEEDED_SEARCH:
    case SUCCEEDED_ANALYSIS:
    case FAILED_SEARCH:
    case FAILED_ANALYSIS:
      return { ...state, isLoading: false };

    case CHANGE_ITEM_TYPE:
      return { ...state, selectedTab: data };

    default:
      return state;
  }
};

export default stateReducer;
