import initState from "../initState";
import { SUCCEEDED_SEARCH } from "../../actions";

const searchReducer = (state = initState.search, action) => {
  switch (action.type) {
    case SUCCEEDED_SEARCH:
      return { ...state, items: action.resData };

    default:
      return state;
  }
};

export default searchReducer;
