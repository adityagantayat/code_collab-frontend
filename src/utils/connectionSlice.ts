import { createSlice } from "@reduxjs/toolkit";

const connectionSLice = createSlice({
    name: 'connections',
    initialState: null,
    reducers: {
        setConnections: (state, action) => action.payload,
        removeConnections: () => null,
        updateConnections: (state, action) => ({ ...state, ...action.payload })
    }
})

export const { setConnections, removeConnections, updateConnections } = connectionSLice.actions;
export default connectionSLice.reducer;