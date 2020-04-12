/**
 * Action Key
 */

// Fetch
export const REQUEST_FETCH = "REQUEST_FETCH";
export const SUCCEEDED_FETCH = "SUCCEEDED_FETCH";
export const FAILED_FETCH = "FAILED_FETCH";

// Search
export const REQUEST_SEARCH = "REQUEST_SEARCH";
export const SUCCEEDED_SEARCH = "SUCCEEDED_SEARCH";
export const FAILED_SEARCH = "FAILED_SEARCH";

// Create
export const REQUEST_CREATE = "REQUEST_CREATE";
export const SUCCEEDED_CREATE_USER = "SUCCEEDED_CREATE_USER";
export const SUCCEEDED_CREATE_ITEM = "SUCCEEDED_CREATE_ITEM";
export const FAILED_CREATE = "FAILED_CREATE";

// Delete
export const REQUEST_DELETE = "REQUEST_DELETE";
export const SUCCEEDED_DELETE = "SUCCEEDED_DELETE";
export const FAILED_DELETE = "FAILED_DELETE";

export const ActionType = {
  REQUEST_FETCH: "REQUEST_FETCH",
  SUCCEEDED_FETCH: "SUCCEEDED_FETCH",
  FAILED_FETCH: "FAILED_FETCH",
  REQUEST_CREATE: "REQUEST_CREATE",
  SUCCEEDED_CREATE: "SUCCEEDED_CREATE",
  FAILED_CREATE: "FAILED_CREATE",
  REQUEST_DELETE: "REQUEST_DELETE",
  SUCCEEDED_DELETE: "SUCCEEDED_DELETE",
  FAILED_DELETE: "FAILED_DELETE",
};

/**
 * Action Creator
 */

// Fetch
export const requestFetch = () => ({ type: REQUEST_FETCH });
export const succeededFetch = (payload) => ({
  type: SUCCEEDED_FETCH,
  items: payload,
});
export const failedFetch = (message) => ({ type: FAILED_FETCH, message });

// Search
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

// Create
export const requestCreate = (params, props) => ({
  type: REQUEST_CREATE,
  formValue: { params },
  formProp: props,
  // フォーム周りの必要な情報を定数で定義し、sagasのcreateDataメソッドで
  // formDataのpropsを使うようにする。それによって、フォーム名や非同期処理のメソッド名、
  // 遷移先のパスを参照でき、createDataメソッドの汎用性が高まりそう。
});
export const succeededCreateUser = (resData) => ({
  type: SUCCEEDED_CREATE_USER,
  resData,
});
export const succeededCreateItem = (resData) => ({
  type: SUCCEEDED_CREATE_ITEM,
  resData,
});
export const failedCreate = (message) => ({ type: FAILED_CREATE, message });

// // Delete
export const requestDelete = (itemId) => ({ type: REQUEST_DELETE, itemId });
export const succeededDelete = (payload) => ({
  type: SUCCEEDED_DELETE,
  payload,
});
export const failedDelete = (message) => ({ type: FAILED_DELETE, message });
