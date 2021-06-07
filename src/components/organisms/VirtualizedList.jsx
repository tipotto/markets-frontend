/* eslint-disable no-plusplus */
import React, { memo } from 'react';
import { List, WindowScroller } from 'react-virtualized';
import { makeStyles } from '@material-ui/core/styles';
import Item from './Item';
import {
  getItemSize,
  getItemsPerRow,
  getRowHeightMargin,
} from '../../constants/VirtualizedList';

const useStyles = makeStyles(() => ({
  cardArea: {
    marginTop: 10,
    padding: 0,
    backgroundColor: '#fff',
    '&>div.ReactVirtualized__List': {
      outline: 'none',
    },
  },
  row: {
    display: 'flex',
    justifyContent: 'center',
    '&>div.MuiPaper-root': {
      marginLeft: '2.5px',
      marginRight: '2.5px',
      '&:first-child': {
        marginLeft: '7px',
      },
      '&:last-child': {
        marginRight: '7px',
      },
    },
  },
}));

const getItemComponent = (item, handleFavorite) => (
  <Item
    key={item.id}
    item={item}
    isFavorite={item.isFavorite}
    handleFavorite={handleFavorite}
  />
);

const VirtualizedList = ({ itemObj, itemIds, handleFavorite }) => {
  // console.log('VirtualizedList is rendered.');
  const { cardArea, row } = useStyles();
  return (
    <WindowScroller>
      {({ width, height, isScrolling, registerChild, scrollTop }) => {
        const { itemWidth, itemHeight } = getItemSize(width);
        const itemsPerRow = Math.min(
          getItemsPerRow(width),
          Math.floor(width / itemWidth),
        );
        const rowCount = Math.ceil(itemIds.length / itemsPerRow);
        return (
          <div ref={registerChild} className={cardArea}>
            <List
              autoHeight
              width={width}
              height={height}
              isScrolling={isScrolling}
              scrollTop={scrollTop}
              rowCount={rowCount}
              rowHeight={itemHeight + getRowHeightMargin(width)}
              overscanRowCount={5}
              rowRenderer={({ index, key, style }) => {
                const itemList = [];
                const fromIndex = index * itemsPerRow;
                const toIndex = Math.min(
                  fromIndex + itemsPerRow,
                  itemIds.length,
                );
                for (let i = fromIndex; i < toIndex; i++) {
                  const itemId = itemIds[i];
                  const item = itemObj[itemId];
                  if (!item) continue;

                  // 画像のプリロード
                  const img = new Image();
                  img.src = item.imageUrl;

                  itemList.push(getItemComponent(item, handleFavorite));
                }
                const emptySize = itemsPerRow - itemList.length;
                for (let i = 0; i < emptySize; i++) {
                  itemList.push(<Item key={i + toIndex} empty />);
                }
                return (
                  <div className={row} key={key} style={style}>
                    {itemList}
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

export default memo(VirtualizedList);
