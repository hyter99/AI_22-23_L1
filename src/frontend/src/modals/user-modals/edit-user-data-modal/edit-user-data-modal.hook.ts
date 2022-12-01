import React, {useState, useEffect} from "react";

// interfaces
import { IEditUserData } from "./edit-user-data-modal.types";

const useEditUserDataModal = (initialData: IEditUserData) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // TODO - write logic of this modal (set inputs state with initialData)

  const handleSubmitClick = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO - write logic of this function
  };

  return {
    isLoading,
    handleSubmitClick
  };
};

export default useEditUserDataModal;