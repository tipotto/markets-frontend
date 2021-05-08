export const REQUEST_SEARCH = "REQUEST_SEARCH";
export const REQUEST_ADDITIONAL_SEARCH = "REQUEST_ADDITIONAL_SEARCH";
export const SUCCEEDED_SEARCH = "SUCCEEDED_SEARCH";
export const FAILED_SEARCH = "FAILED_SEARCH";
// export const SUCCEEDED_ADDITIONAL_SEARCH = "SUCCEEDED_ADDITIONAL_SEARCH";
// export const FAILED_ADDITIONAL_SEARCH = "FAILED_ADDITIONAL_SEARCH";
export const LOAD_ITEMS = "LOAD_ITEMS";
export const ADD_FAVORITE_ITEM = "ADD_FAVORITE_ITEM";
export const DELETE_FAVORITE_ITEM = "DELETE_FAVORITE_ITEM";
export const CHANGE_ITEM_TYPE = "CHANGE_ITEM_TYPE";
export const RESET_LOADED_ITEMS = "RESET_LOADED_ITEMS";
// export const SAVE_MERCARI_ITEMS = "SAVE_MERCARI_ITEMS";
// export const SAVE_RAKUMA_ITEMS = "SAVE_RAKUMA_ITEMS";
// export const SAVE_PAYPAY_ITEMS = "SAVE_PAYPAY_ITEMS";

export const requestSearch = (formProps, formValues) => ({
  type: REQUEST_SEARCH,
  formProps,
  formValues,
  // フォーム周りの必要な情報を定数で定義し、sagasのcreateDataメソッドで
  // formDataのpropsを使うようにする。それによって、フォーム名や非同期処理のメソッド名、
  // 遷移先のパスを参照でき、createDataメソッドの汎用性が高まりそう。
});

// export const requestAdditionalSearch = (formProps, formValues) => ({
//   type: REQUEST_ADDITIONAL_SEARCH,
//   formProps,
//   formValues,
// });

export const succeededSearch = (items) => ({
  type: SUCCEEDED_SEARCH,
  data: items,
});

export const failedSearch = () => ({
  type: FAILED_SEARCH,
});

// export const succeededAdditionalSearch = (items) => ({
//   type: SUCCEEDED_ADDITIONAL_SEARCH,
//   data: items,
// });

// export const failedAdditionalSearch = () => ({
//   type: FAILED_ADDITIONAL_SEARCH,
// });

export const loadItems = (items) => ({
  type: LOAD_ITEMS,
  data: items,
});

export const addFavoriteItem = (item) => ({
  type: ADD_FAVORITE_ITEM,
  data: item,
});

export const deleteFavoriteItem = (item) => ({
  type: DELETE_FAVORITE_ITEM,
  data: item,
});

export const changeItemType = (itemType) => ({
  type: CHANGE_ITEM_TYPE,
  data: itemType,
});

export const resetLoadedItems = (items) => ({
  type: RESET_LOADED_ITEMS,
  data: items,
});

// export const saveMercariItems = (params) => ({
//   type: SAVE_MERCARI_ITEMS,
//   data: params,
// });

// export const saveRakumaItems = (params) => ({
//   type: SAVE_RAKUMA_ITEMS,
//   data: params,
// });

// export const savePaypayItems = (params) => ({
//   type: SAVE_PAYPAY_ITEMS,
//   data: params,
// });
