import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Login, Dashboard, Menu } from "../../pages/index.jsx";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/menu">
          <Menu />
        </Route>
        <Route path="/">
          <Dashboard />
        </Route>
      </Switch>
    </Router>
  );
};
export default Routes;
