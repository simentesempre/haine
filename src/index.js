import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import Landing from './components/Landing'

import './index.css'

const render = (status) => {
  switch(status){
    case 'app':
      return <App />
    case 'landing':
      return <Landing />
    default:
      return <App />
  }
}

ReactDOM.render(
  render(process.env.REACT_APP_STATUS),
  document.getElementById('root')
)