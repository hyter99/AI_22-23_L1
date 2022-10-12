import React from "react";

// styles
import styles from "./select.module.scss";

// SVGS
// @ts-ignore
import {ReactComponent as SVGArrowDown} from "../../../assets/svg/arrow_down.svg";

// hooks
import useSelect from "./select.hook";

// interface
import {IOption} from "./select.types";

interface ISelect {
  name: string;
  value: string;
  label?: string;
  placeholder: string;
  options: IOption[];
  isError?: boolean;
  errorMessage?: string;
  handleChange: (name: string, value: string) => void;
  disabled?: boolean;
  isExtended?: boolean;
}

const Select: React.FC<ISelect> = ({
    name, value, label, placeholder, options, isError, errorMessage, handleChange, disabled, isExtended
  }) => {

  const {isSelectOpened, setIsSelectOpened, toggleSelectOpened, translateValue, refSelect} = useSelect(value, options);

  // @ts-ignore
  return (
    <div className={styles.selectContainer}>
      {
        label ?
          <div className={styles.label}>
            <p>{label}</p>
          </div>
        :
          null
      }
      <div
        ref={refSelect}
        className={`${styles.select} ${isSelectOpened ? styles.openedSelect : ""} ${isError ? styles.error : ""} ${disabled ? styles.disabled : ""}`}
        onClick={!disabled ? toggleSelectOpened : () => undefined}
      >
        <p
          className={`noSelect ${value === "" ? styles.placeholder : ""}`}
        >
          {value !== "" ? translateValue(value) : placeholder}
        </p>
        <div
          className={styles.arrow}
        >
          <SVGArrowDown
            className={isSelectOpened ? styles.rotateUp : ""}
          />
        </div>
        {
          isSelectOpened ?
            <div
              className={`customScrollBar ${styles.options} ${isExtended ? styles.extended : ""}`}
            >
              <div className={styles.optionsScroll}>
                {
                  options.map(option =>
                    <div
                      key={option.value}
                      className={styles.option}
                      onClick={() => {
                        handleChange(name, option.value)
                        setIsSelectOpened(false);
                      }}
                    >
                      <p className="noSelect">{option.textToShow}</p>
                    </div>
                  )
                }
              </div>
            </div>
          :
            null
        }
      </div>
      <div className={styles.errorMessage}>
        {
          isError && errorMessage !== "" && !disabled ?
            <p>{errorMessage}</p>
          :
            null
        }
      </div>
    </div>
  );
};

export default Select;