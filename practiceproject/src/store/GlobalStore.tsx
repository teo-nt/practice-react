import { configureStore } from '@reduxjs/toolkit'

import { movieSlice } from '../store/Movies'
import { authSlice } from '../store/UserStore'

 export const store = configureStore({
    reducer: {
        movie: movieSlice.reducer,
        auth: authSlice.reducer
    }
})