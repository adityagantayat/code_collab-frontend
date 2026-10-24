import { createSlice } from "@reduxjs/toolkit";
import type { IFeed } from "./types";

const initialState: IFeed[] | null = null;
const feedSlice = createSlice({
    name: 'feed',
    initialState,
    reducers: {
        setFeed: (_state, action: { payload: IFeed[] | null }) => action.payload,
        updateFeed: (state, action: { payload: { userId: string } }) => {
            if (!state) return null;
            return state.filter((user) => user._id !== action.payload.userId);
        }
    }
});

export const { setFeed, updateFeed } = feedSlice.actions;
export default feedSlice.reducer;