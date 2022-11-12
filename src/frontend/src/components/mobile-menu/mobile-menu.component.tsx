import React, { useEffect, useState } from "react";

// styles
import styles from "./mobile-menu.module.scss";

// SVGs
import SVGMobileMenuClose from "../../assets/svg/mobile_menu_close.svg";
import SVGMobileMenuOpen from "../../assets/svg/mobile_menu_open.svg";

// templates
import TemplateBasicModal from "../../modals/basic-modal/basic-modal.template";

// components
import NavMenu from "../nav-menu/nav-menu.component";

// interfaces
interface IMainMobileMenu {
  isLogged?: boolean;
}

const MobileMenu: React.FC<IMainMobileMenu> = ({
   isLogged
}) => {
  const [isMenuOpened, setIsMenuOpened] = useState<boolean>(false);

  return (
    <>
      <TemplateBasicModal
        onOutClick={() => setIsMenuOpened(false)}
        isOpened={isMenuOpened}
      >
        <div className={`
          ${styles.mobileMenu}
          ${isMenuOpened ? styles.opened : ""}
        `}>
          <NavMenu
            isLogged={isLogged}
          />
        </div>
      </TemplateBasicModal>
      <div
        className={styles.imgWrapper}
        onClick={() => setIsMenuOpened(prev => !prev)}
      >
        <img
          src={isMenuOpened ? SVGMobileMenuClose : SVGMobileMenuOpen}
          alt="menu-open-close-icon"
        />
      </div>
    </>
  );
};

export default MobileMenu;