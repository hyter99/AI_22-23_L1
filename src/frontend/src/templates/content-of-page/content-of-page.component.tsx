import React, { ReactNode } from "react";

// styles
import styles from "./content-of-page.module.scss";

// interfaces
interface ITemplateContentOfPage {
  children: ReactNode;
}

const TemplateContentOfPage: React.FC<ITemplateContentOfPage> = ({children}) => {
  
  return (
    <div className={styles.contentOfPageContainer}>
      {children}
    </div>
  );
};

export default TemplateContentOfPage;