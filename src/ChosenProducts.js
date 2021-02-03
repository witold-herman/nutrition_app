import React, {useContext, useEffect, useState} from 'react';
import {SearchProducts} from "./SearchProduct";
import {NavigationContext} from "./NavigationContext";
import firebase from "firebase";

export const ChosenProducts = ({dayAddedCallback}) => {
    const [chosenProducts, setChosenProducts] = useState([]);
    const navContext = useContext(NavigationContext);
    const [totalEnergy, setTotalEnergy] = useState(0.00);
    const [totalProtein, setTotalProtein] = useState(0.00);
    const [totalFat, setTotalFat] = useState(0.00);
    const [totalCarbs, setTotalCarbs] = useState(0.00);
    const [totalFiber, setTotalFiber] = useState(0.00);
    const [date, setDate] = useState();
    const [demand, setDemand] = useState(0);
    const [amounts, setAmounts] = useState([]);
    const [elementDeleted, setElementDeleted] = useState(false);
    const [dayAdded, setDayAdded] = useState(false)

    const parentAddChosenProductCallback = (chosenProduct, amount) => {
        setChosenProducts(chosenProducts.concat(chosenProduct));
        setAmounts(amounts.concat(amount))
    };

    const handleDemandChange = e => {
        setDemand(e.target.value)
    };

    const handleDateChange = (e) => {
        setDate(e.target.value)
    };

    const deleteElement = (e) => {
        chosenProducts.splice(e.target.id, 1);
        setElementDeleted(!elementDeleted);
    };

    const handleSaveDayClick = () => {
        chosenProducts.forEach(e => {
            let newObj = {
                category: `${e.category}`,
                protein: `${Number(e.nutrients.PROCNT).toFixed(2)}`,
                carbs: `${Number(e.nutrients.CHOCDF).toFixed(2)}`,
                fiber: `${Number(e.nutrients.FIBTG).toFixed(2)}`,
                fat: `${Number(e.nutrients.FAT).toFixed(2)}`,
                energy: `${Number(e.nutrients.ENERC_KCAL).toFixed(2)}`
            };
            firebase.firestore().collection("day-list").doc(`${date}`).set({})
                .then(() => firebase.firestore().collection("day-list").doc(`${date}`)
                    .collection("product-list").doc(`${e.label}`).set(newObj))
                .then(() => {
                    setChosenProducts([]);
                    setAmounts([]);
                })
        });
        firebase.firestore().collection("day-list").doc(`${date}`)
            .collection("caloric-demand").doc(`demand`).set({
            demand: +demand
        })
            .then(() => setDayAdded(!dayAdded))
    };

    useEffect(() => {
        dayAddedCallback(dayAdded)
    }, [dayAdded]);

    useEffect(() => {

        chosenProducts.forEach((e, index) => {
            setTotalEnergy(((e.nutrients.ENERC_KCAL * amounts[index]) + +totalEnergy).toFixed(2));
            setTotalProtein(((e.nutrients.PROCNT * amounts[index]) + +totalProtein).toFixed(2));
            setTotalFat(((e.nutrients.FAT * amounts[index]) + +totalFat).toFixed(2));
            setTotalCarbs(((e.nutrients.CHOCDF * amounts[index]) + +totalCarbs).toFixed(2));
            if (e.nutrients.FIBTG !== undefined) {
                setTotalFiber(((e.nutrients.FIBTG * amounts[index]) + +totalFiber).toFixed(2));
            }
        });
    }, [chosenProducts, elementDeleted]);

    return (
        <>
            {
                (navContext.state.productsNav === true) &&
                <>
                    {(chosenProducts.length > 0) &&
                    <>
                        <div style={{textAlign: "center"}}>
                            <h3>Products list</h3>
                        </div>
                        <div>
                            <table className='table table-bordered table-striped table-dark table-hover'>
                                <thead>
                                <tr>
                                    <td>#</td>
                                    <td>Image</td>
                                    <td>Name</td>
                                    <td>Category</td>
                                    <td>Amount</td>
                                    <td>Energy</td>
                                    <td>Protein</td>
                                    <td>Fat</td>
                                    <td>Carbs</td>
                                    <td>Fiber</td>
                                </tr>
                                </thead>
                                <tbody>
                                {chosenProducts.map((e, index) => {
                                    return (
                                        <tr>
                                            <td>{index + 1}</td>
                                            <td><img src={e.image} alt="Image unavailable"
                                                     style={{width: '60%', height: '40%'}}/></td>
                                            <td>{e.label}</td>
                                            <td>{e.category}</td>
                                            <td>{amounts[index]}</td>
                                            <td>{(Number(e.nutrients.ENERC_KCAL).toFixed(2) * amounts[index]).toFixed(2) + " kcal"}</td>
                                            <td>{(Number(e.nutrients.PROCNT).toFixed(2) * amounts[index]).toFixed(2) + " g"}</td>
                                            <td>{(Number(e.nutrients.FAT).toFixed(2) * amounts[index]).toFixed(2) + " g"}</td>
                                            <td>{(Number(e.nutrients.CHOCDF).toFixed(2) * amounts[index]).toFixed(2) + " g"}</td>
                                            <td>{(Number(e.nutrients.FIBTG).toFixed(2) * amounts[index]).toFixed(2) + " g"}</td>
                                            <td>
                                                <button className={"button-red"} id={`${index}`}
                                                        onClick={deleteElement}>Delete
                                                </button>
                                            </td>
                                        </tr>)
                                })
                                }
                                <tr>
                                    <td>Total</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td>{totalEnergy + " kcal"}</td>
                                    <td>{totalProtein + " g"}</td>
                                    <td>{totalFat + " g"}</td>
                                    <td>{totalCarbs + " g"}</td>
                                    <td>{totalFiber + " g"}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div style={{textAlign: "center"}}>
                            <input onChange={handleDateChange} type="date"/>
                            <input placeholder="Set caloric demand" onChange={handleDemandChange} type="number"/>
                            <button className={"button-green"} onClick={handleSaveDayClick}>
                                Save day
                            </button>
                        </div>
                    </>
                    }
                    <div style={{textAlign: "center", marginTop: "35px"}}>
                        <h3>Search products</h3>
                    </div>
                    <SearchProducts addChosenProductCallback={parentAddChosenProductCallback}/>
                </>
            }
        </>
    )
};