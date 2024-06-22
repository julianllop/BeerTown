import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    beers: [],
    status: "idle",
    error: null,
};

export const fetchBeers = createAsyncThunk(
    "beers/fetchBeers",
    async ({ beerType, page, order, name }, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                // `http://localhost:3001/beer/${beerType}`,
                `https://beer-town-server.onrender.com/beer/${beerType}`,
                {
                    params: { page, order, name },
                }
            );
            return response.data;
        } catch (error) {
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data);
            } else {
                return rejectWithValue({ message: error.message });
            }
        }
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
                state.beers = action.payload;
            })
            .addCase(fetchBeers.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload
                    ? action.payload.message
                    : action.error.message;
            });
    },
});

export default beerSlice.reducer;
export const { setStatus } = beerSlice.actions;
