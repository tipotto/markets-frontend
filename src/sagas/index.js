import { fork, takeEvery } from 'redux-saga/effects';
import {
  REQUEST_SEARCH,
  REQUEST_NEXT_SEARCH,
  REQUEST_ANALYSIS,
} from '../actions';
import { search, nextSearch, analyze } from './task';

// 以下の2つの関数はそれぞれ、redux-sagaのタスク
function* handleSearch() {
  yield takeEvery(REQUEST_SEARCH, search);
}

function* handleNextSearch() {
  yield takeEvery(REQUEST_NEXT_SEARCH, nextSearch);
}

function* handleAnalysis() {
  yield takeEvery(REQUEST_ANALYSIS, analyze);
}

// ReduxのStoreが作成されたあと、redux-sagaのMiddlewareが
// 起動するときに１回だけ呼び出される
// fork 作用を使い、redux-sagaに別タスクの起動を依頼する
// タスク内では実際の処理は行わないため、fork 関数を呼び出し時に
// 生成されるのはただのオブジェクト
export default function* rootSaga() {
  yield fork(handleSearch);
  yield fork(handleNextSearch);
  yield fork(handleAnalysis);
}
