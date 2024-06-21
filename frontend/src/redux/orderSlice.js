import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentOrder: "",
};

export const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        setOrder: (state, action) => {
            state.currentOrder = action.payload;
            try {
                window.localStorage.setItem("currentOrder", state.currentOrder);
            } catch (error) {
                console.error(error);
            }
        },
    },
});

export default orderSlice.reducer;
export const { setOrder } = orderSlice.actions;
