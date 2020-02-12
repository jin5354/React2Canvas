import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Route } from "react-router-dom";
import routes from "./routes";
import "minireset.css";

const Index = () => (
  <Router>
    {routes.map(route => {
      const Component = route.component;
      return (
        <Route
          path={route.path}
          exact={route.exact}
          key={route.path}
          render={() => <Component />}
        />
      );
    })}
  </Router>
);

ReactDOM.render(<Index />, document.getElementById('root'));
