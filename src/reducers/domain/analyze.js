import initState from '../initState';
import { SUCCEEDED_ANALYSIS } from '../../actions';

const analyzeReducer = (state = initState.analyze, { type, data }) => {
  switch (type) {
    case SUCCEEDED_ANALYSIS:
      // TODO: 処理を追加する
      return;

    default:
      return state;
  }
};

export default analyzeReducer;
