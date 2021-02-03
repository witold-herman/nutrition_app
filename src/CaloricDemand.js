import React, {useContext, useEffect, useState} from 'react';
import {NavigationContext} from "./NavigationContext";
import {buildStyles, CircularProgressbar} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import firebase from "firebase";

export const CaloricDemand = ({date, totalKcal, dayDemand, demandChangedCallback}) => {
    const [caloricDemand, setCaloricDemand] = useState(0);
    const [demandChanged, setDemandChanged] = useState(false);

    const handleDemandChange = (e) => {
        setCaloricDemand(e.target.value)
    };

    const handleSetDemandClick = (e) => {
        e.preventDefault();
        firebase.firestore().collection("day-list").doc(`${date}`)
            .collection("caloric-demand").doc(`demand`).set({
            demand: +caloricDemand
        })
            .then(() => setDemandChanged(!demandChanged))
    };

    useEffect(() => {
        demandChangedCallback(demandChanged)
    }, [demandChanged]);

    return (
        <>
            <>
                <div style={{width: "40%", margin: "5px auto", textAlign: "center"}}>
                    <CircularProgressbar value={(totalKcal / dayDemand) * 100}
                                         text={`${dayDemand}kcal`}/>
                    <h3>{((totalKcal / dayDemand) * 100).toFixed(2)}%</h3>
                    <h4>{totalKcal} / {dayDemand}</h4>
                    <form onSubmit={handleSetDemandClick}>
                        <input id="demandInput" type="number" onChange={handleDemandChange}
                               style={{margin: "5px auto", display: "block"}}/>
                        <button className={"button-green"} style={{margin: "0 auto", display: "block", width: '200px'}}>
                            Change demand
                        </button>
                    </form>
                </div>
            </>
        </>
    );
};
