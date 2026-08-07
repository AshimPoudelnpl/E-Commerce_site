import React from 'react'
import Header from './components/Header/Index'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'


function App() {
  return (
    <>
    <Header/>
    <main className=''>
      <Routes>
        <Route path="/" element={<Home/>} />
      </Routes>
    </main>
    </>
  )
}

export default App