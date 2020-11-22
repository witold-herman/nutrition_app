import React, {useContext, useEffect, useState} from 'react';
import {SearchProducts} from "./SearchProduct";
import {NavigationContext} from "./NavigationContext";

export const ChosenProducts = () => {
    const [chosenProducts, setChosenProducts] = useState([]);
    const navContext = useContext(NavigationContext);
    const [totalEnergy, setTotalEnergy] = useState(0.00);
    const [totalProtein, setTotalProtein] = useState(0.00);
    const [totalFat, setTotalFat] = useState(0.00);
    const [totalCarbs, setTotalCarbs] = useState(0.00);
    const [totalFiber, setTotalFiber] = useState(0.00);

    const parentAddChosenProductCallback = (chosenProduct) => {
        setChosenProducts(chosenProducts.concat(chosenProduct))
    };

    useEffect(() => {

        chosenProducts.forEach(e => {
            setTotalEnergy((e.nutrients.ENERC_KCAL + +totalEnergy).toFixed(2));
            setTotalProtein((e.nutrients.PROCNT + +totalProtein).toFixed(2));
            setTotalFat((e.nutrients.FAT + +totalFat).toFixed(2));
            setTotalCarbs((e.nutrients.CHOCDF + +totalCarbs).toFixed(2));
            if (e.nutrients.FIBTG !== undefined) {
                setTotalFiber((e.nutrients.FIBTG + +totalFiber).toFixed(2));
            }
            console.log(e.nutrients.FIBTG)
        });
        console.log("Total Updated")
    }, [chosenProducts]);

    return (
        <>
            {
                (navContext.state.productsNav === true) &&
                <>
                    {(chosenProducts.length > 0) &&
                    <div>
                        <table className='table table-bordered table-striped table-dark table-hover'>
                            <thead>
                            <tr>
                                <td>#</td>
                                {/*<td>Image</td>*/}
                                <td>Name</td>
                                <td>Category</td>
                                <td>Energy</td>
                                <td>Protein</td>
                                <td>Fat</td>
                                <td>Carbs</td>
                                <td>Fiber</td>
                            </tr>
                            </thead>
                            <tbody>
                            {chosenProducts.map(e => {
                                return (
                                    <tr>
                                        <td>{chosenProducts.indexOf(e) + 1}</td>
                                        {/*<td><img src={e.image} alt="Image unavailable"/></td>*/}
                                        <td>{e.label}</td>
                                        <td>{e.category}</td>
                                        <td>{Number(e.nutrients.ENERC_KCAL).toFixed(2) + " kcal"}</td>
                                        <td>{Number(e.nutrients.PROCNT).toFixed(2) + " g"}</td>
                                        <td>{Number(e.nutrients.FAT).toFixed(2) + " g"}</td>
                                        <td>{Number(e.nutrients.CHOCDF).toFixed(2) + " g"}</td>
                                        <td>{Number(e.nutrients.FIBTG).toFixed(2) + " g"}</td>
                                    </tr>)
                            })
                            }
                            <tr>
                                <td>Total</td>
                                {/*<td><img src={e.image} alt="Image unavailable"/></td>*/}
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
                    </div>}
                    <SearchProducts addChosenProductCallback={parentAddChosenProductCallback}/>
                </>
            }
        </>
    )
};