import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentPage: 1,
};

export const pageSlice = createSlice({
    name: "page",
    initialState,
    reducers: {
        setPage: (state, action) => {
            state.currentPage = action.payload;
            try {
                window.localStorage.setItem("currentPage", state.currentPage);
            } catch (error) {
                console.error(error);
            }
        },
    },
});

export default pageSlice.reducer;
export const { setPage } = pageSlice.actions;
