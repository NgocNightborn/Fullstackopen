import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        updateNotification(state, action) {
            return action.payload
        },
        clearNotification(state, action) {
            return ''
        }
    }
})

export const setNotification = (message, timeout) => {
    return async dispatch => {
        dispatch(assignNotification(message))
        setTimeout(() => {
            dispatch(clearNotification())
        }, timeout)
    }
}

export const { assignNotification, clearNotification } = notificationSlice.actions

export default notificationSlice.reducer