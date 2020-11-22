import React from 'react';
import ReactDOM from 'react-dom';
import {App} from "./App";
import 'bootstrap/dist/css/bootstrap.min.css';
import {ChosenProductsProvider} from "./ChosenProductsContext";
import {NavigationProvider} from "./NavigationContext";

ReactDOM.render(
    <NavigationProvider>
        <ChosenProductsProvider>
            <App/>
        </ChosenProductsProvider>
    </NavigationProvider>,
    document.getElementById('root')
);
