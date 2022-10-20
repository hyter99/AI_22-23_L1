// interfaces
import {ILoginInputs, IErrorLoginInputs} from "./login-form.types";

export const initialLoginInputs: ILoginInputs = {
  email: "",
  password: ""
};

export const initialErrorLoginInputs: IErrorLoginInputs = {
  emailMessage: "",
  passwordMessage: ""
};