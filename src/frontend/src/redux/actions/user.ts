import { ActionType } from "../action-types/user";
import { ILogin, INewUserData } from "../data-types/user";

interface UserLoginRequestAction {
  type: ActionType.USER_REQUEST;
}

interface UserLoginSuccessAction {
  type: ActionType.USER_SUCCESS;
  payload: ILogin;
}

interface UserLoginFailAction {
  type: ActionType.USER_FAIL;
  payload: string;
}

interface UserLogoutAction {
  type: ActionType.USER_LOGOUT;
}

interface SetErrorAction {
  type: ActionType.USER_SET_ERROR;
  payload: string | null;
}

interface SetSuccessAction {
  type: ActionType.USER_SET_SUCCESS;
  payload: string | null;
}

interface SetLoadingAction {
  type: ActionType.USER_SET_LOADING;
  payload: boolean;
}

interface ResetStatusAction {
  type: ActionType.USER_RESET_STATUS;
}

interface SetLastViewAction {
  type: ActionType.USER_SET_LAST_VIEW;
  payload: string;
}

interface SetBalanceCentsAction {
  type: ActionType.USER_SET_BALANCE_CENTS;
  payload: {
    successMessage: string;
    newAmount: number;
    viewSet: string;
  };
}

interface SetBalanceCentsLocalAction {
  type: ActionType.USER_SET_BALANCE_CENTS_LOCAL;
  payload: {
    newAmount: number;
  };
}

interface SetNewUserDataAction {
  type: ActionType.USER_SET_NEW_DATA;
  payload: {
    userData: INewUserData
  };
}

export type LoginActions =
  UserLoginRequestAction |
  UserLoginSuccessAction |
  UserLoginFailAction |
  UserLogoutAction |
  SetErrorAction |
  SetSuccessAction |
  SetLoadingAction |
  ResetStatusAction |
  SetLastViewAction |
  SetBalanceCentsAction |
  SetBalanceCentsLocalAction |
  SetNewUserDataAction;