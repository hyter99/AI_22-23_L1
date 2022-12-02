import React, {useState, useEffect} from "react";

// functions
import {CentsToString} from "../../../functions/cents-to-string";

const useAddFundsModal = (actualBalanceCents: number) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // TODO - write logic of this modal (with function to count balanceAfterChange - write function to sumBalance based on 2 strings (use 'CentsToString' function))

  const handleSubmitClick = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO - write logic of this function
  };

  return {
    isLoading,
    handleSubmitClick
  };
};

export default useAddFundsModal;