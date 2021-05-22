import initState from '../initState';
import {
  REQUEST_SEARCH,
  REQUEST_ADDITIONAL_SEARCH,
  SUCCEEDED_SEARCH,
  FAILED_SEARCH,
  CHANGE_ITEM_TYPE,
} from '../../actions';

const stateReducer = (state = initState.state, { type, data }) => {
  switch (type) {
    case REQUEST_SEARCH:
    case REQUEST_ADDITIONAL_SEARCH:
      return { ...state, isLoading: true };

    case SUCCEEDED_SEARCH:
    case FAILED_SEARCH:
      return { ...state, isLoading: false };

    case CHANGE_ITEM_TYPE:
      return { ...state, selectedTab: data };

    default:
      return state;
  }
};

export default stateReducer;
