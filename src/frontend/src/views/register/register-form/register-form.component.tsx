import React from "react";
import {Link} from "react-router-dom";

// styles
import styles from "./register-form.module.scss";

// hooks
import useRegisterForm from "./register-form.hook";

// components
import InputField from "../../../components/ui/input-field/input-field.component";
import Button from "../../../components/ui/button/button.component";
import MessageBox from "../../../components/message-box/message-box.component";
import LoadingModal from "../../../modals/loading-modal/loading-modal.component";
import LogoHeader from "../../../components/logo-header/logo-header.component";
import Checkbox from "../../../components/ui/checkbox/checkbox.component";

const RegisterForm: React.FC = () => {
  const {
    registerInputs,
    errorRegisterInputs,
    submitRegister,
    handleInputChange,
    handleCheckboxChange,
    isLoadingRegister,
    errorMessageRegister,
    isSuccessRegister
  } = useRegisterForm();

  return (
    <form
      className={styles.registerForm}
      onSubmit={(e: React.FormEvent) => submitRegister(e)}
      noValidate
    >
      <LogoHeader title="Rejestracja"/>
      <div className={styles.middleSite}>
        <div className={styles.inline}>
          <div className={styles.input}>
            <InputField
              type="text"
              name="firstName"
              label="Imię"
              placeholder="Imię"
              value={registerInputs.firstName}
              handleChange={handleInputChange}
              isError={errorRegisterInputs.firstNameErrorMessage !== ""}
              errorMessage={errorRegisterInputs.firstNameErrorMessage}
              labelColor="white"
            />
          </div>
          <div className={styles.input}>
            <InputField
              type="text"
              name="lastName"
              label="Nazwisko"
              placeholder="Nazwisko"
              value={registerInputs.lastName}
              handleChange={handleInputChange}
              isError={errorRegisterInputs.lastNameErrorMessage !== ""}
              errorMessage={errorRegisterInputs.lastNameErrorMessage}
              labelColor="white"
            />
          </div>
        </div>
        <div className={styles.input}>
          <InputField
            type="text"
            name="email"
            label="E-mail"
            placeholder="E-mail"
            value={registerInputs.email}
            handleChange={handleInputChange}
            isError={errorRegisterInputs.emailErrorMessage !== ""}
            errorMessage={errorRegisterInputs.emailErrorMessage}
            labelColor="white"
          />
        </div>
        <div className={styles.input}>
          <InputField
            type="password"
            name="password"
            label="Hasło"
            placeholder="Hasło"
            value={registerInputs.password}
            handleChange={handleInputChange}
            isError={errorRegisterInputs.passwordErrorMessage !== ""}
            errorMessage={errorRegisterInputs.passwordErrorMessage}
            labelColor="white"
          />
        </div>
        <div className={styles.input}>
          <InputField
            type="password"
            name="passwordRepeat"
            label="Powtórz hasło"
            placeholder="Powtórz hasło"
            value={registerInputs.passwordRepeat}
            handleChange={handleInputChange}
            isError={errorRegisterInputs.passwordRepeatErrorMessage !== ""}
            errorMessage={errorRegisterInputs.passwordRepeatErrorMessage}
            labelColor="white"
          />
        </div>
        <div className={`${styles.input} ${styles.checkbox}`}>
          <Checkbox
            name="isPrivacyPolicySet"
            value="privacyPolicy"
            label="Akceptuję regulamin strony"
            checked={registerInputs.isPrivacyPolicySet}
            handleChange={handleCheckboxChange}
            isError={errorRegisterInputs.isPrivacyPolicySetError}
          />
        </div>
        <div className={styles.submitButtonForm}>
          <div className={styles.buttonWrap}>
            <Button
              type="submit"
              backgroundColor="darkerGray"
              fontColor="white"
              title="Zarejestruj się"
              bigFont
            />
          </div>
        </div>
        {/*Display the error from backend API*/}
        <div className={styles.registerErrorWrap}>
          {
            isSuccessRegister ?
              <MessageBox
                message="Pomyślnie zarejestrowano konto"
                link={<Link to="/logowanie">Zaloguj się</Link>}
                wide
              />
            : errorMessageRegister !== "" ?
              <MessageBox
                message={errorMessageRegister}
                wide
                isError
              />
            :
              null
          }
        </div>
        <div className={styles.additionalInfo}>
          <p>
            Masz już konto?
            <Link to="/logowanie">
              Zaloguj się.
            </Link>
          </p>
        </div>
        {
          isLoadingRegister ?
            <LoadingModal/>
          :
            null
        }
      </div>
    </form>
  );
};

export default RegisterForm;