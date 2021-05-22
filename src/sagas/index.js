import { fork, takeEvery } from 'redux-saga/effects';
import { REQUEST_SEARCH, REQUEST_ADDITIONAL_SEARCH } from '../actions';
import { search, additionalSearch } from './task';

// 以下の2つの関数はそれぞれ、redux-sagaのタスク
function* handleSearch() {
  yield takeEvery(REQUEST_SEARCH, search);
}

function* handleAdditionalSearch() {
  yield takeEvery(REQUEST_ADDITIONAL_SEARCH, additionalSearch);
}

// ReduxのStoreが作成されたあと、redux-sagaのMiddlewareが
// 起動するときに１回だけ呼び出される
// fork 作用を使い、redux-sagaに別タスクの起動を依頼する
// タスク内では実際の処理は行わないため、fork 関数を呼び出し時に
// 生成されるのはただのオブジェクト
export default function* rootSaga() {
  yield fork(handleSearch);
  yield fork(handleAdditionalSearch);
}
