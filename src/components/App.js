import React from "react";
import Top from "./pages/_Top";
import List from "./pages/ItemList";
import { BrowserRouter, Route } from "react-router-dom";

const App = () => (
  <BrowserRouter>
    <div>
      <Route exact path="/" component={Top} />
      <Route path="/list/" component={List} />
    </div>
  </BrowserRouter>
);

export default App;
