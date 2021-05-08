/* eslint-disable no-param-reassign */
export const LOAD_ITEM_NUMBER = 15;

export const spliceArray = (array) => {
  const rest = array;
  const loaded = rest.splice(0, LOAD_ITEM_NUMBER);
  return { loaded, rest };
};

// export const checkPrices = (form) => {
//   if (!form.minPrice) form.minPrice = "0";
//   if (!form.maxPrice) form.maxPrice = "0";
//   return form;
// };
