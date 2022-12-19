import { useState } from "react";

// data
import { initialMyProfileDataModalsState } from "./my-profile-data.data";

// interfaces
import { IMyProfileDataModalsState } from "./my-profile-data.types";

const useMyProfileData = () => {
  const [modalsState, setModalsState] = useState<IMyProfileDataModalsState>(initialMyProfileDataModalsState);
  
  const handleModalStateChange = (name: string, value: boolean) => {
    setModalsState(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  return {
    modalsState,
    handleModalStateChange
  };
};

export default useMyProfileData;