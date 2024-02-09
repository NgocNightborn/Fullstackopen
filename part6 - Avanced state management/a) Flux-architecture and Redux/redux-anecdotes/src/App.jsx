import AnecdoteForm from './components/Anecdotes/AnecdoteForm'
import AnecdoteList from './components/Anecdotes/AnecdoteList'

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App