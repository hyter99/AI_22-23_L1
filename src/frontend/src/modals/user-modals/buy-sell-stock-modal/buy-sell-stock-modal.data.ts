// interfaces
import { IMessageBar, IInputFields, IInputFieldsErrors } from "./buy-sell-stock-modal.types";

export const initialInputFields: IInputFields = {
  quantity: "",
  price: ""
};

export const initialInputFieldsErrors: IInputFieldsErrors = {
  quantity: "",
  price: ""
};

export const initialMessageBar: IMessageBar = {
  message: "",
  isError: false,
  isSuccess: false
}