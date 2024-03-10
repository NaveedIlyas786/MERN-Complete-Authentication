import { useState } from 'react'
import Header from './components/Header'
import Login from './components/Login';
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Error from './components/Error';
import Context from './components/ContextProvider/Context';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function App() {

  

  return (
    <Context>

    <BrowserRouter>
      <Header/>
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/dash' element={<Dashboard />} />
      <Route path='*' element={<Error />} />
    </Routes>
      
    </BrowserRouter>
    </Context>
  )
}

export default App
