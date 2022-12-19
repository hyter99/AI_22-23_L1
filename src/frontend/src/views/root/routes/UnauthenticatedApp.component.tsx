import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

// views
import ViewLogin from "../../login/login.component";
import ViewRegister from "../../register/register-content.component";
import ViewStocks from "../../stocks/stocks.component";
import ViewDetailsStock from "../../stock-details/stock-details.component";

// interfaces
interface IUnauthenticatedApp {
  appVersion: string;
}

const UnauthenticatedApp: React.FC<IUnauthenticatedApp> = ({appVersion}) => {

  return (
    <Switch>
      {/*Main routes*/}
      <Route
        exact
        path="/"
        component={() =>
          <ViewStocks
            appVersion={appVersion}
            isLogged={false}
          />
        }
      />
      <Route
        exact
        path="/szczegoly-akcji/:id"
        component={() => (
          <ViewDetailsStock
            appVersion={appVersion}
            isLogged={false}
          />
        )}
      />
      <Route
        exact
        path="/rejestracja"
        component={() =>
          <ViewRegister appVersion={appVersion} />
        }
      />
      <Route
        exact
        path="/logowanie"
        component={() =>
          <ViewLogin appVersion={appVersion} />
        }
      />
      {/*Other routes*/}
      <Route
        path="*"
        component={() =>
          <Redirect to="/" />
        }
      />
    </Switch>
  );
};

export default UnauthenticatedApp;