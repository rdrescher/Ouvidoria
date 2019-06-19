import { makeStyles } from "@material-ui/core";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import ContentComponent from "../components/navigation/ContentComponent";
import NavbarComponent from "../components/navigation/NavbarComponent";
import SidebarComponent from "../components/navigation/SidebarComponent";
import Store from "../store";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex"
  }
}));

export default function MainView() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Provider store={Store}>
        <BrowserRouter>
          <Route component={NavbarComponent} />
          <Route component={SidebarComponent} />
          <ContentComponent />
        </BrowserRouter>
      </Provider>
    </div>
  );
}
