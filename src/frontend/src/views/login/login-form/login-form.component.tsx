import React from "react";
import {Link} from "react-router-dom";

// styles
import styles from "./login-form.module.scss";

// SVGS
//@ts-ignore
import {ReactComponent as SVGLoginImage} from "../../../assets/svg/stock-logo.svg";

// components
import InputField from "../../../components/ui/input-field/input-field.component";
import MessageBox from "../../../components/message-box/message-box.component";
import LoadingModal from "../../../modals/loading-modal/loading-modal.component";

// hooks
import useLoginForm from "./login-form.hook";
import Button from "../../../components/ui/button/button.component";

const LoginForm:React.FC = () => {
  const {loginInputs, errorLoginInputs, handleInputsChange, submitLogin, loadingLogin, errorLogin} = useLoginForm();

  return (
    <form
      className={styles.loginForm}
      onSubmit={(e: React.FormEvent) => submitLogin(e)}
      noValidate
    >
      <div className={styles.leftSite}>
        <div className={styles.loginImage}>
          <SVGLoginImage/>
        </div>
        <div className={styles.description}>
          <p className={styles.descriptionText}>
            Twórz i rozwiązuj testy
            <br/>
            w jeszcze <b>łatwiejszy</b>
            <br/>
            sposób niż <b>kiedykolwiek!</b>
          </p>
        </div>
      </div>
      <div className={styles.rightSite}>
        <div className={styles.header}>
          <p className={styles.headerText}>Zaloguj się</p>
          <p className={styles.subHeaderText}>Twórz, rozwiązuj testy i zobacz jakie to łatwe!</p>
        </div>
        <div className={styles.inputForm}>
          <div className={styles.input}>
            <InputField
              type="text"
              label="Nazwa użytkownika"
              placeholder="Nazwa użytkownika"
              name="userName"
              value={loginInputs.userName}
              handleChange={handleInputsChange}
              isError={errorLoginInputs.userNameMessage !== ""}
              errorMessage={errorLoginInputs.userNameMessage}
            />
          </div>
          <div className={styles.input}>
            <InputField
              type="password"
              label="Hasło"
              placeholder="Hasło"
              name="password"
              value={loginInputs.password}
              handleChange={handleInputsChange}
              isError={errorLoginInputs.passwordMessage !== ""}
              errorMessage={errorLoginInputs.passwordMessage}
            />
          </div>
        </div>
        <div className={styles.submitButtonForm}>
          <div className={styles.buttonWrap}>
            <Button
              type="submit"
              backgroundColor="purple"
              fontColor="white"
              title="Zaloguj się"
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