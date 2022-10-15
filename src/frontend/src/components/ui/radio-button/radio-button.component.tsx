import React, {ChangeEvent} from "react";

// styles
import styles from "./radio-button.module.scss";

// interfaces
interface IRadioButton {
  name: string;
  value: string;
  checked?: boolean;
  label: string;
  handleChange: (name: string, value: string) => void;
  disabled?: boolean;
}

const RadioButton: React.FC<IRadioButton> = ({
  name, value, checked, label, handleChange, disabled
 }) => {

  return (
    <label className={`${styles.radioButton} ${disabled ? styles.disabledRadioButton : ""}`}>
      <input
        className={`${styles.input} ${disabled ? styles.disabled : ""}`}
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e.target.name, e.target.value)}
        disabled={disabled}
      />
      <p>{label}</p>
    </label>
  );
};

export default RadioButton;

