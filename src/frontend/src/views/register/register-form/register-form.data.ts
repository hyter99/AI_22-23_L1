// interfaces
import {IRegisterInputs, IErrorRegisterInputs} from "./register-form.types";

export const initialRegisterInputs: IRegisterInputs = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  passwordRepeat: "",
  isPrivacyPolicySet: false
};

export const initialErrorRegisterInputs: IErrorRegisterInputs = {
  firstNameErrorMessage: "",
  lastNameErrorMessage: "",
  emailErrorMessage: "",
  passwordErrorMessage: "",
  passwordRepeatErrorMessage: "",
  isPrivacyPolicySetError: false
};