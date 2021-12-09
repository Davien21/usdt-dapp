import React, { useEffect } from "react";

import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import { Home } from "./pages";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

const AppRouter = () => {
  return (
    <>
      <ScrollToTop />
      <Switch>
        <Route path="/" render={(props) => <Home />} />
        <Route path="*" render={(props) => <Redirect to="/" />} />
      </Switch>
    </>
  );
};

export default AppRouter;
