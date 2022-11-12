import React, {ReactNode} from "react";

// styles
import styles from "./basic-modal.module.scss";

// interfaces
interface ITemplateBasicModal {
  children: ReactNode;
  onOutClick?: () => void;
  isOpened: boolean;
}

const TemplateBasicModal: React.FC<ITemplateBasicModal> = ({
    children,
    onOutClick,
    isOpened
  }) => {

  return (
    <div className={`
         ${styles.basicModal}
         ${isOpened ? styles.visible : ""}
      `}>
      <div
        className={`
           ${styles.background}
           ${onOutClick ? styles.cursorPointer : ""}
        `}
        onClick={() => {
          onOutClick && onOutClick();
        }}
      />
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
};

export default TemplateBasicModal;