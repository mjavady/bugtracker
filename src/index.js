import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";

import "./index.css";
import App from "./App";

ReactDOM.render(
  <BrowserRouter>
    <Route>
      <App />
    </Route>
  </BrowserRouter>,
  document.getElementById("root")
);
