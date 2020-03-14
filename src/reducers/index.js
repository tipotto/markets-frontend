import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { connectRouter } from "connected-react-router";
// import fetchUserData from "./Fetch";
import userReducer from "./domainState/user";
import itemReducer from "./domainState/item";
import stateReducer from "./appState/state";

const createRootReducer = history =>
  combineReducers({
    form: formReducer,
    router: connectRouter(history),
    userReducer,
    itemReducer,
    stateReducer
  });

export default createRootReducer;
