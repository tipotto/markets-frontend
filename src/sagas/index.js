import { fork, takeEvery } from "redux-saga/effects";
import { REQUEST_SEARCH } from "../actions";
import { searchData } from "./HandleRequest";

function* handleRequest() {
  yield takeEvery(REQUEST_SEARCH, searchData);
}

export default function* rootSaga() {
  yield fork(handleRequest);
}
