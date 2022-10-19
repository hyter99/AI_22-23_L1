// interfaces
import {ILoginInputs, IErrorLoginInputs} from "./login-form.types";

export const initialLoginInputs: ILoginInputs = {
  userName: "",
  password: ""
};

export const initialErrorLoginInputs: IErrorLoginInputs = {
  userNameMessage: "",
  passwordMessage: ""
};