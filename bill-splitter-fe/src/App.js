import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { useAuth0 } from "./react-auth0-spa";
import Main from "./Components/MainPage";
import Test from "./Components/Test";
import PrivateRoute from "./Components/PrivateRoute";
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
          {/* <Route path="/test" exact component={Test} /> */}
          <PrivateRoute path="/test" component={Test} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
