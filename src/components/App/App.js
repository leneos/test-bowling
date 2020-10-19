import React from "react";
import { StartScreen } from "../StartScreen/StartScreen";
import "./App.scss";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import { Game } from "../Game/Game";
function App() {
  return (
    <div className="App">
      <div className="container">
        <Switch>
          <Route path="/start" component={Game} />
          <Route path="/" exact component={StartScreen} />
          <Redirect to="/" />
        </Switch>
      </div>
    </div>
  );
}

export default withRouter(App);
