import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'


export enum SortPropertyEnum {
RATING_DESC = 'rating',
RATING_ASC = '-rating',
TITLE_DESC = 'title',
TITLE_ASC = '-title',
PRICE_DESC = 'price',
PRICE_ASC = '-price'

} 


export type Sort ={
    name: string;
 sortProperty:SortPropertyEnum
}




export interface FilterSliceState {
    searchValue: string;
    currentPage: number;
    categoryId:number;
    sort: Sort
}





const initialState:FilterSliceState = {
    searchValue: '',
    currentPage: 1,
    categoryId: 0,
    sort: {
        name: "popularity",
        sortProperty: SortPropertyEnum.RATING_DESC,
    }
}

export const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setCategoryId(state, action:PayloadAction<number>) {
            state.categoryId = action.payload
        },
        setSearchValue(state, action:PayloadAction<string>) {
            state.searchValue = action.payload
        },
        setSort(state, action:PayloadAction<Sort>) {
            state.sort = action.payload
        },
        setCurrentPage(state, action:PayloadAction<number>) {
            state.currentPage = action.payload
        },

        setFilters(state, action:PayloadAction<FilterSliceState>) {
            if (Object.keys(action.payload).length) {
                state.currentPage = Number(action.payload.currentPage)
                state.sort = action.payload.sort
                state.categoryId = Number(action.payload.categoryId)
            }
            else {
                state.currentPage = 1;
                state.categoryId = 0;
                state.sort = {
                    name: "popularity",
                    sortProperty:SortPropertyEnum.RATING_DESC
                }
            }

        }



    },
})
export const slectFilter = (state:RootState) => state.filterSlice
export const selectSort = (state:RootState) => state.filterSlice.sort



export const { setCategoryId, setSort, setCurrentPage, setFilters, setSearchValue } = filterSlice.actions

export default filterSlice.reducer