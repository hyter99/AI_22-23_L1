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
  
  const handleSubmitClick = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO - write logic of this function (using id)
    // logic depends on what type is the modal: buy or sell ...
    
    if (id) {
      /* UNCOMMENT WHEN ENDPOINTS ARE DONE */
      // fetch(`${environment.backendUrl}/api/decline-${isBuyModal ? "buy" : "sell"}-offer/${id}`, {
      //   method: 'DELETE',
      //   headers: {
      //     'Authorization': `Bearer ${accessToken}`,
      //     'Content-Type': 'application/json'
      //   }
      // }).then(async response => {
      //   if (response.ok) {
      //     setMessageBar({
      //       message: `Poprawnie anulowano ofertę ${isBuyModal ? "kupna" : "sprzedaży"}`,
      //       isSuccess: true,
      //       isError: false
      //     });
      //   }
      //   else {
      //     setMessageBar({
      //       message: `Nie udało się anulować oferty ${isBuyModal ? "kupna" : "sprzedaży"}`,
      //       isSuccess: false,
      //       isError: true
      //     });
      //   }
      // }).catch(() => {
      //   setMessageBar({
      //     message: "Wystąpił nieoczekiwany błąd podczas anulowania oferty",
      //     isSuccess: false,
      //     isError: true
      //   });
      // }).finally(() => {
      //   setIsLoading(false);
      // });
      /* END */
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