import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        addUser: (_state, action) => {
            return action.payload;
        },
        removeUser: () => {
            return null;
        },
        updateUser: (state, action) => {
            return { ...state, ...action.payload };
        }
    }
});

export const { addUser, removeUser, updateUser } = userSlice.actions;
export default userSlice.reducer;