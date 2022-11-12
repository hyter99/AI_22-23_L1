import React from "react";
// styles
import styles from "./back-to-top-button.module.scss";

//SVGs
import SVGArrowDownV2 from "../../assets/svg/arrow_down_v2.svg";

// hooks
import useBackToTopButton from "./back-to-top-button.hook";

// interfaces
interface IBackToTopButton {
  elementId: string;
}

const BackToTopButton: React.FC<IBackToTopButton> = ({elementId}) => {
  const {isShowed, currElement} = useBackToTopButton(elementId);

  return (
    <div
      className={`
            ${styles.buttonWrap}
            ${isShowed ? styles.isShowed : ""}
         `}
      onClick={() => {
        if (currElement) {
          currElement.scrollTop = 0;
        }
      }}
      title="Idź do góry"
    >
      <img
        src={SVGArrowDownV2}
        alt="down-arrow"
      />
    </div>
  );
};

export default BackToTopButton;