import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { connectRouter } from "connected-react-router";
import searchReducer from "./domain/search";
import likeReducer from "./domain/like";
import stateReducer from "./app/state";

const createRootReducer = (history) =>
  combineReducers({
    form: formReducer,
    router: connectRouter(history),
    search: searchReducer,
    like: likeReducer,
    state: stateReducer,
  });

export default createRootReducer;
