import React from 'react'
import Header from './components/Header/Index'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'


function App() {
  return (
    <>
    <Header/>
    <Routes>
      <Route path="/" element={<Home/>} />
    </Routes>
    </>
  )
}

export default App