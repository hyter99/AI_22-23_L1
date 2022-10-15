import React, { createContext, ReactNode } from "react";

// hooks
import useWindowSize from "../hooks/useWindowSize";

interface IWindowSizeProvider {
  children: ReactNode;
}

export interface IWindowContext {
  windowWidth: number;
  windowHeight: number;
}

const innerWindowContext: IWindowContext = {
  windowWidth: 0,
  windowHeight: 0
};

export const WindowContext = createContext(innerWindowContext);

const WindowSizeProvider: React.FC<IWindowSizeProvider> = ({children}) => {
  const {windowWidth, windowHeight} = useWindowSize();

  return (
    <WindowContext.Provider
      value={{
        windowWidth: windowWidth,
        windowHeight: windowHeight
      }}
    >
      {children}
    </WindowContext.Provider>
  );
};

export default WindowSizeProvider;