import { put, call } from "redux-saga/effects";
import { startSubmit, stopSubmit } from "redux-form";
import { push } from "connected-react-router";
import {
  succeededFetch,
  failedFetch,
  succeededSearch,
  failedSearch,
  succeededCreateUser,
  failedCreate,
  succeededDelete,
  failedDelete,
} from "../actions";
import { fetchItem, search, createUser, deleteItem } from "../api/Request";

export function* fetchData() {
  try {
    const response = yield call(fetchItem);
    console.log("レスポンス: " + response);
    console.log("データ: " + response.data);
    yield put(succeededFetch(response.data));
  } catch (e) {
    yield put(failedFetch(e.message));
  }
}

export function* searchData(action) {
  const { params } = action.formValue;

  // action.formDataのpropsを使用する場合は、
  // 以下のように、定数としてオブジェクトのプロパティを指定し、分割代入すると良い。
  // 必要であれば、formDataにapiのメソッド名や処理後の遷移先のパス名
  // を追加することで、このメソッドを複数の用途で使いまわせそう。
  const { form } = action.formProp;

  console.log("フォームの送信処理を開始。(HandleRequest.js)");

  // フォームの送信処理を開始する。
  yield put(startSubmit(form));

  const response = yield call(search, params);

  if (response.data) {
    yield put(stopSubmit(form));

    console.log("サーバー側との通信成功。(HandleRequest.js)");
    yield put(succeededSearch(response.data));
    console.log(response.data);

    yield put(push("/"));
  } else {
    console.log("サーバー側との通信エラー。(HandleRequest.js)");
    yield put(failedSearch("エラー"));
    // yield put(stopSubmit("login", error));
  }
}

export function* createData(action) {
  const { params } = action.formValue;

  // action.formDataのpropsを使用する場合は、
  // 以下のように、定数としてオブジェクトのプロパティを指定し、分割代入すると良い。
  // 必要であれば、formDataにapiのメソッド名や処理後の遷移先のパス名
  // を追加することで、このメソッドを複数の用途で使いまわせそう。
  const { form } = action.formProp;

  console.log(form);

  // フォームの送信処理を開始する。
  yield put(startSubmit(form));

  const response = yield call(createUser, params);

  if (response.data) {
    yield put(stopSubmit(form));

    yield put(succeededCreateUser(response.data));
    console.log(response.data);

    yield put(push("/list/"));
  } else {
    yield put(failedCreate("エラー"));
    // yield put(stopSubmit("login", error));
  }
}

export function* deleteData(action) {
  const itemId = action.itemId;
  const response = yield call(deleteItem, itemId);
  if (response) {
    // サーバーサイドでは、削除したuserIDを{id: userId}というオブジェクト形式で返す？
    yield put(succeededDelete(response.data));
  } else {
    yield put(failedDelete("エラー"));
  }
}
