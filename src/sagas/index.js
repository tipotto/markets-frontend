import { fork, takeEvery } from "redux-saga/effects";
import { REQUEST_FETCH, REQUEST_CREATE, REQUEST_DELETE } from "../actions";
import { fetchData, createData, deleteData } from "./HandleRequest";

function* handleRequest() {
  yield takeEvery(REQUEST_FETCH, fetchData);
  yield takeEvery(REQUEST_CREATE, createData);
  yield takeEvery(REQUEST_DELETE, deleteData);
}

export default function* rootSaga() {
  yield fork(handleRequest);
}
