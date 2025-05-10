import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './components/Login'
import { BrowserRouter } from "react-router-dom";
import Users from './components/Users'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
    <Users/>
    </BrowserRouter>
  )
}

export default App
