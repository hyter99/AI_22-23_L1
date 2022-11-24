import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

// views
import ViewError from "../../error/error.component";
import ViewStocks from "../../stocks/stocks.component";
import ViewDetailsStock from "../../stock-details/stock-details.component";
import ViewMyProfile from "../../my-profile/my-profile.component";

// enum
import { MyProfileAvailableUrlEnum } from "../../my-profile/my-profile.data";

// interfaces
interface IAuthenticatedApp {
  appVersion: string;
}

const AuthenticatedApp: React.FC<IAuthenticatedApp> = ({appVersion}) => {
  
  return (
    <Switch>
      {/*Main routes*/}
      <Route
        exact
        path="/"
        component={() => (
          <ViewStocks
            appVersion={appVersion}
            isLogged={true}
          />
        )}
      />
      <Route
        exact
        path="/szczegoly-akcji/:id"
        component={() => (
          <ViewDetailsStock
            appVersion={appVersion}
            isLogged={true}
          />
        )}
      />
      <Route
        exact
        path="/moj-profil/:page_name"
        component={() => (
          <ViewMyProfile
            appVersion={appVersion}
            isLogged={true}
          />
        )}
      />
      <Route
        exact
        path="/moj-profil"
        component={() =>
          <Redirect to={`/moj-profil/${MyProfileAvailableUrlEnum.DATA}`} />
        }
      />
      <Route
        exact
        path={["/logowanie", "/rejestracja"]}
        component={() =>
          <Redirect to="/" />
        }
      />
      {/*Other routes*/}
      <Route
        exact
        path="*"
        component={() =>
          <ViewError appVersion={appVersion} />
        }
      />
    </Switch>
  );
};

export default AuthenticatedApp;