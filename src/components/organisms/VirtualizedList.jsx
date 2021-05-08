import React from "react";
import { List, WindowScroller } from "react-virtualized";
import { makeStyles } from "@material-ui/core/styles";
import Item from "./Item";
import {
  ROW_HEIGHT_MARGIN,
  getItemSize,
  getItemsPerRow,
} from "../../constants/VirtualizedList";

const useStyles = makeStyles(() => ({
  cardArea: {
    marginTop: 10,
    "&>div.ReactVirtualized__List": {
      outline: "none",
    },
  },
  row: {
    display: "flex",
    justifyContent: "center",
    "&>div.MuiPaper-root": {
      marginLeft: "5px",
      marginRight: "5px",
      "&:first-child": {
        marginLeft: "10px",
      },
      "&:last-child": {
        marginRight: "10px",
      },
    },
  },
}));

const VirtualizedList = ({ results, handleFavorite }) => {
  const { cardArea, row } = useStyles();

  return (
    <WindowScroller>
      {({ width, height, isScrolling, registerChild, scrollTop }) => {
        const { itemWidth, itemHeight } = getItemSize(width);

        const itemsPerRow = Math.min(
          getItemsPerRow(width),
          Math.floor(width / itemWidth)
        );

        const rowCount = Math.ceil(results.length / itemsPerRow);
        return (
          <div ref={registerChild} className={cardArea}>
            <List
              autoHeight
              width={width}
              height={height}
              isScrolling={isScrolling}
              scrollTop={scrollTop}
              rowCount={rowCount}
              rowHeight={itemHeight + ROW_HEIGHT_MARGIN}
              overscanRowCount={2}
              rowRenderer={({ index, key, style }) => {
                const items = [];
                const fromIndex = index * itemsPerRow;
                const toIndex = Math.min(
                  fromIndex + itemsPerRow,
                  results.length
                );
                for (let i = fromIndex; i < toIndex; i++) {
                  const item = results[i];
                  items.push(
                    <Item
                      key={item.id}
                      item={item}
                      isFavorite={item.isFavorite}
                      handleFavorite={handleFavorite}
                    />
                  );
                }
                const emptySize = itemsPerRow - items.length;
                for (let i = 0; i < emptySize; i++) {
                  items.push(<Item key={i + toIndex} empty />);
                }
                return (
                  <div className={row} key={key} style={style}>
                    {items}
                  </div>
                );
              }}
            />
          </div>
        );
      }}
    </WindowScroller>
  );
};

export default VirtualizedList;
