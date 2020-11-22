import React from "react";
import {SearchProducts} from "./SearchProduct";
import {Navigation} from "./Navigation";
import {ChosenProducts} from "./ChosenProducts";
import {CaloricDemand} from "./CaloricDemand";

export const App = () => {

  return (
      <>
      <Navigation/>
      <ChosenProducts/>
      <CaloricDemand/>
      </>
  )
};




