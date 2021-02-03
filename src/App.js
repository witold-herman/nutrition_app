import React, {useState} from "react";
import {Navigation} from "./Navigation";
import {ChosenProducts} from "./ChosenProducts";
import "./styles.css"
import {DayList} from "./DayList";


export const App = () => {
    const [dayAdded, setDayAdded] = useState(false);

    const dayAddedParentCallback = demandChanged => {
        setDayAdded(demandChanged);
    };

    return (
        <>
            <Navigation/>
            <ChosenProducts dayAddedCallback = {dayAddedParentCallback}/>
            <DayList dayAdded={dayAdded}/>
        </>
    )
};




