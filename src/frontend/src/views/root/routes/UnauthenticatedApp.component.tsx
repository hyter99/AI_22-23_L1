import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

// views
// import ViewLogin from "../../login/login-content.component";
// import ViewRegister from "../../register/register-content.component";

// interfaces
interface IUnauthenticatedApp {
  appVersion: string;
}

const UnauthenticatedApp: React.FC<IUnauthenticatedApp> = ({appVersion}) => {

  return (
    <Switch>
      {/*Register*/}
      {/*<Route*/}
      {/*  exact*/}
      {/*  path="/rejestracja"*/}
      {/*  component={() =>*/}
      {/*    <ViewRegister appVersion={appVersion} />*/}
      {/*  }*/}
      {/*/>*/}
      {/*Login view - main view*/}
      <Route
        exact
        path="/akcje"
        component={() =>
          <div>akcje dla niezalogowanego użytkownika</div>
        }
      />
      <Route
        exact
        path="/rejestracja"
        component={() =>
          // <ViewLogin appVersion={appVersion} />
          <div>rejestracja</div>
        }
      />
      <Route
        exact
        path="/"
        component={() =>
          // <ViewLogin appVersion={appVersion} />
          <div>logowanie</div>
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