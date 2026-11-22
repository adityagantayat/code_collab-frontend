import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IUser } from "./types";

const initialState: IUser | null = null as IUser | null;

export const userSlice = createSlice({
    name: 'user',
    initialState: initialState as IUser | null,
    reducers: {
        addUser: (_state, action: PayloadAction<IUser | null>) => {
            return action.payload;
        },
        removeUser: () => {
            return null;
        },
        updateUser: (state, action: PayloadAction<Partial<IUser>>) => {
            if (!state) return (action.payload as IUser) ?? null;
            return { ...state, ...action.payload };
        }
    }
});

export const { addUser, removeUser, updateUser } = userSlice.actions;
export default userSlice.reducer;