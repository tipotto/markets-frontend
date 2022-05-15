export const ROW_HEIGHT_MARGIN = 10;
export const SMARTPHONE_BREAKPOINT = 360;
export const TABLET_BREAKPOINT = 768;
export const PC_BREAKPOINT = 1025;
export const LARGE_PC_BREAKPOINT = 1500;

export const getItemSize = (width) => {
  // itemWidth:itemHeight の比率はいずれも 1:1.106 に統一
  if (width < TABLET_BREAKPOINT) {
    return { itemWidth: 120, itemHeight: 133 };
  }

  if (width >= TABLET_BREAKPOINT && width < PC_BREAKPOINT) {
    return { itemWidth: 160, itemHeight: 177 };
  }

  return { itemWidth: 250, itemHeight: 277 };
};

export const getItemsPerRow = (width) => {
  if (width < SMARTPHONE_BREAKPOINT) {
    return 2;
  }

  if (width >= SMARTPHONE_BREAKPOINT && width < 600) {
    return 3;
  }

  if (width >= 600 && width < 720) {
    return 4;
  }

  if (width >= 720 && width < PC_BREAKPOINT) {
    return 5;
  }

  if (width >= PC_BREAKPOINT && width < 1300) {
    return 3;
  }

  if (width >= 1300 && width < 1500) {
    return 4;
  }

  if (width >= 1500 && width < 1800) {
    return 5;
  }

  if (width >= 1800 && width < 2000) {
    return 6;
  }

  if (width >= 2000 && width < 2200) {
    return 7;
  }

  return 8;
};

export const getRowHeightMargin = () => 0;
