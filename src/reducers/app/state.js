import initState from "../initState";
import { REQUEST_SEARCH, SUCCEEDED_SEARCH, FAILED_SEARCH } from "../../actions";

const stateReducer = (state = initState.state, action) => {
  switch (action.type) {
    case REQUEST_SEARCH:
      return { ...state, isLoading: true };

    case SUCCEEDED_SEARCH:
      return { ...state, isLoading: false };

    case FAILED_SEARCH:
      return { ...state, isLoading: false, hasError: true };

    default:
      return state;
  }
};

export default stateReducer;
