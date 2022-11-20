// This template has menu

import React, { ReactNode, useContext } from "react";
import {RouteComponentProps, withRouter} from "react-router";
import {Helmet} from "react-helmet-async";

// styles
import styles from "./view.module.scss";

// components
import NavMenu from "../../components/nav-menu/nav-menu.component";
import MobileMenu from "../../components/mobile-menu/mobile-menu.component";

// hook
import useView from "./view.hook";

// context
import { IsMobileViewContext } from "../../providers/is-mobile-view-provide.component";

// interfaces
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
  useView(viewTitle, isLogged);
  const {isMobileView} = useContext(IsMobileViewContext);
  
  return (
    <>
      <Helmet>
        <title>{viewTitle} {appVersion}</title>
      </Helmet>
      <div className={`
        ${styles.app}
        ${isFullScreen ? styles.fullScreen : ""}
        ${isMobileView ? styles.mobileMenuView : ""}
      `}>
        <div className={`${styles.navMenuWrapper}`}>
        {
          !isMobileView ?
            <NavMenu
              isLogged={isLogged}
            />
          :
            <MobileMenu
              isLogged={isLogged}
            />
        }
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