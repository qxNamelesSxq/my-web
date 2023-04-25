import { configureStore } from '@reduxjs/toolkit'

import filterSlice from './slices/filterSlice'
import cartSlice from './slices/cartSlice'
import pizzaSlice from './slices/pizzaSlice'
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore'
import { useDispatch } from 'react-redux'

export const store = configureStore({
    reducer: {
        filterSlice,
        cartSlice,
        pizzaSlice
    },
})


export type RootState = ReturnType <typeof store.getState>
export type AppDispatch = typeof store.dispatch
// export const useAppDispatch = () => useDispatch<AppDispatch>()