import { compose, createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import history from "../history";
import { routerMiddleware } from "connected-react-router";
import { composeWithDevTools } from "redux-devtools-extension";
import createRootReducer from "../reducers/";
import rootSaga from "../sagas/";

const storeCreator = () => {
  const sagaMiddleware = createSagaMiddleware();
  const reduxDevTools = composeWithDevTools();

  const store = createStore(
    createRootReducer(history),
    compose(
      applyMiddleware(sagaMiddleware, routerMiddleware(history)),
      reduxDevTools
    )
  );

  sagaMiddleware.run(rootSaga);
  return store;
};

export default storeCreator;
