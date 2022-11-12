import { useState, useEffect } from "react";

const useBackToTopButton = (elementId: string) => {
  const [isShowed, setIsShowed] = useState<boolean>(false);
  const [currElement, setCurrElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const element =
      document.getElementById(elementId) ?
        document.getElementById(elementId)
      :
        document.documentElement;
    setCurrElement(element);

    if (element) {
      const handleScroll = () => {
        let valToSet = false;
        if (element.scrollTop > 600) {
          valToSet = true;
        }
        setIsShowed(valToSet);
      };

      element.addEventListener("scroll", handleScroll);

      return () => {
        element.removeEventListener("scroll", handleScroll);
      };
    }
    else {
      return undefined;
    }
  },[]);

  return {
    isShowed,
    currElement
  };
};

export default useBackToTopButton;