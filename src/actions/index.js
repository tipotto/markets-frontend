export const REQUEST_SEARCH = "REQUEST_SEARCH";
export const SUCCEEDED_SEARCH = "SUCCEEDED_SEARCH";
export const FAILED_SEARCH = "FAILED_SEARCH";

// export const ActionType = {
//   REQUEST_SEARCH: "REQUEST_SEARCH",
//   SUCCEEDED_SEARCH: "SUCCEEDED_SEARCH",
//   FAILED_SEARCH: "FAILED_SEARCH",
// };

export const requestSearch = (params, props) => ({
  type: REQUEST_SEARCH,
  formValue: { params },
  formProp: props,
  // フォーム周りの必要な情報を定数で定義し、sagasのcreateDataメソッドで
  // formDataのpropsを使うようにする。それによって、フォーム名や非同期処理のメソッド名、
  // 遷移先のパスを参照でき、createDataメソッドの汎用性が高まりそう。
});
export const succeededSearch = (resData) => ({
  type: SUCCEEDED_SEARCH,
  resData,
});
export const failedSearch = (message) => ({ type: FAILED_SEARCH, message });
