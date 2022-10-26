import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Dashboard from './pages/dashboard'
import Login from './pages/login/Login'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ProtectedRoute from './routes/ProtectedRoute'

const App = () => {
  return (
    <div className='text-sm h-screen'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate to='/login' replace />} />
          <Route path='/login' element={<Login />} />
          <Route element={<Layout />}>
            <Route element={<ProtectedRoute />}>
              <Route path='/dashboard' element={<Dashboard />} />
            </Route>
          </Route>
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </div>
  )
}

export default App
