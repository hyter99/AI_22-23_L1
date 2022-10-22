import {useState, useEffect} from "react";

const useBackToTopButton = () => {
  const [isShowed, setIsShowed] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      let valToSet: boolean = false;

      if (document.documentElement.scrollTop > 600) {
        valToSet = true;
      }

      setIsShowed(valToSet);
    };

    document.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  },[]);

  return {isShowed};
};

export default useBackToTopButton;