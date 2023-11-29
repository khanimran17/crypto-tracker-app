import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import CoinPage from './pages/CoinPage'
import Header from './components/Header'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(() => ({
  App: {
    backgroundColor: '#14161a',
    color: 'white',
    minHeight: '100vh'
  },
}))

const App = () => {
  const classes = useStyles()

  return (
    <div>
      <Router>
        <div className={classes.App}>
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/coins/:id' element={<CoinPage />} />
          </Routes>
        </div>
      </Router>
    </div>
  )
}

export default App