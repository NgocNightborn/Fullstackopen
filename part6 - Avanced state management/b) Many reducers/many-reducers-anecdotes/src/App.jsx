import AnecdoteForm from './components/Anecdotes/AnecdoteForm'
import AnecdoteList from './components/Anecdotes/AnecdoteList'
import Filter from './components/Filter/Filter'

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App