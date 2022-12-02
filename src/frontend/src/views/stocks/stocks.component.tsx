import React  from "react";

// templates
import TemplateView from "../../templates/view/view.template";

// components
import StocksContent from "./content/stocks-content.component";

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
      <StocksContent
        isLogged={isLogged}
      />
    </TemplateView>
  );
};

export default ViewStocks;