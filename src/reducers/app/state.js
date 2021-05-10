import initState from "../initState";
import {
  REQUEST_SEARCH,
  SUCCEEDED_SEARCH,
  FAILED_SEARCH,
  CHANGE_ITEM_TYPE,
} from "../../actions";

const stateReducer = (state = initState.state, { type, data }) => {
  switch (type) {
    case REQUEST_SEARCH:
      return { ...state, isLoading: true };

    case SUCCEEDED_SEARCH:
    case FAILED_SEARCH:
      return { ...state, isLoading: false };

    case CHANGE_ITEM_TYPE:
      return { ...state, selectedTab: data };

    // case FAILED_SEARCH:
    //   return { ...state, isLoading: false };

    // case FAILED_ADDITIONAL_SEARCH:
    // return { ...state, isLoading: false, hasError: true };

    default:
      return state;
  }
};

export default stateReducer;
