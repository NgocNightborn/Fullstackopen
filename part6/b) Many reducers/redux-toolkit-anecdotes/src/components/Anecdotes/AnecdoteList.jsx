import { useDispatch, useSelector } from "react-redux"
import { voteAnecdote } from "../../reducers/anecdoteReducer"
import { votedNotification } from "../../reducers/notificationReducer"

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(({anecdotes, filter}) => {
    return anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
  })

  const vote = (id, content) => {
    console.log('vote', id)
    dispatch(voteAnecdote(id))
    dispatch(votedNotification(content))
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
            <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
        </div>
        </div>
      )}
    </>
  )
}

export default AnecdoteList