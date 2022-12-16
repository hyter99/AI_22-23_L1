import React, {useState, useEffect} from "react";

// data
import { initialInputFields, initialInputFieldsErrors } from "./buy-sell-stock-modal.data";
import { environment } from "../../../constants/environment-variables";

// functions
import { IsStringAPositiveInteger } from "../../../functions/is-string-a-positive-integer";
import { IsStringAPrice } from "../../../functions/is-string-a-price";
import { IsStringAPositivePrice } from "../../../functions/is-string-a-positive-price";
import { GetOfferStatusBE } from "../../../functions/get-offer-status-be";

// enum
import { StockStatusEnum } from "../../../hooks/data-table/useDataTable.types";

// hooks
import useMessageBar from "../../../hooks/message-bar/useMessageBar";

// redux
import { useTypedSelector } from "../../../hooks/useTypedSelector";

// interfaces
import { IInputFields, IInputFieldsErrors } from "./buy-sell-stock-modal.types";

const useBuySellStockModal = (isOpen: boolean, isBuyModal: boolean, id?: number) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [inputFields, setInputFields] = useState<IInputFields>(initialInputFields);
  const [inputFieldsErrors, setInputFieldsErrors] = useState<IInputFieldsErrors>(initialInputFieldsErrors);
  const [isLiveValidation, setIsLiveValidation] = useState<boolean>(false);
  const {messageBar, setMessageBar, resetMessageBar} = useMessageBar();
  
  const {accessToken} = useTypedSelector(state => state.login.loginData);
  
  // useEffect(() => {
  //   console.log("inputFields", inputFields);
  // },[inputFields]);
  
  useEffect(() => {
    resetData();
  },[isOpen]);
  
  useEffect(() => {
    if (isLiveValidation) {
      validateInputData();
    }
  },[inputFields, isLiveValidation]);
  
  const validateInputData = () => {
    let isError = false;
    
    // Quantity check
    let quantityErrorMessage = "";
    if (!IsStringAPositiveInteger(inputFields.quantity)) {
      isError = true;
      quantityErrorMessage = "Podaj dodatnią liczbę całkowitą";
    }
    
    setInputFieldsErrors(prev => ({
      ...prev,
      quantity: quantityErrorMessage
    }));
    
    // Price check
    let priceErrorMessage = "";
    //!IsStringAPrice(inputFields.price) || Number(inputFields.price) <= 0
    if (!IsStringAPositivePrice(inputFields.price)) {
      isError = true;
      priceErrorMessage = "Zły format ceny";
    }

    setInputFieldsErrors(prev => ({
      ...prev,
      price: priceErrorMessage
    }));
    
    return !isError;
  };
  
  const handleInputChange = (name: string, value: string) => {
    let canChange = false;
    
    if (value === "") {
      canChange = true;
    } 
    else if (name === "quantity") {
      if (IsStringAPositiveInteger(value)) {
        canChange = true;
      }
    }
    else { // name === "price"
      if (IsStringAPrice(value)) {
        canChange = true;
      }
    }
    
    if (canChange) {
      setInputFields(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };
  
  const handleSubmitClick = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLiveValidation(true);
    
    if (id && validateInputData()) {
      setIsLoading(true);
      
      const fetchUrl = `${environment.backendUrl}/api/make-${isBuyModal ? "buy" : "sell"}-offer`;
      
      const priceToSet = parseFloat(inputFields.price)*100;
      const fetchBody: any = {
        quantity: parseInt(inputFields.quantity),
        status: GetOfferStatusBE(StockStatusEnum.ACTIVE_OFFERS)
      };
      if (isBuyModal) {
        fetchBody.companyId = id;
        fetchBody.unitBuyPriceCents = priceToSet;
      }
      else { //isSellModal
        fetchBody.userStockId = id;
        fetchBody.unitSellPriceCents = priceToSet;
      }
      //console.log("body to set:", fetchBody);
      
      fetch(fetchUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(fetchBody)
      }).then(async response => {
          if (response.ok) {
            setMessageBar({
              message: `Poprawnie złożono ofertę ${isBuyModal ? "kupna" : "sprzedaży"}`,
              isSuccess: true,
              isError: false
            });
            //console.log("Created!");
          }
          else {
            //const resData = await response.json();
            setMessageBar({
              message: `Nie udało się złożyć oferty ${isBuyModal ? "kupna" : "sprzedaży"}`,
              isSuccess: false,
              isError: true
            });
          }
        }).catch(() => {
          setMessageBar({
            message: "Wystąpił nieoczekiwany błąd podczas składania oferty",
            isSuccess: false,
            isError: true
          });
        }).finally(() => {
          setIsLoading(false);
        });
    }
  };
  
  const calculateTotalPrice = (): string => {
    let strPriceToRet = "-";
    
    if (inputFields.price !== "" && inputFields.quantity !== "") {
      strPriceToRet = (parseFloat(inputFields.price)*parseFloat(inputFields.quantity)).toFixed(2) + " PLN";
    }
    
    return strPriceToRet;
  };
  
  const resetData = () => {
    setIsLoading(false);
    setInputFields(initialInputFields);
    setInputFieldsErrors(initialInputFieldsErrors);
    setIsLiveValidation(false);
    resetMessageBar();
  };
  
  return {
    isLoading,
    inputFields,
    handleInputChange,
    inputFieldsErrors,
    messageBar,
    handleSubmitClick,
    calculateTotalPrice
  };
};

export default useBuySellStockModal;