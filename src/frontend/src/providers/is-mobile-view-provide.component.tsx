import React, { createContext, ReactNode } from "react";

// hooks
import useIsMobileView from "../hooks/useIsMobileView.hook";

interface IIsMobileViewProvider {
  children: ReactNode;
}

export interface IIsMobileViewContext {
  isMobileView: boolean;
}

const innerIsMobileViewContext: IIsMobileViewContext = {
  isMobileView: false
};

export const IsMobileViewContext = createContext(innerIsMobileViewContext);

const IsMobileViewProvider: React.FC<IIsMobileViewProvider> = ({children}) => {
  const {isMobileView} = useIsMobileView();

  return (
    <IsMobileViewContext.Provider
      value={{
        isMobileView: isMobileView
      }}
    >
      {children}
    </IsMobileViewContext.Provider>
  );
};

export default IsMobileViewProvider;