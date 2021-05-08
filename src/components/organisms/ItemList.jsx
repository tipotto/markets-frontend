import React, { memo } from "react";
import Item from "./Item";

const ItemList = ({ items, handleFavorite }) => {
  console.log("ItemList");
  return items.map((item) => (
    <Item
      key={item.id}
      item={item}
      isFavorite={item.isFavorite}
      handleFavorite={handleFavorite}
    />
  ));
};

export default memo(ItemList);
