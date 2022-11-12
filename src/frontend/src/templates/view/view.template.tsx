// This template has menu

import React, { ReactNode } from "react";
import {RouteComponentProps, withRouter} from "react-router";
import {Helmet} from "react-helmet-async";

// styles
import styles from "./view.module.scss";

// components
import NavMenu from "../../components/nav-menu/nav-menu.component";

// hook
import useView from "./view.hook";


// interface
interface ITemplateView extends RouteComponentProps<any> {
  children: ReactNode;
  viewTitle: string;
  appVersion: string;
  isLogged?: boolean;
  isFullScreen?: boolean;
}

const TemplateView: React.FC<ITemplateView> = ({
    children,
    viewTitle,
    appVersion,
    isLogged,
    isFullScreen
  }) => {
  useView(isLogged);

  return (
    <>
      <Helmet>
        <title>{viewTitle} {appVersion}</title>
      </Helmet>
      <div className={`${styles.app} ${isFullScreen ? styles.fullScreen : ""}`}>
        <div className={`${styles.navMenuWrapper}`}>
          <NavMenu isLogged={isLogged}/>
        </div>
        <div
          id="scrollableDiv"
          className={`backgroundImage ${styles.appContent}`}
        >
          {children}
        </div>
      </div>
    </>
  );
};

export default withRouter(TemplateView);