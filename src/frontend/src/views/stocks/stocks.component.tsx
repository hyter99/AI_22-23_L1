import React from "react";

// templates
import TemplateView from "../../templates/view/view.template";

// components
//import LoginForm from "./login-form/login-form.component";

// interfaces
interface IViewStocks {
  appVersion: string;
  isLogged?: boolean;
}

const ViewStocks:React.FC<IViewStocks> = ({appVersion, isLogged}) => {

  return (
    <TemplateView
      appVersion={appVersion}
      viewTitle="Akcje"
      isLogged={isLogged}
    >
      {"Akcje"}
    </TemplateView>
  );
};

export default ViewStocks;