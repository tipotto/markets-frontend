export const REQUEST_SEARCH = "REQUEST_SEARCH";
export const SUCCEEDED_SEARCH = "SUCCEEDED_SEARCH";
export const FAILED_SEARCH = "FAILED_SEARCH";
export const LOAD_ITEMS = "LOAD_ITEMS";
export const LOAD_ITEM_NUMBER = 15;

export const _spliceArr = (array) => {
  var itemsArr = array;
  var loadedArr = itemsArr.splice(0, LOAD_ITEM_NUMBER);
  return { items: itemsArr, loaded: loadedArr };
};

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
  resData: _spliceArr(resData),
});
export const failedSearch = (message) => ({
  type: FAILED_SEARCH,
  message,
});

export const loadItems = (params) => ({
  type: LOAD_ITEMS,
  moldedData: _spliceArr(params),
});
