import { useState } from "react";

// data
import { initialMessageBar } from "./useMessageBar.data";

// interfaces
import { IMessageBar } from "./useMessageBar.types";

const useMessageBar = () => {
  const [messageBar, setMessageBar] = useState<IMessageBar>(initialMessageBar);
  
  const resetMessageBar = () => {
    setMessageBar(initialMessageBar);
  }
  
  return {messageBar, setMessageBar, resetMessageBar};
};

export default useMessageBar;