import { createSlice } from "@reduxjs/toolkit"

const filterSlide = createSlice({
    name: 'filter',
    initialState: '',
    reducers: {
        filterChange(state, action) {
            return action.payload
        }
    }
})

export const { filterChange } = filterSlide.actions

export default filterSlide.reducer