import {Link} from "react-router-dom";
import React from "react";

function MenuLinks({styles}) {
  return (
    <div className={`${styles}`}>
        <Link to="/" className={"text-yellow-600 text-sm font-bold hover:text-yellow-700"}>DATA</Link>
        <Link to="/wallet" className={"text-yellow-600 text-sm font-bold hover:text-yellow-700"}>WALLET</Link>
        <Link to="/messages" className={"text-yellow-600 text-sm font-bold hover:text-yellow-700"}>MESSAGES</Link>
        <Link to="/transactions" className={"text-yellow-600 text-sm font-bold hover:text-yellow-700"}>TRANSACTIONS</Link>
        {/*<Link to="/blocks" className={"text-yellow-600 text-sm font-bold hover:text-yellow-700"}>BLOCKS</Link>*/}
        {/*<Link to="/" className={"text-yellow-600 text-sm font-bold hover:text-yellow-700"}>MEMPOOL</Link>*/}
    </div>
  );
}

export default MenuLinks;