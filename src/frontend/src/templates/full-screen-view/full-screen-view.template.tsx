// This template hasn't got menu and it's 100% with and 100vh height

import React, { ReactNode } from "react";
import {RouteComponentProps, withRouter} from "react-router";
import {Helmet} from "react-helmet-async";

// styles
import styles from "./full-screen-view.module.scss";

// interface
interface ITemplateFullScreenView extends RouteComponentProps<any> {
  children: ReactNode;
  viewTitle: string;
  appVersion: string;
}

const TemplateFullScreenView: React.FC<ITemplateFullScreenView> = ({
     children,
     viewTitle,
     appVersion
   }) => {

  return (
    <>
      <Helmet>
        <title>{viewTitle} {appVersion}</title>
      </Helmet>
      <div className={`backgroundImage ${styles.appContent}`}>
        {children}
      </div>
    </>
  );
};

export default withRouter(TemplateFullScreenView);