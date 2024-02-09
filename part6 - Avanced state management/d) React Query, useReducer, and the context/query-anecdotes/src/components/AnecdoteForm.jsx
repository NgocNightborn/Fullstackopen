import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { createAnecdote, getAnecdotes } from "../services/requests"
import { useNotificationDispatch } from "../context/NotificationContext"

const AnecdoteForm = () => {  

  const queryClient = useQueryClient()

  const notificationDispatch = useNotificationDispatch()

  const newAnecdoteMutation = useMutation({ 
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
    },
    onError: () => {
      notificationDispatch({type: 'ERROR'})
    }
  })

  const generateId = () => Number((Math.random() * 1000000)).toFixed(0)

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    const newAnecdote = {content, id: generateId(), votes: 0}
    newAnecdoteMutation.mutate(newAnecdote)
    notificationDispatch({ type: 'NEW_ANECDOTE', payload: newAnecdote })
    console.log('new anecdote')
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
