import {useEffect, useState} from "react";
import {useTypedSelector} from "../../hooks/useTypedSelector";

// utils
import IsUserAuthenticated from "../../functions/is-user-authenticated";

const useRoot = () => {
  const {accessToken} = useTypedSelector(state => state.login.loginData); //const {accessToken, user: {roles: userRoles}}
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(IsUserAuthenticated(accessToken));
  
  useEffect(() => {
    setIsUserLoggedIn(IsUserAuthenticated(accessToken));
  },[accessToken]);

  return {isUserLoggedIn};
};

export default useRoot;