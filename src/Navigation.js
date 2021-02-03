import React, {useContext} from 'react';
import {NavigationContext} from "./NavigationContext";

export const Navigation = () => {
    const navContext = useContext(NavigationContext);
    const {dispatch} = navContext;


    const showProductsNav = () => {
        dispatch ({
            type: "setShowProducts"
        })
    };

    const showDayListNav = () => {
        dispatch ({
            type: "setShowDayList"
        })
    };

    return (
        <nav className="navbar text-center navbar-expand-lg navbar-light bg-dark sticky-top">
            <a className="navbar-brand text-uppercase ml-4 text-white" href="#" onClick={showDayListNav}>Day list</a>
            <a className="navbar-brand text-uppercase ml-4 text-white" onClick={showProductsNav} href="#">Products</a>
        </nav>
    )
};