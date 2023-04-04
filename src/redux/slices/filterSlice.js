import { createSlice } from '@reduxjs/toolkit'

const initialState = {
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

export const { setCategoryId, setSort, setCurrentPage, setFilters } = filterSlice.actions

export default filterSlice.reducer