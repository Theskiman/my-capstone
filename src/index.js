import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from "react-router-dom"
import './index.css'
import Library from './components/Library';






ReactDOM.render(
  <Router>
    <Library />
  </Router>
  , document.getElementById('root'))
