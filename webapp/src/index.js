import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import store from "./store";
import { Provider } from "react-redux";
import Dashboard from "./containers/Dashboard";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import "react-tippy/dist/tippy.css";

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route path="/" component={Dashboard} />
    </Router>
  </Provider>,
  document.getElementById("root")
);
