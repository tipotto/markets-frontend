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
        itemsNums: [],
      },
      range: {
        priceLabels: [],
        itemsNums: [],
      },
      detail: {
        priceLabels: [],
        itemsNums: [],
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
