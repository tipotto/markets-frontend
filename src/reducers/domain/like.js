/* eslint-disable no-param-reassign */
import initState from "../initState";
import { ADD_FAVORITE_ITEM, DELETE_FAVORITE_ITEM } from "../../actions";

// dataはitemオブジェクトであることを想定
const addFavoriteItem = (state, data) => {
  const { byId, allIds } = state;
  return {
    ...state,
    byId: { ...byId, [data.id]: { ...data } },
    allIds: [...allIds, data.id],
  };
};

// dataはitemオブジェクトであることを想定
const deleteFavoriteItem = (state, data) => {
  const { byId, allIds } = state;
  const copiedById = { ...byId };
  delete copiedById[data.id];
  return {
    ...state,
    byId: copiedById,
    allIds: [...allIds].filter((id) => id !== data.id),
  };
};

const likeReducer = (state = initState.like, { type, data }) => {
  switch (type) {
    case ADD_FAVORITE_ITEM:
      return addFavoriteItem(state, data);

    case DELETE_FAVORITE_ITEM:
      return deleteFavoriteItem(state, data);

    default:
      return state;
  }
};

export default likeReducer;
