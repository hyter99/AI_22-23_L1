import React from "react";

// styles
import styles from "./error.module.scss";

// templates
import TemplateFullScreenView from "../../templates/full-screen-view/full-screen-view.template";

// components
import {Link} from "react-router-dom";

// interfaces
interface IViewError {
  appVersion: string;
}

const ViewError:React.FC<IViewError> = ({appVersion}) => {

  return (
    <TemplateFullScreenView appVersion={appVersion} viewTitle="Nie ma takiej strony">
      <div className={styles.error}>
        <p>Nie ma takiej strony.</p>
        <p className={styles.inline}>
          Wróć do<Link to="/">strony z akcjami</Link>.
        </p>
      </div>
    </TemplateFullScreenView>
  );
};

export default ViewError;