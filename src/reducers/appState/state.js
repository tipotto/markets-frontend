import initState from "../initState";
import {
  REQUEST_FETCH,
  SUCCEEDED_FETCH,
  FAILED_FETCH,
  REQUEST_SEARCH,
  SUCCEEDED_SEARCH,
  FAILED_SEARCH,
  REQUEST_CREATE,
  SUCCEEDED_CREATE_USER,
  SUCCEEDED_CREATE_ITEM,
  FAILED_CREATE,
  REQUEST_DELETE,
  SUCCEEDED_DELETE,
  FAILED_DELETE,
} from "../../actions";

const stateReducer = (state = initState.state, action) => {
  switch (action.type) {
    /**
     * リクエスト処理
     */
    // case REQUEST_CREATE:
    //   return { ...state, isLoading: true };

    case REQUEST_SEARCH:
      return { ...state, isLoading: true };

    // case REQUEST_DELETE:
    //   return { ...state, isLoading: true };

    // case REQUEST_FETCH:
    //   return { ...state, isLoading: true };

    /**
     * 成功時の処理
     */
    // // case SUCCEEDED_CREATE_USER:
    // //   return { ...state, isSigned: true, isLoading: false };

    // case SUCCEEDED_CREATE_ITEM:
    //   return { ...state, isLoading: false };

    case SUCCEEDED_SEARCH:
      return { ...state, isLoading: false };

    // case SUCCEEDED_DELETE:
    //   return { ...state, isLoading: false };

    // case SUCCEEDED_FETCH:
    //   return { ...state, isLoading: false };

    /**
     * 失敗時の処理
     */
    // case FAILED_CREATE:
    //   return { ...state, isLoading: false, hasError: true };

    case FAILED_SEARCH:
      return { ...state, isLoading: false, hasError: true };

    // case FAILED_DELETE:
    //   return { ...state, isLoading: false, hasError: true };

    // case FAILED_FETCH:
    //   return { ...state, isLoading: false, hasError: true };

    default:
      return state;
  }
};

export default stateReducer;
