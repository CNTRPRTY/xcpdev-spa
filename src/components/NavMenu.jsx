import {Link} from "react-router-dom";
import ThemeSwitcher from "./ThemeSwitcher";
import React from "react";
import HamburgerMenu from "./HamburgerMenu";

function NavMenu() {
  return (
      <>
          {/* Visible only in desktop view */}
          <nav className={"hidden sm:flex space-x-3 items-center"}>
              <Link to="/" className={"text-yellow-600 text-sm font-bold hover:text-yellow-700"}>DATA</Link>
              <Link to="/wallet" className={"text-yellow-600 text-sm font-bold hover:text-yellow-700"}>WALLET</Link>
              <Link to="/messages" className={"text-yellow-600 text-sm font-bold hover:text-yellow-700"}>MESSAGES</Link>
              <Link to="/transactions" className={"text-yellow-600 text-sm font-bold hover:text-yellow-700"}>TRANSACTIONS</Link>
              {/*<Link to="/blocks" className={"text-yellow-600 text-sm font-bold hover:text-yellow-700"}>BLOCKS</Link>*/}
              {/*<Link to="/" className={"text-yellow-600 text-sm font-bold hover:text-yellow-700"}>MEMPOOL</Link>*/}
              <ThemeSwitcher/>
          </nav>

          {/* Visible only in mobile view */}
          <HamburgerMenu/>
      </>

  )
}

export default NavMenu;