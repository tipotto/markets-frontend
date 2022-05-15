import initState from '../initState';
import {
  REQUEST_SEARCH,
  REQUEST_NEXT_SEARCH,
  REQUEST_ANALYSIS,
  SUCCEEDED_SEARCH,
  SUCCEEDED_NEXT_SEARCH,
  SUCCEEDED_ANALYSIS,
  FAILED_SEARCH,
  FAILED_ANALYSIS,
  CHANGE_ITEM_TYPE,
  CHANGE_CHART_TYPE,
  CHANGE_CHART_ITEM_TYPE,
} from '../../actions';

const stateReducer = (state = initState.state, { type, data }) => {
  switch (type) {
    case REQUEST_SEARCH:
    case REQUEST_NEXT_SEARCH:
      return { ...state, isLoading: true, selectedTab: 'all' };

    case REQUEST_ANALYSIS:
      return {
        ...state,
        isLoading: true,
        selectedTab: 'all',
        selectedChart: 'range',
        selectedChartItem: 'all',
      };

    case SUCCEEDED_SEARCH:
    case SUCCEEDED_NEXT_SEARCH:
    case SUCCEEDED_ANALYSIS:
    case FAILED_SEARCH:
    case FAILED_ANALYSIS:
      return { ...state, isLoading: false };

    case CHANGE_ITEM_TYPE:
      return { ...state, selectedTab: data };

    case CHANGE_CHART_TYPE:
      return { ...state, selectedChart: data };

    case CHANGE_CHART_ITEM_TYPE:
      return { ...state, selectedChartItem: data };

    default:
      return state;
  }
};

export default stateReducer;
