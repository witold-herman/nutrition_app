import React, {useState} from "react"

export const SearchProducts = () => {
    const [products, setProducts] = useState([]);
    const [productToSearch, setProductToSearch] = useState('');
    // const appId = 'cfef4933';
    // const appKey = 'a32c1e439168e2c756f068d94eaad535';

    // const clientSecret = 'e3e3468b4d0448fe855e31236fe8b795'
    // const clientId = '4681c4efc44e450da1fdfaa2eafc789c'

    const apiKey = "525672c7ebe3fe181f83ddfd5a5206f9";
    const apiId = "245e8e76"

    async function handleClick() {
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

    const handleSearchInput = (e) => {
        setProductToSearch(e.target.value)
    };

    return (
        <>
            <button onClick={() => handleClick()}>
                Fetch
            </button>
            <input onChange={handleSearchInput} type="text" placeholder="Search product"/>

            <table className='table table-bordered table-striped table-dark table-hover'>
                <thead>
                <tr>
                    <td>#</td>
                    <td>Image</td>
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
                {
                    (products.map(e => {
                        return (
                            <tr>
                                <td>{products.indexOf(e) + 1}</td>
                                <td><img src={e.food.image} alt="Image unavailable"/></td>
                                <td>{e.food.label}</td>
                                <td>{e.food.category}</td>
                                <td>{Number(e.food.nutrients.ENERC_KCAL).toFixed(2) + "kcal"}</td>
                                <td>{Number(e.food.nutrients.PROCNT).toFixed(2) + "g"}</td>
                                <td>{Number(e.food.nutrients.FAT).toFixed(2) + "g"}</td>
                                <td>{Number(e.food.nutrients.CHOCDF).toFixed(2) + "g"}</td>
                                <td>{Number(e.food.nutrients.FIBTG).toFixed(2) + "g"}</td>
                            </tr>
                        )
                    }))
                }
                </tbody>
            </table>
        </>
    )
};


// import React, {useState} from "react"
//
// export const SearchProducts = () => {
//     const [products, setProducts] = useState(["hi", "helo"]);
//     const [productToSearch, setProductToSearch] = useState('');
//     // const appId = 'cfef4933';
//     // const appKey = 'a32c1e439168e2c756f068d94eaad535';
//
//     // const clientSecret = 'e3e3468b4d0448fe855e31236fe8b795'
//     // const clientId = '4681c4efc44e450da1fdfaa2eafc789c'
//
//     const apiKey = "8cea3e91623048e7bd3c6c19f510311a"
//
//     async function handleClick() {
//         const r = await fetch("https://api.spoonacular.com/food/products/search?apiKey=" + apiKey + "&query=" + productToSearch + "&number=5", {
//             method: 'GET',
//             mode: 'cors',
//             cache: 'no-cache',
//         })
//             .then(res => res.json())
//             .then(data => console.log(data.products))
//             // .then(data => data.forEach(e => {
//             //     products.push(e)
//             // }))
//     }
//
//     const handleSearchInput = (e) => {
//         setProductToSearch(e.target.value)
//     };
//
//     return (
//         <>
//             <button onClick={() => handleClick()}>Click</button>
//             <input onChange={handleSearchInput} type="text" placeholder="Search product"/>
//             <button onClick={() => console.log(products)}>Show products</button>
//             <table>
//                 <thead>
//                 <tr>
//                     <td>Image</td>
//                     <td>Name</td>
//                 </tr>
//                 {
//                     (products.map(e => {
//                         return (
//                             <tr>
//                                 <td>Image</td>
//                                 <td>{e}</td>
//                             </tr>
//                         )
//                     }))
//                 }
//                 </thead>
//             </table>
//         </>
//     )
// };
