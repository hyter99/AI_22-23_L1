import { ActionType } from "../action-types/login";
import { ILogin, INewUserData } from "../data-types/login";

interface UserLoginRequestAction {
  type: ActionType.USER_LOGIN_REQUEST;
}

interface UserLoginSuccessAction {
  type: ActionType.USER_LOGIN_SUCCESS;
  payload: ILogin;
}

interface UserLoginFailAction {
  type: ActionType.USER_LOGIN_FAIL;
  payload: string;
}

interface UserLogoutAction {
  type: ActionType.USER_LOGOUT;
}

interface SetErrorAction {
  type: ActionType.USER_LOGIN_SET_ERROR;
  payload: string | null;
}

interface SetSuccessAction {
  type: ActionType.USER_LOGIN_SET_SUCCESS;
  payload: string | null;
}

interface SetLoadingAction {
  type: ActionType.USER_LOGIN_SET_LOADING;
  payload: boolean;
}

interface ResetStatusAction {
  type: ActionType.USER_LOGIN_RESET_STATUS;
}

interface SetLastViewSetAction {
  type: ActionType.USER_SET_LAST_VIEW_SET;
  payload: string;
}

interface SetBalanceCentsAction {
  type: ActionType.USER_SET_BALANCE_CENTS;
  payload: {
    successMessage: string;
    newAmount: number;
    viewSet: string | undefined;
  };
}

interface SetNewUserDataAction {
  type: ActionType.USER_SET_NEW_DATA;
  payload: {
    successMessage: string;
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
  SetLastViewSetAction |
  SetBalanceCentsAction |
  SetNewUserDataAction;