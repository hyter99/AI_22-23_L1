import React, {useState, useEffect} from "react";

// hooks
import useMessageBar from "../../../hooks/message-bar/useMessageBar";
import { environment } from "../../../constants/environment-variables";

// redux
import { useTypedSelector } from "../../../hooks/useTypedSelector";

const useDeclineOfferModal = (isBuyModal: boolean, isOpened: boolean, id?: number) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {messageBar, setMessageBar, resetMessageBar} = useMessageBar();
  
  const {accessToken} = useTypedSelector(state => state.login.loginData);

  useEffect(() => {
    resetData();
  },[isOpened]);
  
  const handleSubmitClick = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    
    if (id) {
      try {
        const response = await fetch(`${environment.backendUrl}/api/cancel-${isBuyModal ? "buy" : "sell"}-offer/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        });

        //console.log("wynik:", await response.json());
        setIsLoading(false);

        if (response.ok) {
          setMessageBar({
            message: `Poprawnie anulowano ofertę ${isBuyModal ? "kupna" : "sprzedaży"}`,
            isSuccess: true,
            isError: false
          });
        }
        else {
          setMessageBar({
            message: `Nie udało się anulować oferty ${isBuyModal ? "kupna" : "sprzedaży"}`,
            isSuccess: false,
            isError: true
          });

          throw new Error("Can't decline offer");
        }
      }
      catch(err) {
        throw new Error("Can't decline offer");
      }
    }
    else {
      throw new Error("Can't decline offer");
    }
  };

  const resetData = () => {
    setIsLoading(false);
    resetMessageBar();
  };
  
  return {
    isLoading,
    messageBar,
    handleSubmitClick
  };
};

export default useDeclineOfferModal;