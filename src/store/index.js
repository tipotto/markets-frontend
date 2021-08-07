import { compose, createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../reducers';
import rootSaga from '../sagas';

const storeCreator = () => {
  const sagaMiddleware = createSagaMiddleware();
  const reduxDevTools = composeWithDevTools();

  const store = createStore(
    rootReducer(),
    compose(applyMiddleware(sagaMiddleware), reduxDevTools),
  );

  sagaMiddleware.run(rootSaga);
  return store;
};

export default storeCreator;
