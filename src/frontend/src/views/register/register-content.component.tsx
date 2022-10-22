import React from "react";

// styles
import styles from "./register-content.module.scss";

// templates
import TemplateFullScreenView from "../../templates/full-screen-view/full-screen-view.template";

// components
import RegisterForm from "./register-form/register-form.component";

// interfaces
interface IViewRegister {
  appVersion: string;
}

const ViewRegister:React.FC<IViewRegister> = ({appVersion}) => {

  return (
    <TemplateFullScreenView appVersion={appVersion} viewTitle="Rejestracja">
      <RegisterForm/>
    </TemplateFullScreenView>
  );
};

export default ViewRegister;