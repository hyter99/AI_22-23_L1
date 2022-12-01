import { ActionType } from "../action-types/login";
import { LoginActions } from "../actions/login";
import { ILogin } from "../data-types/login";

// interfaces
interface ILoginState {
  loading: boolean;
  error: string | null;
  success: string | null;
  loginData: ILogin;
  lastViewSet: string;
  lastTimeViewSet: number;
}

// initial state
const initialState: ILoginState = {
  loading: false,
  error: null,
  success: null,
  loginData: {
    accessToken: "",
    user: {
      id: "",
      firstName: "",
      lastName: "",
      email: "",
      balanceCents: 0
    }
  },
  lastViewSet: "",
  lastTimeViewSet: new Date().getTime()
};

const reducer = (state: ILoginState = initialState, action: LoginActions): ILoginState => {
  switch (action.type) {
    case ActionType.USER_LOGIN_REQUEST:
      state.loading = true;
      state.error = null;
      state.success = null; //added
      return { ...state };

    case ActionType.USER_LOGIN_SUCCESS:
      state.loading = false;
      state.error = null;
      state.success = null; //added: could be some message from action.payload, but it is erased after login - so the set doesn't matter
      state.loginData = action.payload;
      return { ...state, loginData: {...state.loginData, user: {...state.loginData.user}}};

    case ActionType.USER_LOGIN_FAIL:
      state.loading = false;
      state.error = action.payload;
      state.success = null; //added
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

    case ActionType.USER_LOGIN_SET_SUCCESS:
      state.success = action.payload;
      return { ...state };

    case ActionType.USER_LOGIN_SET_LOADING:
      state.loading = action.payload;
      return {...state};

    case ActionType.USER_LOGIN_RESET_STATUS:
      state.loading = false;
      state.error = null;
      state.success = null;
      state.lastViewSet = "";
      return {...state};
      
    case ActionType.USER_SET_LAST_VIEW_SET:
      state.lastViewSet = action.payload;
      return {...state};

    case ActionType.USER_SET_BALANCE_CENTS:
      console.log("WORKING for view:", action.payload.viewSet);
      if (action.payload.viewSet) {
        //can update on site change or every 10s on the same site
        //console.log(new Date().getTime() - state.lastTimeViewSet)
        if (action.payload.viewSet !== state.lastViewSet || (new Date().getTime() - state.lastTimeViewSet) > 10000) {
          console.log("Update of balance with state.lastViewSet:", state.lastViewSet);
          state.loginData.user.balanceCents = action.payload.newAmount;
          state.loading = false;
          state.error = null;
          state.success = action.payload.successMessage; //added
          state.lastViewSet = action.payload.viewSet;
          state.lastTimeViewSet = new Date().getTime();
          return { ...state, loginData: {...state.loginData, user: {...state.loginData.user}}};
        }
        return state;
      }
      else {
        console.log("Forced update of balance");
        state.loginData.user.balanceCents = action.payload.newAmount;
        state.loading = false;
        state.error = null;
        state.success = action.payload.successMessage; //added
        return { ...state, loginData: {...state.loginData, user: {...state.loginData.user}}};
      }

    case ActionType.USER_SET_NEW_DATA:
      state.loading = false;
      state.error = null;
      state.success = action.payload.successMessage; //added
      state.loginData.user = {
        ...state.loginData.user,
        firstName: action.payload.userData.firstName,
        lastName: action.payload.userData.lastName,
        email: action.payload.userData.email
      };
      return { ...state, loginData: {...state.loginData, user: {...state.loginData.user}}};

    default:
      return state;
  }
};

export default reducer;