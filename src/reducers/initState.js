const initState = {
  search: {
    byId: {},
    allIds: [],
  },
  like: {
    byId: {},
    allIds: [],
  },
  state: {
    isLoading: false,
    selectedTab: 'all',
  },
  error: {
    hasError: false,
    status: null,
    message: null,
  },
};

export default initState;
