import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Main from "./Components/MainPage";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Main} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
