import { configureStore, createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLoggedIn: false,
    isAdmin: false
}

export const authSlice = createSlice({
    name: 'authentication',
    initialState,
    reducers: {
        loggedUser(state) {
            state.isLoggedIn = true;
            state.isAdmin = false;
        },
        loggedAdmin(state) {
            state.isLoggedIn = true;
            state.isAdmin = true;
        },
        logUser(state, action) {
            state.isLoggedIn = true;
            state.isAdmin = action.payload === 'admin' ? true : false
        }
    }
});

export const authActions = authSlice.actions;
