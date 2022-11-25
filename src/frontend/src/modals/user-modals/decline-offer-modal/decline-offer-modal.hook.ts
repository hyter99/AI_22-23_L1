import React, {useState, useEffect} from "react";

const useDeclineOfferModal = (isBuyModal: boolean) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // TODO - write logic of this modal

  const handleSubmitClick = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO - write logic of this function
    // other logic (which depends on what type is the modal: buy or sell) ...
  };
  
  return {
    isLoading,
    handleSubmitClick
  };
};

export default useDeclineOfferModal;