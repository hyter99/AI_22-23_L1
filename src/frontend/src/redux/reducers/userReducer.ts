import { ActionType } from "../action-types/user";
import { LoginActions } from "../actions/user";
import { ILogin } from "../data-types/user";

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
    case ActionType.USER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        success: null //added
      };

    case ActionType.USER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        success: null, //added: could be some message from action.payload, but it is erased after login - so the set doesn't matter
        loginData: action.payload
      };

    case ActionType.USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: null //added
      };

    case ActionType.USER_LOGOUT:
      return {
        ...state,
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
        }
      };

    case ActionType.USER_SET_ERROR:
      return {
        ...state,
        error: action.payload
      };

    case ActionType.USER_SET_SUCCESS:
      return {
        ...state,
        success: action.payload
      };

    case ActionType.USER_SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };

    case ActionType.USER_RESET_STATUS:
      return {
        ...state,
        loading: false,
        error: null,
        success: null
      };
      
    case ActionType.USER_SET_LAST_VIEW:
      return {
        ...state,
        lastViewSet: action.payload
      };

    case ActionType.USER_SET_BALANCE_CENTS:
      console.log("WORKING for view:", action.payload.viewSet);
      // Can update on site change or every 10s on the same site
      if (action.payload.viewSet !== state.lastViewSet || (new Date().getTime() - state.lastTimeViewSet) > 10000) {
        //console.log("Update of balance with state.lastViewSet:", state.lastViewSet);
        return {
          ...state,
          loading: false,
          error: null,
          success: action.payload.successMessage, //added
          lastViewSet: action.payload.viewSet,
          lastTimeViewSet: new Date().getTime(),
          loginData: {
            ...state.loginData,
            user: {
              ...state.loginData.user,
              balanceCents: action.payload.newAmount
            }
          }
        };
      }
      return state;

    case ActionType.USER_SET_BALANCE_CENTS_LOCAL:
      /*BEFORE*/
      // state.loginData.user = {
      //   ...state.loginData.user,
      //   balanceCents: action.payload.newAmount
      // };
      // return { ...state }; //return { ...state, loginData: {...state.loginData, user: {...state.loginData.user}} }; //?
      /*END-BEFORE*/

      /*AFTER*/
      return {
        ...state,
        loginData: {
          ...state.loginData,
          user: {
            ...state.loginData.user,
            balanceCents: action.payload.newAmount
          }
        }
      }
      /*END-AFTER*/

    case ActionType.USER_SET_NEW_DATA:
      /*BEFORE*/
      // state.loginData.user = {
      //   ...state.loginData.user,
      //   firstName: action.payload.userData.firstName,
      //   lastName: action.payload.userData.lastName,
      //   email: action.payload.userData.email ?? state.loginData.user.email
      // };
      // return { ...state }; //return { ...state, loginData: {...state.loginData, user: {...state.loginData.user}} }; //?
      /*END-BEFORE*/
      
      /*AFTER*/
      return {
        ...state,
        loginData: {
          ...state.loginData,
          user: {
            ...state.loginData.user,
            firstName: action.payload.userData.firstName,
            lastName: action.payload.userData.lastName,
            email: action.payload.userData.email ?? state.loginData.user.email
          }
        }
      }
      /*END-AFTER*/
    default:
      return state;
  }
};

export default reducer;