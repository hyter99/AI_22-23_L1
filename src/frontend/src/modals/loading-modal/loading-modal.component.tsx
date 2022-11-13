import React from "react";

// styles
import styles from "./loading-modal.module.scss";

// interfaces
interface ILoadingModal {
  message?: string;
  small?: boolean;
  bgTransparent?: boolean;
}

const LoadingModal: React.FC<ILoadingModal> = ({
    message,
    small,
    bgTransparent
  }) => {

  return (
    <div className={`
      ${styles.loadingModal}
      ${bgTransparent ? styles.bgTransparent : ""}
    `}>
      <div className={`
        loader
        ${small ? "small" : ""}
      `}/>
      {
        message ?
          <div className={styles.message}>
            <p>{message}</p>
          </div>
        :
          null
      }
    </div>
  );
};

export default LoadingModal;