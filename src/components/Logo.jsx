import {Link} from "react-router-dom";
import {Subtitle} from "@tremor/react";
import React from "react";

function Logo() {
  return (
      <div className={"flex flex-col flex-1"}>
          <Link to="/" className={"flex flex-row w-fit items-center"}>
              <div className={"text-black dark:text-neutral-400 text-3xl font-bold"}>xcp</div>
              <div className={"text-yellow-600 dark:text-yellow-600 text-3xl font-bold"}>.dev</div>
          </Link>
          <Subtitle className={"flex flex-row text-xs items-center font-bold"}>Counterparty Bitcoin
              Tools</Subtitle>
          {/* <h3>Counterparty Bitcoin data explorer</h3> */}
          {/* <h3>Counterparty Bitcoin explorer</h3> */}
          {/* <h3>Counterparty Bitcoin block explorer</h3> */}
      </div>
  );
}

export default Logo;