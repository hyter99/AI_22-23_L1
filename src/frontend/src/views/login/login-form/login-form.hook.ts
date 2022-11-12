import React, {useEffect, useState} from "react";

// redux
import {useActions} from "../../../hooks/useActions";
import {useTypedSelector} from "../../../hooks/useTypedSelector";

// data
import {initialLoginInputs, initialErrorLoginInputs} from "./login-form.data";

// interfaces
import {IErrorLoginInputs, ILoginInputs} from "./login-form.types";

const useLoginForm = () => {
  const [loginInputs, setLoginInputs] = useState<ILoginInputs>(initialLoginInputs);
  const [errorLoginInputs, setErrorLoginInputs] = useState<IErrorLoginInputs>(initialErrorLoginInputs);
  const [isLiveValidation, setIsLiveValidation] = useState<boolean>(false);
  const {loginUser, resetStatus} = useActions();
  const {loading: loadingLogin, error: errorLogin} = useTypedSelector(state => state.login);
  const emailRgx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  useEffect(() => {
    resetStatus();
  },[]);

  // Validate data, when the live validation is on (after first attempt to log in)
  useEffect(() => {
    if (isLiveValidation) {
      validateData();
    }
  },[loginInputs]);

 const validateData = () => {
    let isError = false;

    // Check email (should match the emailRgx)
    let emailErrorMessage = "";
    if (!emailRgx.test(loginInputs.email)) {
      isError = true;
      emailErrorMessage = "Email jest nieprawidłowy";
    }

    setErrorLoginInputs(prev => ({
      ...prev,
      emailMessage: emailErrorMessage
    }));

    // Check password (min_length=1)
    let passwordErrorMessage = "";
    if (loginInputs.password.length === 0) {
      isError = true;
      passwordErrorMessage = "Hasło nie może być puste";
    }

    setErrorLoginInputs(prev => ({
      ...prev,
      passwordMessage: passwordErrorMessage
    }));

    return !isError;
  };

  const handleInputsChange = (name: string, value: string) => {
    setLoginInputs(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const submitLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLiveValidation(true);

    // Checking if we can submit the login
    if (validateData()) {
      loginUser(loginInputs.email, loginInputs.password);
    }
  };

  return {loginInputs, errorLoginInputs, handleInputsChange, submitLogin, loadingLogin, errorLogin};
};

export default useLoginForm;