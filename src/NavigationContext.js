import React, {createContext, useReducer} from "react";

const initialState = {
    dayListNav: false,
    productsNav: false,
};

export const NavigationContext = createContext(initialState);

export const {Provider} = NavigationContext;

export const NavigationProvider = ({children}) => {

    const [state, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case "setShowProducts":
                return ({...state, productsNav: !state.productsNav});
            case "setShowDayList":
                return ({...state, dayListNav: !state.dayListNav});
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