import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { connectRouter } from "connected-react-router";
import userReducer from "./domain/user";
import itemReducer from "./domain/item";
import searchReducer from "./domain/search";
import stateReducer from "./app/state";

const createRootReducer = (history) =>
  combineReducers({
    form: formReducer,
    router: connectRouter(history),
    user: userReducer,
    item: itemReducer,
    search: searchReducer,
    state: stateReducer,
  });

export default createRootReducer;
