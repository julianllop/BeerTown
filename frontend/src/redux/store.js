import { configureStore } from "@reduxjs/toolkit";
import beerReducer from "./beerSlice";
import pageReducer from "./pageSlice";
import beerTypeReducer from "./beerTypeSlice";
import orderReducer from "./orderSlice";

export const store = configureStore({
    reducer: {
        beers: beerReducer,
        page: pageReducer,
        beerType: beerTypeReducer,
        order: orderReducer,
    },
});
