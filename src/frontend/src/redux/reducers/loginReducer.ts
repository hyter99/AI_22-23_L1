import { ActionType } from "../action-types/login";
import { LoginActions } from "../actions/login";
import { ILogin } from "../data-types/login";

// interfaces
interface ILoginState {
  loading: boolean;
  error: string | null;
  loginData: ILogin;
}

// initial state
const initialState: ILoginState = {
  loading: false,
  error: null,
  loginData: {
    accessToken: "",
    user: {
      id: "",
      firstName: "",
      lastName: "",
      email: "",
      balanceCents: 0
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
        user: {
          id: "",
          firstName: "",
          lastName: "",
          email: "",
          balanceCents: 0
        }
      };
      return { ...state, loginData: {...state.loginData, user: {...state.loginData.user}}};

    case ActionType.USER_LOGIN_SET_ERROR:
      state.error = action.payload;
      return { ...state };

    case ActionType.USER_LOGIN_SET_LOADING:
      state.loading = action.payload;
      return {...state};

    case ActionType.USER_SET_BALANCE_CENTS:
      state.loginData.user.balanceCents = action.payload;
      return {...state, loginData: {...state.loginData, user: {...state.loginData.user}}}

    case ActionType.USER_SET_NEW_DATA:
      state.loading = false;
      state.error = null;
      state.loginData.user = {
        ...state.loginData.user,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        email: action.payload.email
      };
      return { ...state, loginData: {...state.loginData, user: {...state.loginData.user}}};

    default:
      return state;
  }
};

export default reducer;