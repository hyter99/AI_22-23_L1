import {useEffect, useState} from "react";
import {useTypedSelector} from "../../hooks/useTypedSelector";

// utils
import isUserAuthenticated from "../../functions/is-user-authenticated";

const useRoot = () => {
  const {accessToken} = useTypedSelector(state => state.login.loginData); //const {accessToken, user: {roles: userRoles}}
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(isUserAuthenticated(accessToken));

  useEffect(() => {
    setIsUserLoggedIn(isUserAuthenticated(accessToken));
  },[accessToken]);

  return {isUserLoggedIn};
};

export default useRoot;