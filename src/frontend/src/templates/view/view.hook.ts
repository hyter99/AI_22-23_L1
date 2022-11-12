import { useEffect } from "react";

// redux
import { useActions } from "../../hooks/useActions";

const useView = (isLogged?: boolean) => {
  const { getBalanceCents } = useActions();

  useEffect(() => {
    if (isLogged) {
      //console.log("I'm here!!");
      //getBalanceCents(); /* UNCOMMENT WHEN ENDPOINT IS PREPARED */
    }
  },[]);

  return {};
};

export default useView;