import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { connectRouter } from 'connected-react-router';
import searchReducer from './domain/search';
import likeReducer from './domain/like';
import stateReducer from './app/state';
import errorReducer from './app/error';

const rootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    form: formReducer,
    search: searchReducer,
    like: likeReducer,
    state: stateReducer,
    error: errorReducer,
  });

export default rootReducer;
