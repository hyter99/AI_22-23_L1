import React, { ChangeEvent, KeyboardEvent } from "react";

// styles
import styles from "./search-bar.module.scss";

// SVGs
import SVGMagnifier from "../../assets/svg/magnifier.svg";

// interfaces
interface ISearchBar {
  name: string;
  value: string;
  placeholder: string;
  handleChange: (name: string, value:string) => void;
  onSearchClick: () => void;
  isPaddingInsideLeft?: boolean;
}

const SearchBar: React.FC<ISearchBar> = ({
    name,
    value,
    handleChange,
    placeholder,
    onSearchClick,
    isPaddingInsideLeft
  }) => {

  return (
    <div className={styles.wrapper}>
      <input
        className={`
          ${styles.input}
          ${isPaddingInsideLeft ? styles.paddingLeft : ""}
        `}
        type="text"
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e.target.name, e.target.value)}
        onKeyPress={(e: KeyboardEvent<HTMLInputElement>) => {
          if (e.key === "Enter") {
            onSearchClick();
          }
        }}
      />
      <img
        className={`${styles.magnifier}`}
        src={SVGMagnifier}
        alt="magnifier"
        onClick={onSearchClick}
      />
    </div>
  );
};

export default SearchBar