import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    allBeers: [],
    totalBeers: 0,
    status: "idle",
    error: null,
};

export const fetchBeers = createAsyncThunk(
    "beers/fetchBeers",
    async ({ beerType, page, order, name }) => {
        const response = await axios.get(
            `http://localhost:3001/beer/${beerType}`,
            // `https://beer-town-server.onrender.com/beer/${beerType}`,
            {
                params: { page, order, name },
            }
        );

        return response.data;
    }
);

export const beerSlice = createSlice({
    name: "beers",
    initialState,
    reducers: {
        setStatus: (state) => {
            state.status = "idle";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBeers.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchBeers.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.allBeers = action.payload.beers;
                state.totalBeers = action.payload.totalBeers;
            })
            .addCase(fetchBeers.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
                state.totalBeers = 0;
                state.allBeers = [];
            });
    },
});

export default beerSlice.reducer;
export const { setStatus } = beerSlice.actions;
