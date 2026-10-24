import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import feedReducer from './feedSlice'
import connectionReducer from './connectionSlice'
import requestsReducer from './requestsSlice'

export const store = configureStore({
    reducer: {
        user: userReducer,
        feed: feedReducer,
        connections: connectionReducer,
        requests: requestsReducer,
    }
})

// Infer the `RootState`, `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store