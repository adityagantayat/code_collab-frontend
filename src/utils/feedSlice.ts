import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IFeed } from "./types";

const initialState: IFeed[] | null = null as IFeed[] | null;

const feedSlice = createSlice({
    name: 'feed',
    initialState: initialState as IFeed[] | null,
    reducers: {
        setFeed: (_state, action: PayloadAction<IFeed[] | null>) => action.payload,
        updateFeed: (state, action: PayloadAction<{ userId: string }>) => {
            if (!state) return null;
            return state.filter((user) => user._id !== action.payload.userId);
        }
    }
});

export const { setFeed, updateFeed } = feedSlice.actions;
export default feedSlice.reducer;