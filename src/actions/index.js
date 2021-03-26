/* eslint-disable no-param-reassign */
export const REQUEST_SEARCH = "REQUEST_SEARCH";
export const SUCCEEDED_SEARCH = "SUCCEEDED_SEARCH";
export const FAILED_SEARCH = "FAILED_SEARCH";
export const LOAD_ITEMS = "LOAD_ITEMS";
export const LOAD_ITEM_NUMBER = 15;

const _spliceArray = (array) => {
  const itemsArr = array;
  const loadedArr = itemsArr.splice(0, LOAD_ITEM_NUMBER);
  return { items: itemsArr, loaded: loadedArr };
};

const _checkPrices = (form) => {
  if (!form.minPrice) form.minPrice = "0";
  if (!form.maxPrice) form.maxPrice = "0";
  return form;
};

export const requestSearch = (values, props) => ({
  type: REQUEST_SEARCH,
  formValue: _checkPrices(values),
  formProp: props,
  // フォーム周りの必要な情報を定数で定義し、sagasのcreateDataメソッドで
  // formDataのpropsを使うようにする。それによって、フォーム名や非同期処理のメソッド名、
  // 遷移先のパスを参照でき、createDataメソッドの汎用性が高まりそう。
});

export const succeededSearch = (resData) => ({
  type: SUCCEEDED_SEARCH,
  resData: _spliceArray(resData),
});

export const failedSearch = () => ({
  type: FAILED_SEARCH,
});

export const loadItems = (params) => ({
  type: LOAD_ITEMS,
  moldedData: _spliceArray(params),
});
