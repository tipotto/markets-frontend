import { put, call } from "redux-saga/effects";
import { startSubmit, stopSubmit } from "redux-form";
import { push } from "connected-react-router";
import { succeededSearch, failedSearch } from "../actions";
import { search } from "../api/Request";

export function* searchData(action) {
  const { params } = action.formValue;

  // action.formDataのpropsを使用する場合は、
  // 以下のように、定数としてオブジェクトのプロパティを指定し、分割代入すると良い。
  // 必要であれば、formDataにapiのメソッド名や処理後の遷移先のパス名
  // を追加することで、このメソッドを複数の用途で使いまわせそう。
  const { form } = action.formProp;

  // フォームの送信処理を開始する。
  yield put(startSubmit(form));

  const res = yield call(search, params);

  if (res.data) {
    yield put(stopSubmit(form));
    yield put(succeededSearch(res.data));
    yield put(push("/"));
  } else {
    yield put(failedSearch("エラー"));
  }
}
