/* eslint-disable no-param-reassign */
import initState from "../initState";
import {
  SUCCEEDED_SEARCH,
  ADD_FAVORITE_ITEM,
  DELETE_FAVORITE_ITEM,
  CHANGE_ITEM_TYPE,
} from "../../actions";

const searchReducer = (state = initState.search, { type, data }) => {
  switch (type) {
    case SUCCEEDED_SEARCH:
      return {
        ...state,
        items: {
          ...state.items,
          all: data,
        },
        selectedTab: "all",
      };

    case ADD_FAVORITE_ITEM:
      return {
        ...state,
        items: {
          ...state.items,
          all: state.items.all.map((i) => {
            if (i.id === data.id) i.isFavorite = true;
            return i;
          }),
          favorites: [...state.items.favorites, data],
        },
      };

    case DELETE_FAVORITE_ITEM:
      return {
        ...state,
        items: {
          ...state.items,
          all: state.items.all.map((i) => {
            if (i.id === data.id) i.isFavorite = false;
            return i;
          }),
          favorites: state.items.favorites.filter(
            (item) => item.id !== data.id
          ),
        },
      };

    case CHANGE_ITEM_TYPE:
      return {
        ...state,
        selectedTab: data,
      };

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
