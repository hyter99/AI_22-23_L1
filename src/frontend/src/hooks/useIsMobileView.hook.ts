import { useContext, useEffect, useState } from "react";

// context
import { WindowContext } from "../providers/window-size-provider.component";

const useIsMobileView = () => {
  const [isMobileView, setIsMobileView] = useState<boolean>(false);
  const {windowWidth} = useContext(WindowContext);

  useEffect(() => {
    if (windowWidth > 1000) {
      setIsMobileView(false);
    }
    else {
      setIsMobileView(true);
    }
  },[windowWidth]);
  
  return {isMobileView};
};

export default useIsMobileView;