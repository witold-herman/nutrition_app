import React, {useContext, useState} from "react"
import {ChosenProducts} from "./ChosenProducts";
import {NavigationContext} from "./NavigationContext";

export const SearchProducts = (props) => {
    const [products, setProducts] = useState([]);
    const [productToSearch, setProductToSearch] = useState('');

    const apiKey = "525672c7ebe3fe181f83ddfd5a5206f9";
    const apiId = "245e8e76";

    async function handleClick() {
        if (productToSearch !== "") {
            await fetch('https://api.edamam.com/api/food-database/v2/parser?nutrition-type=logging&ingr='
                + productToSearch
                + '&nutrition-type&app_id='
                + apiId + '&app_key='
                + apiKey,
                {
                    method: 'GET',
                    mode: 'cors',
                    cache: 'no-cache',
                })
                .then(response => response)
                .then(data => data.json())
                .then(res => setProducts(res.hints))
        }
    }

    const handleSearchInput = (e) => {
        setProductToSearch(e.target.value)
    };

    const addProductToParent = (product, amount) => {
        if (amount !== "") {
            props.addChosenProductCallback(product, amount);
        } else {
            props.addChosenProductCallback(product, 1);
        }
    };

    const clearResults = () => {
        setProducts([])
    };

    return (
        <>
            <div style={{textAlign: "center"}}>
                <input style={{margin: "0 auto"}} onChange={handleSearchInput} type="text" placeholder="Search product"/>
                <button style={{margin: "0 auto"}} className={"button-green"} onClick={() => handleClick()}>
                    Fetch
                </button>
                <button style={{margin: "0 auto"}} className={"button-red"} onClick={clearResults}>Clear</button>
            </div>
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
                {
                    (products.map(e => {
                        return (
                            <tr>
                                <td>{products.indexOf(e) + 1}</td>
                                <td><img src={e.food.image} alt="Image unavailable"
                                         style={{width: '60%', height: '40%'}}/></td>
                                <td>{e.food.label}</td>
                                <td>{e.food.category}</td>
                                <td style={{width: '8%'}}><input type="number" id={`${e.food.label} + _amount`}
                                                                 style={{width: "100%"}} placeholder="amount"/></td>
                                <td>{Number(e.food.nutrients.ENERC_KCAL).toFixed(2) + "kcal"}</td>
                                <td>{Number(e.food.nutrients.PROCNT).toFixed(2) + "g"}</td>
                                <td>{Number(e.food.nutrients.FAT).toFixed(2) + "g"}</td>
                                <td>{Number(e.food.nutrients.CHOCDF).toFixed(2) + "g"}</td>
                                <td>{Number(e.food.nutrients.FIBTG).toFixed(2) + "g"}</td>
                                <td>
                                    <button className={"button-blue"}
                                            onClick={() => addProductToParent(e.food, document.getElementById(`${e.food.label} + _amount`).value)}>Add
                                        product
                                    </button>
                                </td>
                            </tr>
                        )
                    }))
                }
                </tbody>
            </table>
        </>
    )
};
