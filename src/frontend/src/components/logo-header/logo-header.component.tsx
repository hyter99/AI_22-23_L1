import React from "react";

// styles
import styles from "./logo-header.module.scss";

// components
import Logo from "../logo/logo.component";

// interfaces
interface ILogoHeader {
  title: string;
}

const LogoHeader:React.FC<ILogoHeader> = ({title}) => {

  return (
    <div className={styles.headerContainer}>
      <Logo size="normal"/>
      <div className={styles.title}>
        {title}
      </div>
    </div>
  );
};

export default LogoHeader;