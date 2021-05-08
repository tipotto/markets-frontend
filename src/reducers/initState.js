const initState = {
  search: {
    items: {
      all: [],
      favorites: [],
    },
    selectedTab: "all",
  },

  // 無限スクロール利用時にコメントイン
  // search: {
  //   items: {
  //     all: {
  //       loaded: [],
  //       rest: [],
  //       loadedNumber: 0,
  //     },
  //     favorites: [],
  //   },
  //   selectedTab: "all",
  // },
  state: {
    isLoading: false,
  },
};

export default initState;
