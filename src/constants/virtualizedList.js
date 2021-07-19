export const ROW_HEIGHT_MARGIN = 10;
export const SMARTPHONE_BREAKPOINT = 360;
export const TABLET_BREAKPOINT = 768;
export const PC_BREAKPOINT = 1025;

export const getItemSize = (width) => {
  if (width < TABLET_BREAKPOINT) {
    return { itemWidth: 120, itemHeight: 137 };
  }

  return { itemWidth: 250, itemHeight: 285 };
};

export const getItemsPerRow = (width) => {
  if (width < SMARTPHONE_BREAKPOINT) {
    return 2;
  }

  if (width >= SMARTPHONE_BREAKPOINT && width < TABLET_BREAKPOINT) {
    return 3;
  }

  if (width >= TABLET_BREAKPOINT && width < PC_BREAKPOINT) {
    return 4;
  }

  return 5;
};

export const getRowHeightMargin = (width) => {
  if (width < TABLET_BREAKPOINT) {
    return 7;
  }

  return 16;
};
