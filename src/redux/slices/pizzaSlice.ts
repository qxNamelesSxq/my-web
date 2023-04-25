import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios';
import { act } from 'react-dom/test-utils';
import { RootState } from '../store';
import { Sort } from './filterSlice';




// type FetchPizzasArgs = {
//     sortBy:string;
//     order:string;
//     category:string;
//     search:string;
//     currentPage:string
// }

//Сокращенная форма, если все поля стринг и т.п 
// type FetchPizzasArgs = Record<string,string>







type Pizza = {
    id:string;
title:string;
price:number;
imageUrl:string;
sizes:number[];
types:number[];
rating:number
}

export type SearchPizzaParams = {
        sortBy:string,
        order:string,
        category:string,
        search:string,
        currentPage:string,
}



// First, create the thunk
export const fetchPizzas = createAsyncThunk<Pizza[],SearchPizzaParams>(
    'pizza/fetchPizzasStatus',
    async (params) => {
        const { sortBy,
            order,
            category,
            search,
            currentPage } = params
        const { data } = await axios.get<Pizza[]>(
            `https://6412fbee3b710647375b8736.mockapi.io/PizzaItems?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
        );

      

        return data;
    }
)
 export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error'
}

interface PizzaSliceState {
    items:Pizza[];
    status: Status
}

const initialState:PizzaSliceState = {
    items: [],
    status:Status.LOADING,//loading | success | error

}






export const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        // addItem(state, action) {
        //     state.items.push(action.payload)
        //     state.totalPrice = state.items.reduce((sum, obj) => {
        //         return obj.price + sum
        //     }, 0)
        // },
        setItems(state, action:PayloadAction<Pizza[]>) {
            state.items = action.payload
        },
    },
    extraReducers: (builder) =>{
        builder.addCase(fetchPizzas.pending,(state,action)=>{
            state.status = Status.LOADING
             state.items = []

        })
        builder.addCase(fetchPizzas.fulfilled,(state,action)=>{
            state.items = action.payload
            state.status = Status.SUCCESS

        })
        builder.addCase(fetchPizzas.rejected,(state,action)=>{
            state.status = Status.ERROR
            state.items = []

        })
    }
     

    
    // extraReducers: {
    //     [fetchPizzas.pending]: (state) => {
    //         state.status = 'loading'
    //         state.items = []

    //     },
    //     [fetchPizzas.fulfilled]: (state, action) => {
    //         state.items = action.payload
    //         state.status = 'success'

    //     },
    //     [fetchPizzas.rejected]: (state) => {
    //         state.status = 'error'
    //         state.items = []

    //     }

    // }

})
export const selectPizzaData = (state:RootState) => state.pizzaSlice
export const { setItems } = pizzaSlice.actions

export default pizzaSlice.reducer