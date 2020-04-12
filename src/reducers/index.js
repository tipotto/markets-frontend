import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { connectRouter } from "connected-react-router";
// import fetchUserData from "./Fetch";
import userReducer from "./domainState/user";
import itemReducer from "./domainState/item";
import searchReducer from "./domainState/search";
import stateReducer from "./appState/state";

const createRootReducer = (history) =>
  combineReducers({
    form: formReducer,
    router: connectRouter(history),
    userReducer,
    itemReducer,
    searchReducer,
    stateReducer,
  });

export default createRootReducer;
