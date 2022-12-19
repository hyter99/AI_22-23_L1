import React from "react";

// styles
import styles from "./nav-menu.module.scss";
import Logo from "../logo/logo.component";

// components
import { NavLink } from "react-router-dom";

// data
import { AuthenticatedNavItems, UnauthenticatedNavItems } from "./nav-menu.data";

// functions
import { CentsToString } from "../../functions/cents-to-string";

// redux
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";

// interfaces
interface INavMenu {
  isLogged?: boolean;
}

const NavMenu: React.FC<INavMenu> = ({isLogged}) => {
  const selectedNavItems = isLogged ? AuthenticatedNavItems : UnauthenticatedNavItems;
  const {balanceCents, firstName, lastName} = useTypedSelector(state => state.login.loginData.user);
  const {logoutUserLocal} = useActions();

  return (
    <div className={`${styles.container}`}>
      <div className={styles.logoWrapper}>
        <Logo size="small"/>
      </div>
      <div className={styles.content}>
        <div className={styles.navLinksContainer}>
          {
            selectedNavItems.map(item => (
              item.isLink ?
                <NavLink
                  key={item.id}
                  className={styles.navItem}
                  activeClassName={styles.active}
                  to={item.url}
                  exact={item.isExact}
                >
                  {item.name}
                </NavLink>
              :
                <div
                  key={item.id}
                  className={`noSelect ${styles.navItem}`}
                  onClick={() => logoutUserLocal()}
                >
                  {item.name}
                </div>
            ))
          }
        </div>
        <div className={styles.footerContainer}>
          {
            isLogged ?
              <div className={styles.infoWrapper}>
                <div className={styles.row}>
                  <p className={styles.name}>Zalogowany jako:</p>
                  <p className={styles.value}>{firstName} {lastName}</p>
                </div>
                <div className={styles.row}>
                  <p className={styles.name}>Stan konta:</p>
                  <p className={styles.value}>{`${CentsToString(balanceCents)} PLN`}</p>
                </div>
              </div>
            :
              null
          }
          <div className={styles.copyrightWrapper}>
            <p>Copyright &#169; L1</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavMenu;