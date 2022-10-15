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
    hasNoMenu?: boolean;
}

const TemplateView: React.FC<ITemplateView> = ({
    children,
    viewTitle,
    appVersion,
    hasNoMenu
  }) => {

  return (
    <>
      <Helmet>
        <title>{viewTitle} {appVersion}</title>
      </Helmet>
      {
        <div className={styles.app}>
          {/*{*/}
          {/*  !hasNoMenu ?*/}
          {/*    <TemplateTopMenu>*/}
          {/*      <UserMenu/>*/}
          {/*    </TemplateTopMenu>*/}
          {/*  :*/}
          {/*    null*/}
          {/*}*/}
          <div className={`${styles.appContent}`}>
            {children}
          </div>
          {/* Here can be footer */}
        </div>
      }
    </>
  );
};

export default withRouter(TemplateView);