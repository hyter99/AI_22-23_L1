import React from "react";

// styles
import styles from "./nav-menu.module.scss";
import Logo from "../logo/logo.component";

// components
import { NavLink } from "react-router-dom";

// data
import { AuthenticatedNavItems, UnauthenticatedNavItems } from "./nav-menu.data";

// redux
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";

// interfaces
interface INavMenu {
  isLogged?: boolean;
}

const NavMenu: React.FC<INavMenu> = ({isLogged}) => {
  const selectedNavItems = isLogged ? AuthenticatedNavItems : UnauthenticatedNavItems;
  const {user: {id: userId}, accessToken} = useTypedSelector(state => state.login.loginData);
  const {logoutUser} = useActions();

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
                >
                  {item.name}
                </NavLink>
              :
                <div
                  key={item.id}
                  className={`${styles.navItem}`}
                  onClick={() => logoutUser(userId, accessToken)}
                >
                  {item.name}
                </div>
            ))
          }
        </div>
        <div className={styles.copyrightWrapper}>
          <p>Copyright &#169; L1</p>
        </div>
      </div>
    </div>
  );
};

export default NavMenu;