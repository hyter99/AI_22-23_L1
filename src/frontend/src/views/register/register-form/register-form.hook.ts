import React, {useEffect, useState} from "react";

// interfaces
import {IRegisterInputs, IErrorRegisterInputs} from "./register-form.types";

// data
import {initialRegisterInputs, initialErrorRegisterInputs} from "./register-form.data";
import { environment } from "../../../constants/environment-variables";
import { emailRgx } from "../../../data/email-rgx";

// functions
import {DoesStringContainOneOrMoreUpperCaseLetter, DoesStringContainOneOrMoreNumber} from "../../../functions/string-contain-checking";
import { TranslateRegisterErrorMessage } from "./register-form.functions";

const useRegisterForm = () => {
  const [registerInputs, setRegisterInputs] = useState<IRegisterInputs>(initialRegisterInputs);
  const [errorRegisterInputs, setErrorRegisterInputs] = useState<IErrorRegisterInputs>(initialErrorRegisterInputs);
  const [isLiveValidation, setIsLiveValidation] = useState<boolean>(false);
  const [errorMessageRegister, setErrorMessageRegister] = useState<string>("");
  const [isLoadingRegister, setIsLoadingRegister] = useState<boolean>(false);
  const [isSuccessRegister, setIsSuccessRegister] = useState<boolean>(false);

  // useEffect(() => {
  //   console.log("Inputs change:", registerInputs);
  // },[registerInputs]);

  // useEffect(() => {
  //   console.log("Error inputs change:", errorRegisterInputs);
  // },[errorRegisterInputs]);

  useEffect(() => {
    if (isSuccessRegister) {
      setIsSuccessRegister(false);
      setErrorMessageRegister("");
    }
  },[registerInputs]);

  // Live validating - firstName
  useEffect(() => {
    if (isLiveValidation) {
      validateData();
    }
  },[registerInputs]);

  const handleInputChange = (name: string, value: string) => {
    setRegisterInputs(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (name: string, value: string, checked: boolean) => {
    setRegisterInputs(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const validateData = (): boolean => {
    let isError = false;

    // Check firstName (min_length=3, max_length=50)
    let firstNameErrorMessage = "";
    if(registerInputs.firstName.length < 3) {
      isError = true;
      firstNameErrorMessage = "Imię ma mniej niż 3 znaki";
    }
    else if (registerInputs.firstName.length > 50) {
      isError = true;
      firstNameErrorMessage = "Imię ma więcej niż 50 znaków";
    }

    setErrorRegisterInputs(prev => ({
      ...prev,
      firstNameErrorMessage: firstNameErrorMessage
    }));

    // Check lastName (min_length=3, max_length=50)
    let lastNameErrorMessage = "";
    if(registerInputs.lastName.length < 3) {
      isError = true;
      lastNameErrorMessage = "Nazwisko ma mniej niż 3 znaki";
    }
    else if (registerInputs.lastName.length > 50) {
      isError = true;
      lastNameErrorMessage = "Nazwisko ma więcej niż 50 znaków";
    }

    setErrorRegisterInputs(prev => ({
      ...prev,
      lastNameErrorMessage: lastNameErrorMessage
    }));

    // Check email (should match the emailRgx)
    let emailErrorMessage = "";
    if (!emailRgx.test(registerInputs.email)) {
      isError = true;
      emailErrorMessage = "Email jest nieprawidłowy";
    }

    setErrorRegisterInputs(prev => ({
      ...prev,
      emailErrorMessage: emailErrorMessage
    }));

    // Check password
    let passwordErrorMessage = "";
    let repeatPasswordErrorMessage = "";
    if (registerInputs.password.localeCompare(registerInputs.passwordRepeat) !== 0) {
      isError = true;
      passwordErrorMessage = "Hasła muszą się zgadzać";
      repeatPasswordErrorMessage = passwordErrorMessage;
    }
    else if (registerInputs.password.length < 6) {
      isError = true;
      passwordErrorMessage = "Hasło ma mniej niż 6 znaków";
    }
    else if (!DoesStringContainOneOrMoreUpperCaseLetter(registerInputs.password)) {
      isError = true;
      passwordErrorMessage = "Hasło nie zawiera żadnej dużej litery";
    }
    else if (!DoesStringContainOneOrMoreNumber(registerInputs.password)) {
      isError = true;
      passwordErrorMessage = "Hasło nie zawiera żadnej cyfry";
    }

    setErrorRegisterInputs(prev => ({
      ...prev,
      passwordErrorMessage: passwordErrorMessage,
      passwordRepeatErrorMessage: repeatPasswordErrorMessage
    }));

    // Privacy policy check
    let isPrivacyPolicySetError = false;
    if(!registerInputs.isPrivacyPolicySet) {
      isError = true;
      isPrivacyPolicySetError = true;
    }

    setErrorRegisterInputs(prev => ({
      ...prev,
      isPrivacyPolicySetError: isPrivacyPolicySetError
    }));

    return !isError;
  };

  const submitRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLiveValidation(true);

    if (validateData()) {
      setIsSuccessRegister(false);
      setIsLoadingRegister(true);

      // Fetching register
      fetch(`${environment.backendUrl}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: registerInputs.firstName,
          surname: registerInputs.lastName,
          email: registerInputs.email,
          password: registerInputs.password,
          passwordConfirm: registerInputs.password
        })
      })
      .then(async response => {
        if (response.ok) {
          setIsSuccessRegister(true);
        }
        else {
          const resData = await response.json();
          setErrorMessageRegister(TranslateRegisterErrorMessage(resData.message));
        }
      })
      .catch(err => {
        setErrorMessageRegister("Wystąpił nieoczekiwany błąd podczas rejestracji");
      })
      .finally(() => {
        setIsLoadingRegister(false);
      });
    }
  };

  return {registerInputs, errorRegisterInputs, handleInputChange, handleCheckboxChange, submitRegister, isLoadingRegister, errorMessageRegister, isSuccessRegister};
};

export default useRegisterForm;