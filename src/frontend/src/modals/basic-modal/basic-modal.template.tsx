import React, {ReactNode} from "react";

// styles
import styles from "./basic-modal.module.scss";

// interfaces
interface ITemplateBasicModal {
  children: ReactNode;
  onOutClick?: () => void;
}

const TemplateBasicModal: React.FC<ITemplateBasicModal> = ({
   children,
   onOutClick
  }) => {

  return (
    <div className={styles.basicModal}>
      <div
        className={styles.background}
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