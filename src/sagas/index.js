import { fork, takeEvery } from "redux-saga/effects";
import {
  REQUEST_FETCH,
  REQUEST_SEARCH,
  REQUEST_CREATE,
  REQUEST_DELETE,
} from "../actions";
import { fetchData, searchData, createData, deleteData } from "./HandleRequest";

function* handleRequest() {
  console.log("非同期処理のメソッドを呼び出し。(saga/index.js)");
  yield takeEvery(REQUEST_FETCH, fetchData);
  yield takeEvery(REQUEST_SEARCH, searchData);
  yield takeEvery(REQUEST_CREATE, createData);
  yield takeEvery(REQUEST_DELETE, deleteData);
}

export default function* rootSaga() {
  yield fork(handleRequest);
}
