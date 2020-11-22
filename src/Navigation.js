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

    const showDemandNav = () => {
        dispatch ({
            type: "setShowDemand"
        })
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-dark">


            <a className="navbar-brand text-uppercase ml-4 text-white" href="#">Day list</a>
            <a className="navbar-brand text-uppercase ml-4 text-white" onClick={showDemandNav} href="#">Demand</a>
            <a className="navbar-brand text-uppercase ml-4 text-white" href="#">Macronutrients</a>
            <a className="navbar-brand text-uppercase ml-4 text-white" onClick={showProductsNav} href="#">Products</a>

        </nav>
    )
};