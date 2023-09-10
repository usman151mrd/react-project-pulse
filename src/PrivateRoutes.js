import React from "react";
import { Redirect, Route } from "react-router-dom";
import api from "./api";

const privateRoutes = ({ auth, children, ...rest }) => {
  let Token = localStorage.getItem("Token");
  if (Token) {
    api.defaults.headers.common["Authorization"] = "Bearer " + Token;
  }
  return (
    <Route
      {...rest}
      render={() => {
        return Token ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
            }}
          />
        );
      }}
    />
  );
};

export default privateRoutes;
