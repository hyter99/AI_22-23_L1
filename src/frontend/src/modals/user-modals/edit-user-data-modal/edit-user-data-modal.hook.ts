import React, {useState, useEffect} from "react";

// data
import { editUserDataError } from "./edit-user-data-modal.data";
import { emailRgx } from "../../../data/email-rgx";
import { environment } from "../../../constants/environment-variables";

// hooks
import useMessageBar from "../../../hooks/message-bar/useMessageBar";

// redux
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { useActions } from "../../../hooks/useActions";

// functions
import { TranslateEditUserDataErrorMessage } from "./edit-user-data-modal.functions";

// interfaces
import { IEditUserData, IEditUserDataError } from "./edit-user-data-modal.types";

const useEditUserDataModal = (isOpened: boolean) => {
  const {accessToken, user} = useTypedSelector(state => state.login.loginData);
  const {setUserDataLocal} = useActions();
  
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [inputFields, setInputFields] = useState<IEditUserData>({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email
  });
  const [inputFieldsError, setInputFieldsError] = useState<IEditUserDataError>(editUserDataError);
  const [isEmailChangeChecked, setIsEmailChangeChecked] = useState<boolean>(false);
  const [isLiveValidation, setIsLiveValidation] = useState<boolean>(false);
  const {messageBar, setMessageBar, resetMessageBar} = useMessageBar();
  
  useEffect(() => {
    resetData();
  },[isOpened]);
  
  useEffect(() => {
    if (isLiveValidation) {
      validateData();
    }
  },[inputFields]);
  
  useEffect(() => {
    if (!isEmailChangeChecked) {
      setInputFields(prev => ({
        ...prev,
        email: user.email
      }));
    }
  },[isEmailChangeChecked]);
  
  const handleInputChange = (name: string, value: string) => {
    setInputFields(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleEmailCheckboxChange = (value: boolean) => {
    setIsEmailChangeChecked(value);
  };
  
  const validateData = ():boolean => {
    let isError = false;
    
    // First name
    let firstNameErrorMessage = "";
    if (inputFields.firstName.length === 0) {
      isError = true;
      firstNameErrorMessage = "Pole nie może być puste";
    }
    
    setInputFieldsError(prev => ({
      ...prev,
      firstName: firstNameErrorMessage
    }));

    // Last name
    let lastNameErrorMessage = "";
    if (inputFields.lastName.length === 0) {
      isError = true;
      lastNameErrorMessage = "Pole nie może być puste";
    }

    setInputFieldsError(prev => ({
      ...prev,
      lastName: lastNameErrorMessage
    }));
    
    // Email
    let emailErrorMessage = "";
    if (!emailRgx.test(inputFields.email)) {
      isError = true;
      emailErrorMessage = "Błędny format adresu email";
    }
    else if (isEmailChangeChecked && (inputFields.email.localeCompare(user.email) === 0)) {
      isError = true;
      emailErrorMessage = "Adres email jest taki sam jak wcześniej";
    }

    setInputFieldsError(prev => ({
      ...prev,
      email: emailErrorMessage
    }));
    
    return !isError;
  };
  
  const handleSubmitClick = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLiveValidation(true);
    
    if (validateData()) {
      setIsLoading(true);
      const fetchUrl = `${environment.backendUrl}/api/profile`;
      const fetchBody: any = {
        name: inputFields.firstName,
        surname: inputFields.lastName
      };
      if (isEmailChangeChecked) {
        fetchBody.email = inputFields.email;
      }

      fetch(fetchUrl, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(fetchBody)
      }).then(async response => {
        if (response.ok) {
          setMessageBar({
            message: "Poprawnie zmieniono dane użytkownika",
            isSuccess: true,
            isError: false
          });

          setUserDataLocal(
            inputFields.firstName,
            inputFields.lastName,
            isEmailChangeChecked ? inputFields.email : null
          );
        }
        else {
          const resData = await response.json();
          setMessageBar({
            message: TranslateEditUserDataErrorMessage(resData.message),
            isSuccess: false,
            isError: true
          });
        }
      }).catch(err => {
        setMessageBar({
          message: "Wystąpił nieoczekiwany błąd podczas zmiany danych",
          isSuccess: false,
          isError: true
        });
      }).finally(() => {
        setIsLoading(false);
      });
    }
  };
  
  const resetData = () => {
    setIsLoading(false);
    setInputFields({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email
    });
    setInputFieldsError(editUserDataError);
    setIsEmailChangeChecked(false);
    setIsLiveValidation(false);
    resetMessageBar();
  };

  return {
    isLoading,
    messageBar,
    inputFields,
    handleInputChange,
    inputFieldsError,
    isEmailChangeChecked,
    handleEmailCheckboxChange,
    handleSubmitClick
  };
};

export default useEditUserDataModal;