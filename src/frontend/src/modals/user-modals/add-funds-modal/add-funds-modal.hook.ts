import React, {useState, useEffect} from "react";

// functions
import { IsStringAPrice } from "../../../functions/is-string-a-price";
import { IsStringAPositivePrice } from "../../../functions/is-string-a-positive-price";

// redux
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { useActions } from "../../../hooks/useActions";

// hooks
import useMessageBar from "../../../hooks/message-bar/useMessageBar";

// data
import { environment } from "../../../constants/environment-variables";

const useAddFundsModal = (isOpened: boolean) => {
  const {accessToken, user: {balanceCents: actualBalanceCents}} = useTypedSelector(state => state.login.loginData);
  const { setBalanceCentsLocal } = useActions();
  
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [inputAmount, setInputAmount] = useState<string>("");
  const [inputAmountError, setInputAmountError] = useState<string>("");
  const [isLiveValidation, setIsLiveValidation] = useState<boolean>(false);
  const {messageBar, setMessageBar, resetMessageBar} = useMessageBar();
  
  useEffect(() => {
    resetData();
  },[isOpened]);

  useEffect(() => {
    if (isLiveValidation) {
      validateData();
    }
  },[inputAmount]);

  const handleInputAmountChange = (value: string) => {
    if (IsStringAPrice(value) || value === "") {
      setInputAmount(value);
    }
  };
  
  const handleSubmitClick = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLiveValidation(true);
    
    if (validateData()) {
      const amountToAdd = Math.round(parseFloat(inputAmount)*100);
      const fetchUrl = `${environment.backendUrl}/api/profile/add-wallet`;
      fetch(fetchUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          amountCents: amountToAdd
        })
      }).then(async response => {
        if (response.ok) {
          setMessageBar({
            message: "Pomyślnie dodano środki",
            isSuccess: true,
            isError: false
          });

          setBalanceCentsLocal(amountToAdd + actualBalanceCents);
        }
        else {
          //const resData = await response.json();
          setMessageBar({
            message: "Nie udało się dodać środków",
            isSuccess: false,
            isError: true
          });
        }
      }).catch(err => {
        setMessageBar({
          message: "Wystąpił nieoczekiwany błąd podczas dodawania środków",
          isSuccess: false,
          isError: true
        });
      }).finally(() => {
        setIsLoading(false);
      });
    }
  };
  
  const validateData = (): boolean => {
    let isError = false;
    let errorAmountMessage = "";
    
    // Price
    //!IsStringAPrice(inputAmount) || Number(inputAmount) <= 0
    if (!IsStringAPositivePrice(inputAmount)) {
      isError = true;
      errorAmountMessage = "Zły format ceny";
    }
    
    setInputAmountError(errorAmountMessage);
    
    return !isError;
  };
  
  const resetData = () => {
    setIsLoading(false);
    setInputAmount("");
    setInputAmountError("");
    setIsLiveValidation(false);
    resetMessageBar();
  };

  return {
    isLoading,
    messageBar,
    inputAmount,
    handleInputAmountChange,
    inputAmountError,
    handleSubmitClick,
    actualBalanceCents
  };
};

export default useAddFundsModal;