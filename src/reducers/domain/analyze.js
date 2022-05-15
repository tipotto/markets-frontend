import initState from '../initState';
import { SUCCEEDED_ANALYSIS } from '../../actions';

const addAnalysisData = (state, { items, price, chart }) => {
  const { all, market } = items;
  return {
    ...state,
    items: {
      ...state.items,
      all: {
        ...state.items.all,
        byId: all.byId,
        allIds: all.allIds,
      },
      market: {
        ...state.items.market,
        byId: market.byId,
        allIds: market.allIds,
      },
    },
    price,
    chart,
  };
};

const analyzeReducer = (state = initState.analyze, { type, data }) => {
  switch (type) {
    case SUCCEEDED_ANALYSIS:
      return addAnalysisData(state, data);

    default:
      return state;
  }
};

export default analyzeReducer;
