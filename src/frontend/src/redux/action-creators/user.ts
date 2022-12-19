import axios from "axios";
import {Dispatch} from "redux";

// types
import {ActionType} from "../action-types/user";
import {LoginActions} from "../actions/user";
import {ILogin} from "../data-types/user";

// data
import { environment } from "../../constants/environment-variables";

/* Remember! */
/* Axios throws an exception to the 'catch' block if it recognizes ANY error in request */
/* Fetch throws it to the catch block only if it can't reach the backend API (e.g. when the URL is wrong)
    - otherwise we have to check the 'response.status' code to know if it's a problem with request */
export const loginUser = (email: string, password: string) => {
  return async (dispatch: Dispatch<LoginActions>) => {
    /* UNCOMMENT WHEN LOGIN ISN'T DONE IN BACKEND API */
    // const loginResults: ILogin = {
    //   accessToken: "abc",
    //   user: {
    //     id: "a",
    //     firstName: "Maciej",
    //     lastName: "H",
    //     email: "test@gmail.com",
    //     balanceCents: 0
    //   }
    // };
    //
    // dispatch({
    //   type: ActionType.USER_SUCCESS,
    //   payload: loginResults
    // });
    /* END */

    /* UNCOMMENT WHILE LOGIN IS DONE IN BACKEND API */
    dispatch({
      type: ActionType.USER_REQUEST
    });

    try {
      const {data} = await axios.post(`${environment.backendUrl}/api/auth/login`, {
          email: email,
          password: password
        },{
        headers: {
            'Content-Type': 'application/json'
        }
      });

      const loginResults: ILogin = {
        accessToken: data.token ? data.token : "",
        user: {
          id: data.userId ? data.userId : "",
          firstName: data.name ? data.name : "",
          lastName: data.surname ? data.surname : "",
          email: data.email ? data.email : "",
          balanceCents: data.accountBalance ? data.accountBalance : 0
        }
      };

      dispatch({
        type: ActionType.USER_SUCCESS,
        payload: loginResults
      });
    } catch (err: any) {
      /* can read err data from backend API via: 'err.response.data' - it has corresponding 'message' field */
      //console.log("Błąd logowania:", err.response.data.message);
      dispatch({
        type: ActionType.USER_FAIL,
        payload: "Niepoprawne dane logowania"
      });
    }
    /* END */
  }
};

export const logoutUserLocal = () => {
  return (dispatch: Dispatch<LoginActions>) => {
    /* UNCOMMENT WHEN LOGOUT IS DONE IN BACKEND API */
    // await axios.post(`${environment.backendUrl}/api/auth/logout`, {
    //   userId: userId,
    //   token: accessToken
    // },{
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // });

    dispatch({
      type: ActionType.USER_LOGOUT
    });
  }
};

export const setLoginErrorMessageLocal = (state: string | null) => {
  return (dispatch: Dispatch<LoginActions>) => {
    dispatch({
      type: ActionType.USER_SET_ERROR,
      payload: state
    });
  }
};

export const setSuccessMessageLocal = (state: string | null) => {
  return (dispatch: Dispatch<LoginActions>) => {
    dispatch({
      type: ActionType.USER_SET_SUCCESS,
      payload: state
    });
  }
};

export const setLoadingLocal = (state: boolean) => {
  return (dispatch: Dispatch<LoginActions>) => {
    dispatch({
      type: ActionType.USER_SET_LOADING,
      payload: state
    });
  }
};

export const resetStatusLocal = () => {
  return (dispatch: Dispatch<LoginActions>) => {
    dispatch({
      type: ActionType.USER_RESET_STATUS
    });
  }
};

export const setLastViewLocal = (state: string) => {
  return (dispatch: Dispatch<LoginActions>) => {
    dispatch({
      type: ActionType.USER_SET_LAST_VIEW,
      payload: state
    });
  }
};

export const getBalanceCents = (accessToken: string, viewSet: string) => {
  return async (dispatch: Dispatch<LoginActions>) => {
    try {
      dispatch({
        type: ActionType.USER_REQUEST
      });
      
      const {data} = await axios.get(`${environment.backendUrl}/api/profile/wallet`, { // to change
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });
      
      dispatch({
        type: ActionType.USER_SET_BALANCE_CENTS,
        payload: {
          successMessage: "",
          newAmount: data.balanceCents ? data.balanceCents : 0, // to change (without condition checking)
          viewSet: viewSet
        }
      });
      
    } catch (err) {
      dispatch({
        type: ActionType.USER_FAIL,
        payload: "Nie udało się pobrać informacji o środkach"
      });
    }
  };
};

export const setBalanceCentsLocal = (newAmount: number) => {
  return (dispatch: Dispatch<LoginActions>) => {
      dispatch({
        type: ActionType.USER_SET_BALANCE_CENTS_LOCAL,
        payload: {
          newAmount: newAmount
        }
      });
  };
};

export const setUserDataLocal = (
    newFirstName: string,
    newLastName: string,
    newEmail: string | null
  ) => {
  return (dispatch: Dispatch<LoginActions>) => {
    dispatch({
      type: ActionType.USER_SET_NEW_DATA,
      payload: {
        userData: {
          firstName: newFirstName,
          lastName: newLastName,
          email: newEmail
        }
      }
    });
  };
};