import { createSlice } from "@reduxjs/toolkit";
import type { IFeed } from "./types";

const initialState: IFeed[] | null = null;
const feedSlice = createSlice({
    name: 'feed',
    initialState,
    reducers: {
        setFeed: (_state, action: { payload: IFeed[] | null }) => action.payload
    }
});

export const { setFeed } = feedSlice.actions;
export default feedSlice.reducer;