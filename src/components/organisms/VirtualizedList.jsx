/* eslint-disable no-plusplus */
import React, { memo } from 'react';
import { List, WindowScroller } from 'react-virtualized';
import Item from './Item';
import {
  getItemSize,
  getItemsPerRow,
  getRowHeightMargin,
} from '../../constants/virtualizedList';
import vListCss from '../../style/virtualizedList';

const getItemComponent = (item, handleFavorite) => {
  if (!handleFavorite) {
    return <Item key={item.id} item={item} />;
  }

  return (
    <Item
      key={item.id}
      item={item}
      isFavorite={item.isFavorite}
      handleFavorite={handleFavorite}
    />
  );
};

const VirtualizedList = ({ itemObj, itemIds, handleFavorite }) => {
  // console.log('VirtualizedList is rendered.');
  const { cardArea, row } = vListCss();
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
