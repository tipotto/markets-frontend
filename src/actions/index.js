export const REQUEST_SEARCH = 'REQUEST_SEARCH';
export const REQUEST_NEXT_SEARCH = 'REQUEST_NEXT_SEARCH';
export const SUCCEEDED_SEARCH = 'SUCCEEDED_SEARCH';
export const SUCCEEDED_NEXT_SEARCH = 'SUCCEEDED_NEXT_SEARCH';
export const FAILED_SEARCH = 'FAILED_SEARCH';
export const REQUEST_ANALYSIS = 'REQUEST_ANALYSIS';
export const SUCCEEDED_ANALYSIS = 'SUCCEEDED_ANALYSIS';
export const FAILED_ANALYSIS = 'FAILED_ANALYSIS';
export const LOAD_ITEMS = 'LOAD_ITEMS';
export const ADD_FAVORITE_ITEM = 'ADD_FAVORITE_ITEM';
export const DELETE_FAVORITE_ITEM = 'DELETE_FAVORITE_ITEM';
export const CHANGE_ITEM_TYPE = 'CHANGE_ITEM_TYPE';
export const CHANGE_CHART_ITEM_TYPE = 'CHANGE_CHART_ITEM_TYPE';
export const CHANGE_CHART_TYPE = 'CHANGE_CHART_TYPE';
export const RESET_LOADED_ITEMS = 'RESET_LOADED_ITEMS';

export const requestSearch = () => ({
  type: REQUEST_SEARCH,
});

export const requestAnalysis = () => ({
  type: REQUEST_ANALYSIS,
});

export const requestNextSearch = () => ({
  type: REQUEST_NEXT_SEARCH,
});

export const succeededSearch = (items) => ({
  type: SUCCEEDED_SEARCH,
  data: items,
});

export const succeededNextSearch = (items) => ({
  type: SUCCEEDED_NEXT_SEARCH,
  data: items,
});

export const succeededAnalysis = (data) => ({
  type: SUCCEEDED_ANALYSIS,
  data,
});

export const failedSearch = (error) => ({
  type: FAILED_SEARCH,
  error,
});

export const failedAnalysis = (error) => ({
  type: FAILED_ANALYSIS,
  error,
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

export const changeChartType = (chartType) => ({
  type: CHANGE_CHART_TYPE,
  data: chartType,
});

export const changeChartItemType = (itemType) => ({
  type: CHANGE_CHART_ITEM_TYPE,
  data: itemType,
});

// export const loadItems = (items) => ({
//   type: LOAD_ITEMS,
//   data: items,
// });

// export const resetLoadedItems = (items) => ({
//   type: RESET_LOADED_ITEMS,
//   data: items,
// });
