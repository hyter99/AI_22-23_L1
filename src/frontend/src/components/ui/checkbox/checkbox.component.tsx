import React, {ChangeEvent} from "react";

// styles
import styles from "./checkbox.module.scss";

// interfaces
interface ICheckbox {
  name: string;
  value: string;
  checked?: boolean;
  label: string;
  labelColor: "white" | "black";
  handleChange: (name: string, value: string, checked: boolean) => void;
  isError?: boolean;
  disabled?: boolean;
}

const Checkbox: React.FC<ICheckbox> = ({
    name, value, checked, label, labelColor, handleChange, isError, disabled
  }) => {

  return (
    <label className={`
      noSelect
      ${styles.container}
      ${disabled ? styles.disabledContainer : ""}
      ${isError ? styles.error : ""}
      ${labelColor === "black" ? styles.black : ""}
    `}>
      {label}
      <input
        className={disabled ? styles.disabledInput : ""}
        type="checkbox"
        name={name}
        value={value}
        checked={checked}
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e.target.name, e.target.value, e.target.checked)}
        disabled={disabled}
      />
      <span className={`${styles.checkmark} ${disabled ? styles.disabledColors : ""}`}/>
    </label>
  );
};

export default Checkbox;