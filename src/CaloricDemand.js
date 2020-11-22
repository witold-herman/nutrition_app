import React, {useContext, useState} from 'react';
import {NavigationContext} from "./NavigationContext";

export const CaloricDemand = () => {
    const [caloricDemand, setCaloricDemand] = useState(0);
    const navContext = useContext(NavigationContext);

    const handleSetDemandClick = () => {
        setCaloricDemand(document.getElementById("demandInput").value)
    };

    return (
        <>
            {
                (navContext.state.demandNav === true) &&
                <>
                    <input id="demandInput"/>
                    <button onClick={handleSetDemandClick}>Set demand</button>
                    {caloricDemand}
                </>
            }
        </>
    );
};
