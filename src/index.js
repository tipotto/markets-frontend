import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import storeCreator from "./store/";
import history from "./history";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import { Route, Switch } from "react-router";
import { ConnectedRouter } from "connected-react-router";
import Top from "./components/pages/Top";
import ItemList from "./components/pages/ItemList";
import ItemForm from "./components/pages/ItemForm";

const store = storeCreator();

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path="/" component={Top} />
        <Route path="/list/" component={ItemList} />
        <Route path="/add/" component={ItemForm} />
      </Switch>
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
