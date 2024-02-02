import { createContext, useContext, useReducer } from "react";

const notificationReducer = (state, action) => {
    switch (action.type) {
        case 'NEW_ANECDOTE': {
            const { content } = action.payload
            return `anecdotes '${content}' added`
        }
        case 'VOTE': {
            const { content } = action.payload
            return `anecdotes '${content}' voted`
        }
        case 'CLEAR':
            return ''
        case 'ERROR':
            return 'too short anecdotes, must have length 5 or more'
        default:
            return state
    }
}

const NotificationContext = createContext()

export const useNotificationValue = () => {
    const notificationAndDispatch = useContext(NotificationContext)
    return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
    const notificationAndDispatch = useContext(NotificationContext)
    return notificationAndDispatch[1]
}

export const NotificationContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, '')
    
    return (
        <NotificationContext.Provider value={[notification, notificationDispatch]}>
            {props.children}
        </NotificationContext.Provider>
    )
}

export default NotificationContext

