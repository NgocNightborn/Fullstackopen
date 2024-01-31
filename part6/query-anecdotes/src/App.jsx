import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdotes, voteAnecdote } from './services/requests'
import NotificationContext, { useNotificationDispatch } from './context/NotificationContext'
import { useContext, useEffect } from 'react'

const App = () => {

  const queryClient = useQueryClient()

  const [notification, notificationDispatch] = useContext(NotificationContext)

  const clearNotification = () => {
    setTimeout(() => {
      notificationDispatch({type: 'CLEAR'})
    }, 5000)
  }

  useEffect(clearNotification, [notification])

  const voteAnecdoteMutation = useMutation({
    mutationFn: voteAnecdote,
    onSuccess: (votedAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.map(anecdote => anecdote.id === votedAnecdote.id ? votedAnecdote : anecdote))
    }
  }) 

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: false
  })

  if (result.isLoading) {
    return <div>is loading...</div>
  }

  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div> 
  }

  const handleVote = (anecdote) => {
    console.log('vote')
    anecdote.votes += 1
    voteAnecdoteMutation.mutate(anecdote)
    notificationDispatch({type: 'VOTE', payload: anecdote})
  }

  const anecdotes = result.data


  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
