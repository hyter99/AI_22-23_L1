import React, {ChangeEvent} from "react";

// styles
import styles from "./input-field-filled.module.scss";

// interfaces
interface IInputFieldFilled {
  name: string;
  value: string;
  handleChange: (name: string, value: string) => void;
  disabled?: boolean;
}

const InputFieldFilled: React.FC<IInputFieldFilled> = ({name, value, disabled, handleChange}) => {

  return (
    <div className={styles.inputFieldFilled}>
      <input
        className={`${styles.input} ${disabled ? styles.disabled : ""}`}
        type="text"
        name={name}
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e.target.name, e.target.value)}
        disabled={disabled}
      />
    </div>
  );
};

export default InputFieldFilled;