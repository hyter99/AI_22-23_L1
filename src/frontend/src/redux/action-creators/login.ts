import axios from "axios";
import {Dispatch} from "redux";

// types
import {ActionType} from "../action-types/login";
import {LoginActions} from "../actions/login";
import {AdminLogin} from "../data-types/login";

export const loginUser = (email: string, password: string) => {
  return async (dispatch: Dispatch<LoginActions>) => {
    /* COMMENT WHILE LOGIN ISN'T DONE IN BACKEND API */
    const loginResults: AdminLogin = {
      accessToken: "abc",
      user: {
        id: "a",
        firstName: "Maciej",
        lastName: "H",
        email: "test@gmail.com"
      }
    };

    dispatch({
      type: ActionType.USER_LOGIN_SUCCESS,
      payload: loginResults
    });

    /* UNCOMMENT WHILE LOGIN IS DONE IN BACKEND API */
    // dispatch({
    //   type: ActionType.USER_LOGIN_REQUEST
    // });

    // try {
    //   @ts-ignore
    //   const {data} = await axios.post(`${import.meta.env.VITE_BACKED_URL}/api/auth/signin`, {
    //       email: email,
    //       password: password
    //     },{
    //     headers: {
    //         'Content-Type': 'application/json'
    //     }
    //   });
    //
    //   const loginResults: AdminLogin = {
    //     accessToken: data.token ? data.token : "",
    //     user: {
    //       id: data.id ? data.id : "",
    //       firstName: data.firstname ? data.firstname : "",
    //       lastName: data.lastname ? data.lastname : "",
    //       email: data.email ? data.email : ""
    //     }
    //   };
    //
    //   dispatch({
    //     type: ActionType.USER_LOGIN_SUCCESS,
    //     payload: loginResults
    //   });
    // } catch (err) {
    //   dispatch({
    //     type: ActionType.USER_LOGIN_FAIL,
    //     payload: "Niepoprawne dane logowania"
    //   });
    // }
  }
};

export const logoutUser = (userId: string, accessToken: string) => {
  return async (dispatch: Dispatch<LoginActions>) => {
    /* UNCOMMENT WHILE LOGOUT IS DONE IN BACKEND API */
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