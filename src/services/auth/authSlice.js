import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import localStorageService from '../utils/localStorageService'
import { login } from './authApi'

export const handleLogin = createAsyncThunk(
  'auth/handleLogin',
  async (data, { rejectWithValue }) => {
    try {
      const response = await login(data.username, data.password)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    accessToken: '',
    refreshToken: '',
    isLoggedIn: false,
    isLoading: false,
    isSuccess: false,
    needToUpdate: true,
    isError: false,
    error: null,
  },
  reducers: {
    setNeedToUpdate: (state, action) => {
      state.needToUpdate = action.payload
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload
      localStorageService.setAccessToken(action.payload)
    },
    logout: state => {
      state.isLoggedIn = false
      localStorageService.removeAuthInfo()
    },
  },
  extraReducers: {
    [handleLogin.pending]: state => {
      state.isLoading = true
    },
    [handleLogin.fulfilled]: (state, action) => {
      state.accessToken = action.payload.access
      state.refreshToken = action.payload.refresh
      state.isLoggedIn = true
      state.needToUpdate = false
      state.isLoading = false
      state.isSuccess = true
      state.isError = false
      localStorageService.setAccessToken(action.payload.access) // change according to your api response
      localStorageService.setRefreshToken(action.payload.refresh) // change according to your api response
      localStorageService.setIsLoggedIn(true) // change according to your api response
    },
    [handleLogin.rejected]: (state, action) => {
      state.data = []
      state.isLoading = false
      state.needToUpdate = false
      state.isSuccess = false
      state.isError = true
      state.error = action
    },
  },
})

export const { setNeedToUpdate, setAccessToken, logout } = authSlice.actions

export default authSlice.reducer
