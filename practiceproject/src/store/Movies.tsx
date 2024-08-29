import { configureStore, createSlice } from '@reduxjs/toolkit'

import { MovieStore } from '../Models/Movie'

const initialState: MovieStore[] = []

export const movieSlice = createSlice({
    name: 'moviesCRUD',
    initialState,
    reducers: {
        create(state, action) {

            const newId = (state.length == 0) ? 1 : state[state.length - 1].id + 1
            action.payload.id = newId
            state.push(action.payload)
        },
        edit(state, action) {

            const existingMovie = state.findIndex(m => m.id == action.payload.id)
            action.payload.id = state[existingMovie].id

            state[existingMovie] = action.payload
        },
        delete(state, action) {
            const existingId = state.findIndex(m => m.id === action.payload.id)
            state = state.splice(existingId, 1)
        },
        addToCart(state, action) {
            const existingMovieIndex = state.findIndex(m => m.id === action.payload.id)
            if (existingMovieIndex === -1) {
                
                state.push({ ...action.payload, quantity: 1 })
                return
            }
            state[existingMovieIndex].quantity++
        },
        clearCart(state) {
            state = state.splice(0, state.length)
        },
        removeItemFromCart(state, action) {
            const existingMovieIndex = state.findIndex(m => m.id === action.payload.id)
            if (state[existingMovieIndex].quantity === 1) {
                state = state.splice(existingMovieIndex, 1)
                console.log(state)
            } else {
                state[existingMovieIndex].quantity--
            }
        }
    }
})

export const movieActions = movieSlice.actions;
