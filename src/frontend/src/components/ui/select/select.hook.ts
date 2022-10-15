import {useState, useEffect, useRef} from "react";

// interfaces
import {IOption} from "./select.types";

// hooks
import useOnClickOutside from "../../../hooks/useOnClickOutside.hook";

const useSelect = (value: string, options: IOption[]) => {
  const [isSelectOpened, setIsSelectOpened] = useState<boolean>(false);
  const refSelect = useRef<HTMLDivElement>(null);
  useOnClickOutside(refSelect, () => setIsSelectOpened(false));

  const toggleSelectOpened = () => {
    setIsSelectOpened(!isSelectOpened);
  };

  const translateValue = (strToTranslate: string): string => {
    const foundIndex = options.findIndex(option => option.value === strToTranslate);

    if (foundIndex !== -1) {
      return options[foundIndex].textToShow;
    }

    return strToTranslate;
  };

  return {isSelectOpened, setIsSelectOpened, toggleSelectOpened, translateValue, refSelect};
};

export default useSelect;