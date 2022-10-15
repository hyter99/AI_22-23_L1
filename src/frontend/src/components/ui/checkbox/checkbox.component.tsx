import React, {ChangeEvent} from "react";

// styles
import styles from "./checkbox.module.scss";

// interfaces
interface ICheckbox {
  name: string;
  value: string;
  checked?: boolean;
  label: string;
  handleChange: (name: string, value: string) => void;
  disabled?: boolean;
}

const Checkbox: React.FC<ICheckbox> = ({
    name, value, checked, label, handleChange, disabled
  }) => {

  return (
    <label className={`noSelect ${styles.container} ${disabled ? styles.disabledContainer : ""}`}>
      {label}
      <input
        className={disabled ? styles.disabledInput : ""}
        type="checkbox"
        name={name}
        value={value}
        checked={checked}
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e.target.name, e.target.checked ? e.target.value : "")}
        disabled={disabled}
      />
      <span className={`${styles.checkmark} ${disabled ? styles.disabledColors : ""}`}/>
    </label>
  );
};

export default Checkbox;