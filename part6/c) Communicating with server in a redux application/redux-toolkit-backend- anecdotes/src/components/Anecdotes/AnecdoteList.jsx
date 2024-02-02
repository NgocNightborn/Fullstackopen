import { useDispatch, useSelector } from "react-redux"
import { voteAnecdote } from "../../reducers/anecdoteReducer"
import { setNotification } from "../../reducers/notificationReducer"

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(({anecdotes, filter}) => {
    return anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
  })

  const vote = (anecdote) => {
    console.log('vote', anecdote.id)
    dispatch(voteAnecdote(anecdote.id, anecdote.votes))
    dispatch(setNotification(`you voted ${anecdote.content}`, 5000))
  }
  return (
    <>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
        <div>
            {anecdote.content}
        </div>
        <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
        </div>
        </div>
      )}
    </>
  )
}

export default AnecdoteList