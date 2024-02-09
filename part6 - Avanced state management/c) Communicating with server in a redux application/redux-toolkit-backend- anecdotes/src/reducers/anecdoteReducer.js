import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '/src/services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    vote(state, action) {
      const id = action.payload
      return state.map(anecdote => anecdote.id === id ? {...anecdote, votes: anecdote.votes+1} : anecdote).sort((a, b) => b.votes - a.votes)
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes([...anecdotes].sort((a,b) => b.votes - a.votes)))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote = (id, votes) => {
  return async dispatch => {
    const votedAnecdote = await anecdoteService.vote(id, votes)
    dispatch(vote(votedAnecdote.id))
  }
}

export const { vote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export default anecdoteSlice.reducer