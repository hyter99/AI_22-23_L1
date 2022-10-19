import React from "react";

// styles
import styles from "./login.module.scss";

// templates
import TemplateFullScreenView from "../../templates/full-screen-view/full-screen-view.template";

// components
//import LoginForm from "./login-form/login-form.component";

// interfaces
interface IViewLogin {
  appVersion: string;
}

const ViewLogin:React.FC<IViewLogin> = ({appVersion}) => {

  return (
    <TemplateFullScreenView appVersion={appVersion} viewTitle="Logowanie">
      {/*<LoginForm/>*/}
    </TemplateFullScreenView>
  );
};

export default ViewLogin;