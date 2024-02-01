import {Link} from "react-router-dom";
import ThemeSwitcher from "./ThemeSwitcher";
import React from "react";
import HamburgerMenu from "./HamburgerMenu";
import MenuLinks from "./MenuLinks";

function NavMenu() {
  return (
      <>
          {/* Visible only in desktop view */}
          <nav className={"hidden sm:flex space-x-3"}>
              <MenuLinks styles={"flex flex-row items-center space-x-3"}/>
              <ThemeSwitcher/>
          </nav>

          {/* Visible only in mobile view */}
          <HamburgerMenu/>
      </>

  )
}

export default NavMenu;