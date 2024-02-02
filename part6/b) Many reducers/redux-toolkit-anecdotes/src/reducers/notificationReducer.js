import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        votedNotification(state, action) {
            return `you voted '${action.payload}'`
        },
        createdNotification(state, action) {
            return `anecdote '${action.payload}' created`
        },
        clearNotification(state, action) {
            return ''
        }
    }
})

export const { votedNotification, createdNotification, clearNotification } = notificationSlice.actions

export default notificationSlice.reducer