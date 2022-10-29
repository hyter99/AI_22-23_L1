import React from "react";

// styles
import styles from "./logo.module.scss";

//SVGS
import SVGLoginImage from "../../assets/svg/stock-logo.svg";

interface ILogo {
  size: "normal" | "small";
}

const Logo:React.FC<ILogo> = ({size}) => {

  return (
    <div className={styles.container}>
      <div className={`${styles.inline} ${size === "small" ? styles.smallPadding : ""}`}>
        <img
          src={SVGLoginImage}
          alt="logo"
          className={`${styles.logo} ${size === "small" ? styles.smallLogo : ""}`}
        />
        <div className={`noSelect ${styles.text} ${size === "small" ? styles.smallText : ""}`}>
          <p>Giełda</p>
        </div>
      </div>
      <div className={styles.pad}/>
    </div>
  );
};

export default Logo;