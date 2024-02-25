import { useState } from 'react'
import Header from './components/Header'
import Login from './components/Login';
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Register from './components/Register';
function App() {

  return (
    <BrowserRouter>
      <Header/>
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/register' element={<Register />} />
    </Routes>
     
    </BrowserRouter>
  )
}

export default App
