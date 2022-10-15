import { ActionType } from "../action-types/login";
import { AdminLogin } from "../data-types/login";

interface UserLoginRequestAction {
  type: ActionType.USER_LOGIN_REQUEST;
}

interface UserLoginSuccessAction {
  type: ActionType.USER_LOGIN_SUCCESS;
  payload: AdminLogin;
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

interface SetLoadingAction {
  type: ActionType.USER_LOGIN_SET_LOADING;
  payload: boolean;
}

export type LoginActions = UserLoginRequestAction | UserLoginSuccessAction | UserLoginFailAction | UserLogoutAction | SetErrorAction | SetLoadingAction;