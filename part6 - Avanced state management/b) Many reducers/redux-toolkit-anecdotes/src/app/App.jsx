import { useDispatch, useSelector } from 'react-redux'
import AnecdoteForm from '../components/Anecdotes/AnecdoteForm'
import AnecdoteList from '../components/Anecdotes/AnecdoteList'
import Filter from '../components/Filter/Filter'
import Notification from '../components/Notification/Notification'
import { clearNotification } from '../reducers/notificationReducer'
import { useEffect } from 'react'

const App = () => {
  const dispatch = useDispatch()
  const notification = useSelector(({notification}) => notification)

  const removeNotification = () => {
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }
  
  useEffect(removeNotification, [notification])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App