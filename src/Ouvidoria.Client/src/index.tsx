import "react-app-polyfill/ie11";
import "react-app-polyfill/ie9";
import "react-app-polyfill/stable";
// tslint:disable-next-line: ordered-imports
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/styles";
import React from "react";
import ReactDOM from "react-dom";
import theme from "./theme";
import App from "./App";

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </ThemeProvider>,
  document.querySelector("#root")
);
