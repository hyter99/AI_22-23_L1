export interface IRegisterInputs {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordRepeat: string;
  isPrivacyPolicySet: boolean;
}

export interface IErrorRegisterInputs {
  firstNameErrorMessage: string;
  lastNameErrorMessage: string;
  emailErrorMessage: string;
  passwordErrorMessage: string;
  passwordRepeatErrorMessage: string;
  isPrivacyPolicySetError: boolean;
}