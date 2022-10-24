import React from "react";

// styles
import '../../styles/Root.scss';

// hooks
import useRoot from "./Root.hook";

// components
import AuthenticatedApp from "./routes/AuthenticatedApp.component";
import UnauthenticatedApp from "./routes/UnauthenticatedApp.component";

const Root: React.FC = () => {
  const {isUserLoggedIn} = useRoot();
  const appVersion = "- symulator giełdy";

  return (
    <>
      {
        isUserLoggedIn ?
          <AuthenticatedApp appVersion={appVersion} />
        :
          <UnauthenticatedApp appVersion={appVersion} />
      }
    </>
  );
};

export default Root;
