import React, {ReactElement} from "react";

// styles
import styles from "./message-box.module.scss";

// interfaces
interface IMessageBox {
  message: string;
  link?: ReactElement;
  wide?: boolean;
  isError?: boolean;
}

const MessageBox: React.FC<IMessageBox> = ({message, link, wide, isError}) => {

  return (
    <div className={`${styles.messageBox} ${wide ? styles.wide : ""} ${isError ? styles.colorRed : styles.colorGreen}`}>
      <p>{message}{link ? link : ""}</p>
    </div>
  )
};

export default MessageBox;