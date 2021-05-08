import { put, call } from "redux-saga/effects";
import { startSubmit, stopSubmit } from "redux-form";
import { push } from "connected-react-router";
import { succeededSearch, failedSearch } from "../actions";
import { spliceArray } from "../actions/function";
import search from "../api/Request";

function* searchItems({ formProps, formValues }) {
  // action.formDataのpropsを使用する場合は、
  // 以下のように、定数としてオブジェクトのプロパティを指定し、分割代入すると良い。
  // 必要であれば、formDataにapiのメソッド名や処理後の遷移先のパス名
  // を追加することで、このメソッドを複数の用途で使いまわせそう。

  // フォームの送信処理を開始する。
  yield put(startSubmit(formProps));

  try {
    const items = yield call(search, formValues);
    console.log("response", items);
    yield put(stopSubmit(formProps));
    // yield put(succeededSearch(spliceArray(items)));
    yield put(succeededSearch(items));
    yield put(push("/"));
  } catch (e) {
    console.log("Error occurred:", e);
    yield put(failedSearch());
  }
}

// export function* additionalSearch({ formProps, formValues }) {
//   // action.formDataのpropsを使用する場合は、
//   // 以下のように、定数としてオブジェクトのプロパティを指定し、分割代入すると良い。
//   // 必要であれば、formDataにapiのメソッド名や処理後の遷移先のパス名
//   // を追加することで、このメソッドを複数の用途で使いまわせそう。

//   // フォームの送信処理を開始する。
//   yield put(startSubmit(formProps));

//   try {
//     const items = yield call(search, formValues);
//     console.log("response", items);
//     yield put(stopSubmit(formProps));
//     yield put(succeededAdditionalSearch(spliceArray(items)));
//     yield put(push("/"));
//   } catch (e) {
//     console.log("Error occurred:", e);
//     yield put(failedAdditionalSearch());
//   }
// }

export default searchItems;
