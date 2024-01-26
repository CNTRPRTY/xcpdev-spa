import classes from "./Footer.module.css";

import {Link as LinkRouter, NavLink} from "react-router-dom";
import React from "react";

function FooterNavLink({linkTo = "", text = "", icon = <></>}) {
    return (
        <NavLink className={({isActive}) =>
            `${isActive ? classes.active : classes.link} flex flex-col items-center justify-center my-[0.7em]`}
                 as={LinkRouter} to={linkTo}>
            <div className={"flex items-center justify-center my-[0.2em]"}>{icon}</div>
            <div className={"flex items-center justify-center text-sm"}>{text}</div>
        </NavLink>
    );
}

export default FooterNavLink;