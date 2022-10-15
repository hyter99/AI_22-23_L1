import React from "react";

// styles
import styles from "./error.module.scss";

// templates
import TemplateView from "../../templates/view/view.template";

// interfaces
interface IViewError {
  appVersion: string;
}

const ViewError:React.FC<IViewError> = ({appVersion}) => {

  return (
    <TemplateView appVersion={appVersion} viewTitle="Nie ma takiej strony" hasNoMenu>
      <div className={styles.error}>
        Nie ma takiej strony
      </div>
    </TemplateView>
  );
};

export default ViewError;