import {ActionType} from "../action-types/login";
import {LoginActions} from "../actions/login";
import {AdminLogin} from "../data-types/login";

// interfaces
interface ILoginState {
  loading: boolean;
  error: string | null;
  loginData: AdminLogin;
}

// initial state
const initialState: ILoginState = {
  loading: false,
  error: null,
  loginData: {
    accessToken: "",
    refreshToken: "",
    user: {
      id: "",
      username: "",
      firstName: "",
      lastName: "",
      email: ""
    }
  }
};

const reducer = (state: ILoginState = initialState, action: LoginActions): ILoginState => {
  switch (action.type) {
    case ActionType.USER_LOGIN_REQUEST:
      state.loading = true;
      state.error = null;
      return { ...state };

    case ActionType.USER_LOGIN_SUCCESS:
      state.loading = false;
      state.error = null;
      state.loginData = action.payload;
      return { ...state, loginData: {...state.loginData, user: {...state.loginData.user}}};

    case ActionType.USER_LOGIN_FAIL:
      state.loading = false;
      state.error = action.payload;
      return { ...state };

    case ActionType.USER_LOGOUT:
      state.loginData = {
        accessToken: "",
        refreshToken: "",
        user: {
          id: "",
          username: "",
          firstName: "",
          lastName: "",
          email: ""
        }
      };
      return { ...state, loginData: {...state.loginData, user: {...state.loginData.user}}};

    case ActionType.USER_LOGIN_SET_ERROR:
      state.error = action.payload;
      return { ...state };

    case ActionType.USER_LOGIN_SET_LOADING:
      state.loading = action.payload;
      return {...state};

    default:
      return state;
  }
};

export default reducer;