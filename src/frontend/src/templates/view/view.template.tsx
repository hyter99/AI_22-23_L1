// This template has menu

import React, { ReactNode } from "react";
import {RouteComponentProps, withRouter} from "react-router";
import {Helmet} from "react-helmet-async";

// styles
import styles from "./view.module.scss";

/* TO DO */
// templates
//import TemplateTopMenu from "../top-menu/top-menu.template";

/* TO DO */
// components
//import UserMenu from "../top-menu/user-menu/user-menu.component";

// interface
interface ITemplateView extends RouteComponentProps<any> {
    children: ReactNode;
    viewTitle: string;
    appVersion: string;
}

const TemplateView: React.FC<ITemplateView> = ({
    children,
    viewTitle,
    appVersion
  }) => {

  return (
    <>
      <Helmet>
        <title>{viewTitle} {appVersion}</title>
      </Helmet>
      <div className={styles.app}>
        {/*HERE WILL BE NAV-MENU TEMPLATE WITH COMPONENT*/}
        {/*{*/}
        {/*    <TemplateTopMenu>*/}
        {/*      <UserMenu/>*/}
        {/*    </TemplateTopMenu>*/}
        {/*}*/}
        <div className={`backgroundImage ${styles.appContent}`}>
          {children}
          {/* Here can be footer - then make outer appContent div flex with column direction*/}
        </div>
      </div>
    </>
  );
};

export default withRouter(TemplateView);