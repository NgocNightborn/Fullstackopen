import { useDispatch } from "react-redux";
import { setNotification } from "../../reducers/notificationReducer";
import { createAnecdote } from "../../reducers/anecdoteReducer";

const AnecdoteForm = () => {

  const dispatch = useDispatch()

  const addAnecdote = async (e) => {
      e.preventDefault()
      const content = e.target.anecdote.value
      e.target.anecdote.value = ''
      dispatch(createAnecdote(content))
      dispatch(setNotification(`anecdote '${content}' created`, 5000))
    }
  return (
      
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
          <div><input name="anecdote" /></div>
          <button>create</button>
      </form>
    </>
  )
}

export default AnecdoteForm