import React from 'react'
import './Header.scss'
import { logout } from '../../../services/auth/authSlice'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }
  return (
    <nav className='flex justify-between'>
      <div className='logo'>ISR</div>
      <div className='cursor-pointer logout' onClick={handleLogout}>
        Logout
      </div>
    </nav>
  )
}

export default Header
