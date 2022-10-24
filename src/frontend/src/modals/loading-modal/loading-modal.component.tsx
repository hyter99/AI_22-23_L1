import React from "react";

// styles
import styles from "./loading-modal.module.scss";

// interfaces
interface ILoadingModal {
  message?: string;
}

const LoadingModal: React.FC<ILoadingModal> = ({message}) => {

  return (
    <div className={styles.loadingModal}>
      <div className="loader"/>
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