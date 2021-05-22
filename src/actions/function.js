/* eslint-disable no-param-reassign */
export const LOAD_ITEM_NUMBER = 15;

export const spliceArray = (array) => {
  const rest = array;
  const loaded = rest.splice(0, LOAD_ITEM_NUMBER);
  return { loaded, rest };
};
