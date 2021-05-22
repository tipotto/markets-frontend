/* eslint-disable no-param-reassign */
import initState from '../initState';
import {
  SUCCEEDED_SEARCH,
  ADD_FAVORITE_ITEM,
  DELETE_FAVORITE_ITEM,
} from '../../actions';

const addItems = (state, data) => {
  const byId = {};
  const allIds = data.map((item) => {
    byId[item.id] = item;
    return item.id;
  });
  return { byId, allIds };
};

// dataはオブジェクトであることを想定
const addFavoriteItem = (state, data) => {
  const { byId } = state;
  const updateItem = byId[data.id];
  return {
    ...state,
    byId: {
      ...byId,
      [data.id]: { ...updateItem, isFavorite: true },
    },
  };
};

const deleteFavoriteItem = (state, data) => {
  const { byId } = state;
  const updateItem = byId[data.id];

  if (!updateItem) {
    console.log('No item to update.');
    return state;
  }

  return {
    ...state,
    byId: {
      ...byId,
      [data.id]: { ...updateItem, isFavorite: false },
    },
  };
};

const searchReducer = (state = initState.search, { type, data }) => {
  switch (type) {
    case SUCCEEDED_SEARCH:
      return addItems(state, data);

    case ADD_FAVORITE_ITEM:
      return addFavoriteItem(state, data);

    case DELETE_FAVORITE_ITEM:
      return deleteFavoriteItem(state, data);

    default:
      return state;

    // 無限スクロール利用時にコメントイン
    // case SUCCEEDED_SEARCH:
    //   return {
    //     ...state,
    //     items: {
    //       ...state.items,
    //       all: data.all,
    //       loaded: data.loaded,
    //     },
    //     loadedNumber: state.loadedNumber + LOAD_ITEM_NUMBER,
    //   };

    // case LOAD_ITEMS:
    //   return {
    //     ...state,
    //     items: {
    //       ...state.items,
    //       all: data.all,
    //       loaded: [...state.items.loaded, ...data.loaded],
    //     },
    //     loadedNumber: state.loadedNumber + LOAD_ITEM_NUMBER,
    //   };

    // case ADD_FAVORITE_ITEM:
    //   return {
    //     ...state,
    //     items: {
    //       ...state.items,
    //       favorite: [...state.items.favorite, data],
    //     },
    //   };

    // case DELETE_FAVORITE_ITEM:
    //   return {
    //     ...state,
    //     items: {
    //       ...state.items,
    //       favorite: state.items.favorite.filter(
    //         (item) => item.detailUrl !== data.detailUrl
    //       ),
    //     },
    //   };

    // case CHANGE_ITEM_TYPE:
    //   return {
    //     ...state,
    //     selectedTab: data,
    //   };

    // case RESET_LOADED_ITEMS:
    //   return {
    //     ...state,
    //     items: {
    //       ...state.items,
    //       all: data.all,
    //       loaded: data.loaded,
    //     },
    //     loadedNumber: LOAD_ITEM_NUMBER,
    //   };

    // default:
    //   return state;
  }
};

export default searchReducer;
