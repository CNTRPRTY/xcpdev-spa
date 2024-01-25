import {BITCOIN_VERSION, COUNTERPARTY_VERSION, COUNTERPARTY_VERSION_ALT, COUNTERPARTY_VERSION_ALT_URL} from "../api";
import React from "react";
import {Text} from "@tremor/react";

function Footer() {
  return (
      <div className={"flex flex-row w-full items-center justify-center mt-12 space-x-3"}>
          <Text>[<a href={`https://github.com/CNTRPRTY/xcpdev`} target="_blank">xcp.dev v1.1</a>]</Text>

          <Text>[counterparty-lib v{COUNTERPARTY_VERSION}][<a href={COUNTERPARTY_VERSION_ALT_URL}
                                                              target="_blank">v{COUNTERPARTY_VERSION_ALT}</a>]</Text>

          <Text>[Bitcoin Core v{BITCOIN_VERSION}]</Text>
          {/* [counterparty-lib v{COUNTERPARTY_VERSION}] in [Bitcoin Core v{BITCOIN_VERSION}] */}
          {/* [counterparty-lib v9.59] in [Bitcoin Core v0.21.1] */}
      </div>
  );
}

export default Footer;