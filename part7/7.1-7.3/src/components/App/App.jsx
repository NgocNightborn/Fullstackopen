import { useEffect, useState } from 'react'
import { Routes, Route, useMatch, useNavigate } from 'react-router-dom'
import CreateNew from '/src/components/Anecdotes/CreateNew'
import Menu from '/src/components/Menu/Menu'
import Footer from '/src/components/Footer/Footer'
import About from '/src/components/About/About'
import AnecdoteList from '/src/components/Anecdotes/AnectdoteList'
import ViewOne from '/src/components/Anecdotes/ViewOne'
import Notification from '/src/components/Notification/notification'




const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState('')

  const navigate = useNavigate()

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification(`a new anecdote ${anecdote.content} created!`)
    navigate('/')
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  const clearNotification = () => {
    setTimeout(() => {
      setNotification('')
    },5000)
  }

  useEffect(clearNotification, [notification])

  const match = useMatch('/anecdotes/:id')
  const anecdote = match ? anecdotes.find(anecdote => anecdote.id === Number(match.params.id)) : null

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      {notification && <Notification notification={notification} /> }
      <Routes>
        <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route path="/create" element={<CreateNew addNew={addNew} />} />
        <Route path="/about" element={<About />} />
        <Route path="/anecdotes/:id" element={<ViewOne anecdote={anecdote} />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
