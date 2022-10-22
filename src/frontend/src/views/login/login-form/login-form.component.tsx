import React from "react";
import { Link } from "react-router-dom";

// styles
import styles from "./login-form.module.scss";

// components
import InputField from "../../../components/ui/input-field/input-field.component";
import MessageBox from "../../../components/message-box/message-box.component";
import LoadingModal from "../../../modals/loading-modal/loading-modal.component";
import LogoHeader from "../../../components/logo-header/logo-header.component";

// hooks
import useLoginForm from "./login-form.hook";
import Button from "../../../components/ui/button/button.component";

const LoginForm:React.FC= () => {
  const {loginInputs, errorLoginInputs, handleInputsChange, submitLogin, loadingLogin, errorLogin} = useLoginForm();

  return (
    <form
      className={styles.loginForm}
      onSubmit={(e: React.FormEvent) => submitLogin(e)}
      noValidate
    >
      <LogoHeader title="Logowanie"/>
      <div className={styles.middleSite}>
        <div className={styles.input}>
          <InputField
            type="email"
            label="Email"
            placeholder="Email"
            name="email"
            labelColor="white"
            value={loginInputs.email}
            handleChange={handleInputsChange}
            isError={errorLoginInputs.emailMessage !== ""}
            errorMessage={errorLoginInputs.emailMessage}
          />
        </div>
        <div className={styles.input}>
          <InputField
            type="password"
            label="Hasło"
            placeholder="Hasło"
            name="password"
            labelColor="white"
            value={loginInputs.password}
            handleChange={handleInputsChange}
            isError={errorLoginInputs.passwordMessage !== ""}
            errorMessage={errorLoginInputs.passwordMessage}
          />
        </div>
        <div className={styles.submitButtonForm}>
          <div className={styles.buttonWrap}>
            <Button
              type="submit"
              backgroundColor="darkerGray"
              fontColor="white"
              title="Zaloguj się"
              bigFont
            />
          </div>
        </div>
        <div className={styles.loginErrorWrap}>
          {
            errorLogin ?
              <MessageBox
                message={errorLogin}
                isError
              />
            :
              null
          }
        </div>
        <div className={styles.additionalInfo}>
          <p>
            Nie masz jeszcze konta?
            <Link to="/rejestracja">
              Zarejestruj się!
            </Link>
          </p>
        </div>
        {
          loadingLogin ?
            <LoadingModal/>
          :
            null
        }
      </div>
    </form>
  );
};

export default LoginForm;