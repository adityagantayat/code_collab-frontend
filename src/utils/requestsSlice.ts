import { createSlice } from "@reduxjs/toolkit";

const requestsSLice = createSlice({
    name: 'requests',
    initialState: null,
    reducers: {
        setRequests: (state, action) => action.payload,
        removeRequests: (state, action) => state.filter((request) => request._id !== action.payload),
        updateRequests: (state, action) => ({ ...state, ...action.payload })
    }
});

export const { setRequests, removeRequests, updateRequests } = requestsSLice.actions;
export default requestsSLice.reducer;