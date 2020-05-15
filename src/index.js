import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";

import App from "./App/App";
import "./styles/reset.css";
import "./index.scss";

import { Provider } from "react-redux";
import store from "./App/store";

ReactDOM.render(
  <Provider store={store}>
    <App /> 
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
