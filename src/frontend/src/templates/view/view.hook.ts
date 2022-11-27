import { useEffect } from "react";

// redux
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";

const useView = (viewTitle: string, isLogged?: boolean) => {
  const {accessToken} = useTypedSelector(state => state.login.loginData);
  const { getBalanceCents } = useActions();
  
  useEffect(() => {
    if (isLogged) {
      getBalanceCents(accessToken, viewTitle); /* UNCOMMENT WHEN ENDPOINT IS PREPARED */
    }
    
    // return () => {
    //   console.log("Unmounting component");
    // };
  },[]);

  return;
};

export default useView;