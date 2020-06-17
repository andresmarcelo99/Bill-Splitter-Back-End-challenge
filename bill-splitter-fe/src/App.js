import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { useAuth0 } from "./react-auth0-spa";
import Main from "./Components/MainPage";
import Test from "./Components/Test";
import Splits from "./Components/Splits";
import PrivateRoute from "./Components/PrivateRoute";
import ExternalApi from "./views/ExternalApi";
import "./App.css";

function App() {
  const { loading } = useAuth0();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Main} />
          <PrivateRoute path="/splits" exact component={Splits} />
          <PrivateRoute path="/test" component={Test} />
          <PrivateRoute path="/external-api" component={ExternalApi} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
