import axios from "axios";
import {Dispatch} from "redux";

// types
import {ActionType} from "../action-types/login";
import {LoginActions} from "../actions/login";
import {ILogin, INewUserData} from "../data-types/login";
import { useTypedSelector } from "../../hooks/useTypedSelector";

export const loginUser = (email: string, password: string) => {
  return async (dispatch: Dispatch<LoginActions>) => {
    /* UNCOMMENT WHEN LOGIN ISN'T DONE IN BACKEND API */
    // const loginResults: ILogin = {
    //   accessToken: "abc",
    //   user: {
    //     id: "a",
    //     firstName: "Maciej",
    //     lastName: "H",
    //     email: "test@gmail.com"
    //   }
    // };
    //
    // dispatch({
    //   type: ActionType.USER_LOGIN_SUCCESS,
    //   payload: loginResults
    // });

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
      // console.log("Błąd logowania:", err.message);
      dispatch({
        type: ActionType.USER_LOGIN_FAIL,
        payload: "Niepoprawne dane logowania"
      });
    }
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

export const setLoading = (state: boolean) => {
  return async (dispatch: Dispatch<LoginActions>) => {
    dispatch({
      type: ActionType.USER_LOGIN_SET_LOADING,
      payload: state
    });
  }
};

export const getBalanceCents = () => {
  return async (dispatch: Dispatch<LoginActions>) => {
    const {accessToken} = useTypedSelector(state => state.login.loginData);
    try {
      // @ts-ignore
      const {data} = await axios.get(`${import.meta.env.VITE_BACKED_URL}/api/wallet`, {
        headers: {
          // maybe bearer?
          'Content-Type': 'application/json'
        }
      });

      dispatch({
        type: ActionType.USER_SET_BALANCE_CENTS,
        payload: data.balanceCents ? data.balanceCents : 0
      });
    } catch (err) {
      dispatch({
        type: ActionType.USER_SET_BALANCE_CENTS,
        payload: 0
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
        payload: newUserData
      });
    } catch (err: any) {
      const mess: string = err.message ? err.message : "Nowe dane są niepoprawne";
      dispatch({
        type: ActionType.USER_LOGIN_FAIL,
        payload: mess
      });
    }
  };
};