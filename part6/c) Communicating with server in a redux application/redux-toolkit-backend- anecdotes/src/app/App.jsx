import { useDispatch } from 'react-redux'
import AnecdoteForm from '../components/Anecdotes/AnecdoteForm'
import AnecdoteList from '../components/Anecdotes/AnecdoteList'
import Filter from '../components/Filter/Filter'
import Notification from '../components/Notification/Notification'
import { useEffect } from 'react'
import { initializeAnecdotes } from '../reducers/anecdoteReducer'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [])

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