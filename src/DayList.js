import React, {useContext, useEffect, useState} from 'react';
import firebase from "./firebase";
import {NavigationContext} from "./NavigationContext";
import {CaloricDemand} from "./CaloricDemand";

export const DayList = ({dayAdded}) => {
    const [dayList, setDayList] = useState([]);
    const [chosenDay, setChosenDay] = useState(
        <div>
        </div>
    );
    const [totalNutrients, setTotalNutrients] = useState([0, 0, 0, 0, 0]);
    const [dayToShow, setDayToShow] = useState([]);
    const navContext = useContext(NavigationContext);
    const [dayDemand, setDayDemand] = useState("0");
    const [chosenDate, setChosenDate] = useState("");
    const [elementDeleted, setElementDeleted] = useState(false);
    const [dayClicked, setDayClicked] = useState(false);
    const [demandChanged, setDemandChanged] = useState(false);

    useEffect(() => {
        let posts = [];
        firebase.firestore().collection("day-list").get()
            .then(response => response.forEach(doc => posts.push([doc.data(), doc.id])))
            .then(() => setDayList(posts))
            .then(() => setChosenDate(posts[posts.length - 1][1]))
    }, [elementDeleted, dayAdded]);

    const deleteElement = (e) => {
        firebase.firestore().collection("day-list").doc(`${document.getElementById("dropdown-select").value}`)
            .collection("product-list").doc(`${dayToShow[0][e.target.id][1]}`).delete();
        dayToShow[0].splice(e.target.id, 1);
        setElementDeleted(!elementDeleted);
    };

    const handleDateChanged = () => {
        setChosenDate(document.getElementById('dropdown-select').value)
    };

    const handleDayClick = () => {
        setDayClicked(!dayClicked)
    };

    const demandChangedCallback = demandChanged => {
        setDemandChanged(demandChanged);
    };

    useEffect(() => {
        if (chosenDate !== "") {
            let posts = [];
            let newArray = [0, 0, 0, 0, 0];
            firebase.firestore().collection("day-list").doc(`${chosenDate}`).get()
                .then(response => response.ref.collection("product-list").get())
                .then(res => {
                    res.forEach(e => posts.push([e.data(), e.id]));
                })
                .then(() => {
                    posts.forEach(element => {
                        newArray[0] += +element[0].energy
                        newArray[1] += +element[0].protein
                        newArray[2] += +element[0].fat
                        newArray[3] += +element[0].carbs
                        newArray[4] += +element[0].fiber
                    });
                    setTotalNutrients(newArray);
                })
                .then(() => {
                        setDayToShow([posts, document.getElementById("dropdown-select").value])
                    }
                );
            firebase.firestore().collection("day-list").doc(`${document.getElementById("dropdown-select").value}`)
                .collection("caloric-demand").doc("demand").get()
                .then(response => setDayDemand(response.data().demand))
        }
    }, [dayClicked, elementDeleted, demandChanged]);

    useEffect(() => {
        if (dayToShow[0] !== undefined) {
            setChosenDay(
                <div>
                    <h4>{`Chosen date: ${dayToShow[1]}`}</h4>
                    <table className='table table-bordered table-striped table-dark table-hover'>
                        <thead>
                        <tr>
                            <td>#</td>
                            <td>Name</td>
                            <td>Category</td>
                            <td>Energy</td>
                            <td>Protein</td>
                            <td>Fat</td>
                            <td>Carbs</td>
                            <td>Fiber</td>
                            <td>Delete</td>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            dayToShow[0].map((e, index) => {
                                return (
                                    <tr>
                                        <td>{index}</td>
                                        <td>{e[1]}</td>
                                        <td>{e[0].category}</td>
                                        <td>{e[0].energy}kcal </td>
                                        <td>{e[0].protein}g</td>
                                        <td>{e[0].fat}g </td>
                                        <td>{e[0].carbs}g </td>
                                        <td>{e[0].fiber}g</td>
                                        <td>
                                            <button className={"button-red"} id={index} onClick={deleteElement}>Delete</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                        <tr>
                            <td></td>
                            <td>Total: </td>
                            <td></td>
                            <td>{Number(totalNutrients[0]).toFixed(2)}kcal</td>
                            <td>{Number(totalNutrients[1]).toFixed(2)}g</td>
                            <td>{Number(totalNutrients[2]).toFixed(2)}g</td>
                            <td>{Number(totalNutrients[3]).toFixed(2)}g </td>
                            <td>{Number(totalNutrients[4]).toFixed(2)}g</td>
                            <td></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            )
        }
    }, [dayToShow, elementDeleted]);

    return (
        <>
            {navContext.state.dayListNav === true &&
            <>
                <div style={{textAlign: "center"}}>
                    <h3>Day list</h3>
                    <select onChange={handleDateChanged} id={'dropdown-select'}>
                        {dayList.map(e => {
                            return (
                                <option selected id={e[1]}>{e[1]}</option>
                            )
                        })}
                    </select>
                    <button className={"button-blue"} onClick={handleDayClick}>Show day</button>
                </div>
                {dayToShow.length !== 0 &&
                <>
                    {chosenDay}
                    <CaloricDemand demandChangedCallback={demandChangedCallback} date={chosenDate}
                                   totalKcal={Number(totalNutrients[0]).toFixed(2)} dayDemand={dayDemand}/>
                </>
                }
            </>
            }
        </>
    );
};