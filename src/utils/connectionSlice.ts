import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IFeed } from "./types";

const initialState: IFeed[] | null = null as IFeed[] | null;

const connectionSlice = createSlice({
    name: 'connections',
    initialState: initialState as IFeed[] | null,
    reducers: {
        setConnections: (_state, action: PayloadAction<IFeed[] | null>) => action.payload,
        removeConnections: () => null,
        updateConnections: (state, action: PayloadAction<IFeed>) => {
            if (!state) return null;
            return state.map((conn) => (conn._id === action.payload._id ? { ...conn, ...action.payload } : conn));
        }
    }
});

export const { setConnections, removeConnections, updateConnections } = connectionSlice.actions;
export default connectionSlice.reducer;