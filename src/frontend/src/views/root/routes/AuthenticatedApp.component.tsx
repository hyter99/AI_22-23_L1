import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

// views
import ViewError from "../../error/error.component";

// interfaces
interface IAuthenticatedApp {
  appVersion: string;
}

const AuthenticatedApp: React.FC<IAuthenticatedApp> = ({appVersion}) => {

  return (
    <Switch>
      {/*TO DO - Other paths*/}
      {/*<Route*/}
      {/*  exact*/}
      {/*  path="/pytania/edytuj/:id"*/}
      {/*  component={() => (*/}
      {/*    isUserType("teacher", userRoles) ?*/}
      {/*      <ViewAddNewQuestion appVersion={appVersion} isQuestionEdit/>*/}
      {/*    ://STUDENT*/}
      {/*      <Redirect to="/" />*/}
      {/*  )*/}
      {/*  }*/}
      {/*/>*/}
      {/*Main menu*/}
      <Route
        exact
        path="/akcje"
        component={() => (
            //<ViewStudentMainMenu appVersion={appVersion} />
            <div>akcje dla zalogowanego użytkownika</div>
          )
        }
      />
      <Route
        exact
        path="/"
        component={() => (
          <Redirect to="/akcje" />
        )
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