import { useEffect, useRef } from 'react'
import { handleLogin } from '../../services/auth/authSlice'
import './Login.scss'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { isLoggedIn, isLoading, isSuccess, isError, needToUpdate } =
    useSelector(state => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const loginHandler = e => {
    e.preventDefault()
    needToUpdate &&
      dispatch(
        handleLogin({
          username: emailRef.current.value,
          password: passwordRef.current.value,
        })
      )
  }
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/dashboard')
    }
  }, [isLoggedIn])

  return (
    <main className='flex justify-center items-center h-full'>
      <form onSubmit={loginHandler}>
        <label htmlFor='email' className='mr-3'>
          Email
        </label>
        <input
          type='text'
          id='email'
          className='border rounded px-2 py-1'
          ref={emailRef}
          autoComplete='off'
        />
        <br />
        <br />
        <label htmlFor='password' className='mr-3'>
          Password
        </label>
        <input
          type='password'
          id='password'
          className='border rounded px-2 py-1'
          ref={passwordRef}
          autoComplete='off'
        />
        <br />
        <br />
        <button
          type='submit'
          className='border rounded px-2 py-1 bg-lime-600 text-white hover:bg-lime-500 '
        >
          Submit
        </button>
      </form>
    </main>
  )
}

export default Login
