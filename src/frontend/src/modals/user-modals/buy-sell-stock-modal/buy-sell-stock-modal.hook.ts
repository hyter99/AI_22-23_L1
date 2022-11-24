import React, {useState, useEffect} from "react";

const useBuySellStockModal = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // TODO - write logic of this modal
  // important! - create reusable function (in functions folder) to handle price validation from string (after input change)

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

export default useBuySellStockModal;