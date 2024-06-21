import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentBeerType: "ale",
};

export const beerTypeSlice = createSlice({
    name: "beerType",
    initialState,
    reducers: {
        setType: (state, action) => {
            state.currentBeerType = action.payload;
            try {
                window.localStorage.setItem(
                    "currentBeerType",
                    state.currentBeerType
                );
            } catch (error) {
                console.error(error);
            }
        },
    },
});

export default beerTypeSlice.reducer;
export const { setType } = beerTypeSlice.actions;
