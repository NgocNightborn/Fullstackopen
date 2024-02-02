import notificationReducer from '../reducers/notificationReducer'
import anecdoteReducer from '/src/reducers/anecdoteReducer'
import filterReducer from '/src/reducers/filterReducer'
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
    reducer:{
      anecdotes: anecdoteReducer,
      filter: filterReducer,
      notification: notificationReducer
    }
})

export default store