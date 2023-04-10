import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    searchValue: '',
    currentPage: 1,
    categoryId: 0,
    sort: {
        name: "popularity",
        sortProperty: "rating",
    }
}

export const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setCategoryId(state, action) {
            state.categoryId = action.payload
        },
        setSearchValue(state, action) {
            state.searchValue = action.payload
        },
        setSort(state, action) {
            state.sort = action.payload
        },
        setCurrentPage(state, action) {
            state.currentPage = action.payload
        },

        setFilters(state, action) {
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
                    sortProperty: "rating",
                }
            }

        }



    },
})
export const slectFilter = (state) => state.filterSlice
export const selectSort = (state) => state.filterSlice.sort



export const { setCategoryId, setSort, setCurrentPage, setFilters, setSearchValue } = filterSlice.actions

export default filterSlice.reducer