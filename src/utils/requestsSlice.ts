import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IRequest } from "./types";

const initialState: IRequest[] | null = null as IRequest[] | null;

const requestsSlice = createSlice({
    name: 'requests',
    initialState: initialState as IRequest[] | null,
    reducers: {
        setRequests: (_state, action: PayloadAction<IRequest[] | null>) => action.payload,
        removeRequests: (state, action: PayloadAction<string>) => {
            if (!state) return null;
            return state.filter((request) => request._id !== action.payload);
        },
        updateRequests: (state, action: PayloadAction<IRequest>) => {
            if (!state) return null;
            return state.map((req) => (req._id === action.payload._id ? { ...req, ...action.payload } : req));
        }
    }
});

export const { setRequests, removeRequests, updateRequests } = requestsSlice.actions;
export default requestsSlice.reducer;