import React, {createContext, useReducer} from "react";

const initialState = {
  chosenProducts: []
};

export const ChosenProductsContext = createContext(initialState);

export const {Provider} = ChosenProductsContext;

export const ChosenProductsProvider = ({children}, productToAdd) => {
    const [state, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case "addChosenProduct":
                initialState.chosenProducts.push(productToAdd);
                return ({...state});
            default:
                throw new Error()
        }
    }, initialState);


    return (
        <Provider value={{state, dispatch}}>
            {children}
        </Provider>
    )
};