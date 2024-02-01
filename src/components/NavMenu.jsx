
import ThemeSwitcher from "./ThemeSwitcher";
import React from "react";
import HamburgerMenu from "./HamburgerMenu";
import MenuLinks from "./MenuLinks";

import SearchMenu from "./SearchMenu";

function NavMenu() {
  return (
      <>
          {/* Visible only in desktop view */}
          <nav className={"hidden sm:flex space-x-3"}>

              <MenuLinks styles={"flex flex-row items-center space-x-3"}/>
              <ThemeSwitcher/>
          </nav>

          {/* Visible only in mobile view */}
          <div className={"flex flex-row sm:hidden space-x-4 items-center"}>
            <SearchMenu/>
            <HamburgerMenu/>
          </div>
      </>

  )
}

export default NavMenu;