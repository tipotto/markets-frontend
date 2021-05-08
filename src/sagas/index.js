import { fork, takeEvery } from "redux-saga/effects";
import { REQUEST_SEARCH } from "../actions";
import searchItems from "./HandleRequest";

function* handleRequest() {
  yield takeEvery(REQUEST_SEARCH, searchItems);
  // yield takeEvery(REQUEST_ADDITIONAL_SEARCH, additionalSearch);
}

export default function* rootSaga() {
  yield fork(handleRequest);
}
