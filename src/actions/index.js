export const REQUEST_SEARCH = 'REQUEST_SEARCH';
export const REQUEST_ADDITIONAL_SEARCH = 'REQUEST_ADDITIONAL_SEARCH';
export const SUCCEEDED_SEARCH = 'SUCCEEDED_SEARCH';
export const FAILED_SEARCH = 'FAILED_SEARCH';
export const LOAD_ITEMS = 'LOAD_ITEMS';
export const ADD_FAVORITE_ITEM = 'ADD_FAVORITE_ITEM';
export const DELETE_FAVORITE_ITEM = 'DELETE_FAVORITE_ITEM';
export const CHANGE_ITEM_TYPE = 'CHANGE_ITEM_TYPE';
export const RESET_LOADED_ITEMS = 'RESET_LOADED_ITEMS';

export const requestSearch = () => ({
  type: REQUEST_SEARCH,
});

export const requestAdditionalSearch = () => ({
  type: REQUEST_ADDITIONAL_SEARCH,
});

export const succeededSearch = (items) => ({
  type: SUCCEEDED_SEARCH,
  data: items,
});

export const failedSearch = (error) => ({
  type: FAILED_SEARCH,
  error,
});

// export const loadItems = (items) => ({
//   type: LOAD_ITEMS,
//   data: items,
// });

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

// export const resetLoadedItems = (items) => ({
//   type: RESET_LOADED_ITEMS,
//   data: items,
// });
