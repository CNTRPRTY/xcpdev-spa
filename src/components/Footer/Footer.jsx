import {BITCOIN_VERSION, COUNTERPARTY_VERSION, COUNTERPARTY_VERSION_ALT, COUNTERPARTY_VERSION_ALT_URL} from "../../api";
import React from "react";
import {Text} from "@tremor/react";

import FooterNavLink from "./FooterNavLink";
import {RxDashboard} from "react-icons/rx";
import {GrTransaction} from "react-icons/gr";
import {BiWallet} from "react-icons/bi";
import {FaRegMessage} from "react-icons/fa6";

function Footer() {
    return (
        <footer className={"z-20"}>

            {/* Visible only in mobile view */}
            <div className={"sm:hidden flex fixed bottom-0 left-0 w-screen justify-around items-center bg-slate-100 dark:bg-slate-800"}>
                <FooterNavLink linkTo="/" text="Data" icon={<RxDashboard/>}/>
                <FooterNavLink linkTo="/wallet" text="Wallet" icon={<BiWallet/>}/>
                <FooterNavLink linkTo="/messages" text="Messages" icon={<FaRegMessage/>}/>
                <FooterNavLink linkTo="/transactions" text="Transactions" icon={<GrTransaction/>}/>
            </div>

            {/* Visible in desktop and mobile view */}
            <div className={"flex flex-col md:flex-row items-center justify-center gap-2 m-6 mb-20"}>
                <Text className={"flex"}>[<a href={`https://github.com/CNTRPRTY/xcpdev`} target="_blank" rel="noreferrer">xcp.dev v1.1</a>]</Text>
                <Text className={"flex"}>[counterparty-lib v{COUNTERPARTY_VERSION}][<a href={COUNTERPARTY_VERSION_ALT_URL} target="_blank" rel="noreferrer">v{COUNTERPARTY_VERSION_ALT}</a>]</Text>
                <Text className={"flex"}>[Bitcoin Core v{BITCOIN_VERSION}]</Text>
            </div>

        </footer>
    );
}

export default Footer;