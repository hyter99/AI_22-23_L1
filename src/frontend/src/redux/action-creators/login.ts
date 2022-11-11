import axios from "axios";
import {Dispatch} from "redux";

// types
import {ActionType} from "../action-types/login";
import {LoginActions} from "../actions/login";
import {ILogin, INewUserData} from "../data-types/login";
import { useTypedSelector } from "../../hooks/useTypedSelector";

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
    //   type: ActionType.USER_LOGIN_SUCCESS,
    //   payload: loginResults
    // });
    /* END */

    /* UNCOMMENT WHILE LOGIN IS DONE IN BACKEND API */
    dispatch({
      type: ActionType.USER_LOGIN_REQUEST
    });

    try {
      // @ts-ignore
      const {data} = await axios.post(`${import.meta.env.VITE_BACKED_URL}/api/auth/login`, {
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
          balanceCents: data.balanceCents ? data.balanceCents : 0
        }
      };

      dispatch({
        type: ActionType.USER_LOGIN_SUCCESS,
        payload: loginResults
      });
    } catch (err: any) {
      /* can read err data from backend API via: 'err.response.data' - it has corresponding 'message' field */
      //console.log("Błąd logowania:", err.response.data.message);
      dispatch({
        type: ActionType.USER_LOGIN_FAIL,
        payload: "Niepoprawne dane logowania"
      });
    }
    /* END */
  }
};

export const logoutUser = () => {
  return async (dispatch: Dispatch<LoginActions>) => {
    /* UNCOMMENT WHEN LOGOUT IS DONE IN BACKEND API */
    // @ts-ignore
    // await axios.post(`${import.meta.env.VITE_BACKED_URL}/api/auth/logout`, {
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

export const setLoginErrorMessage = (state: string | null) => {
  return async (dispatch: Dispatch<LoginActions>) => {
    dispatch({
      type: ActionType.USER_LOGIN_SET_ERROR,
      payload: state
    });
  }
};

export const setSuccessMessage = (state: string | null) => {
  return async (dispatch: Dispatch<LoginActions>) => {
    dispatch({
      type: ActionType.USER_LOGIN_SET_SUCCESS,
      payload: state
    });
  }
};

export const setLoading = (state: boolean) => {
  return async (dispatch: Dispatch<LoginActions>) => {
    dispatch({
      type: ActionType.USER_LOGIN_SET_LOADING,
      payload: state
    });
  }
};

export const resetStatus = () => {
  return async (dispatch: Dispatch<LoginActions>) => {
    dispatch({
      type: ActionType.USER_LOGIN_RESET_STATUS
    });
  }
};

export const getBalanceCents = () => {
  return async (dispatch: Dispatch<LoginActions>) => {
    const {accessToken} = useTypedSelector(state => state.login.loginData);
    try {
      dispatch({
        type: ActionType.USER_LOGIN_REQUEST
      });

      // @ts-ignore
      const {data} = await axios.get(`${import.meta.env.VITE_BACKED_URL}/api/wallet`, { // to change
        headers: {
          // maybe bearer?
          'Content-Type': 'application/json'
        }
      });

      dispatch({
        type: ActionType.USER_SET_BALANCE_CENTS,
        payload: {
          successMessage: "",
          newAmount: data.balanceCents ? data.balanceCents : 0 // to change (without condition checking)
        }
      });
    } catch (err) {
      dispatch({
        type: ActionType.USER_LOGIN_FAIL,
        payload: "Nie udało się pobrać informacji o środkach"
      });
    }
  };
};

export const setBalanceCents = (newAmount: number) => {
  return async (dispatch: Dispatch<LoginActions>) => {
    const {accessToken} = useTypedSelector(state => state.login.loginData);
    try {
      dispatch({
        type: ActionType.USER_LOGIN_REQUEST
      });

      // @ts-ignore
      const {data} = await axios.post(`${import.meta.env.VITE_BACKED_URL}/api/wallet`, {
        amount: newAmount //to change
      },{
        headers: {
          // maybe bearer?
          'Content-Type': 'application/json'
        }
      });

      dispatch({
        type: ActionType.USER_SET_BALANCE_CENTS,
        payload: {
          successMessage: "",
          newAmount: data.balanceCents ? data.balanceCents : newAmount // to change (without condition checking)
        }
      });
    } catch (err) {
      dispatch({
        type: ActionType.USER_LOGIN_FAIL,
        payload: "Nie udało się dodać środków do konta"
      });
    }
  };
};

export const setUserData = (newFirstName: string, newLastName: string, newEmail: string) => {
  return async (dispatch: Dispatch<LoginActions>) => {
    dispatch({
      type: ActionType.USER_LOGIN_REQUEST
    });

    const {accessToken, user: {id: userID}} = useTypedSelector(state => state.login.loginData);
    try {
      // @ts-ignore
      const {data} = await axios.patch(`${import.meta.env.VITE_BACKED_URL}/api/profile/${userID}`, {
        name: newFirstName,
        surname: newLastName,
        email: newEmail
      },{
        headers: {
          // maybe bearer?
          'Content-Type': 'application/json'
        }
      });

      const newUserData: INewUserData = {
        firstName: newFirstName,
        lastName: newLastName,
        email: newEmail
      };

      dispatch({
        type: ActionType.USER_SET_NEW_DATA,
        payload: {
          successMessage: "Poprawnie zmieniono dane",
          userData: newUserData
        }
      });
    } catch (err: any) {
      const mess: string = err.message ? err.message : "Nowe dane są niepoprawne"; //err.response.data.message
      dispatch({
        type: ActionType.USER_LOGIN_FAIL,
        payload: mess
      });
    }
  };
};