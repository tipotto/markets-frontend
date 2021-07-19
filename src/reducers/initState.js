const initState = {
  search: {
    pages: 0,
    byId: {},
    allIds: [],
  },
  like: {
    byId: {},
    allIds: [],
  },
  analyze: {
    items: {
      all: {
        byId: {},
        allIds: [],
      },
      market: {
        byId: {},
        allIds: [],
      },
    },
    price: {
      min: 0,
      max: 0,
      average: 0,
      market: {
        min: 0,
        max: 0,
      },
    },
    chart: {
      whole: {
        priceLabels: [],
        likesNums: [],
        itemsNums: [],
      },
      range: {
        priceLabels: [],
        likesNums: [],
        itemsNums: [],
        // backgroundColors: [],
        // borderColors: [],
      },
      detail: {
        priceLabels: [],
        likesNums: [],
        itemsNums: [],
        // backgroundColors: [],
        // borderColors: [],
      },
    },
  },
  state: {
    isLoading: false,
    selectedTab: 'all',
    selectedChart: 'range',
    selectedChartItem: 'all',
  },
  error: {
    hasError: false,
    status: null,
    message: null,
  },
};

export default initState;
