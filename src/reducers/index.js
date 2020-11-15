import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { connectRouter } from 'connected-react-router';
import searchReducer from './domain/search';
import stateReducer from './app/state';

const createRootReducer = (history) =>
  combineReducers({
    form: formReducer,
    router: connectRouter(history),
    search: searchReducer,
    state: stateReducer,
  });

export default createRootReducer;
