import axios from 'axios'
import { toast } from 'react-toastify'
import { API } from '../api.constant'
import { setAccessToken } from '../auth/authSlice'
import store from '../store'
import localStorageService from './localStorageService'

let accessToken = localStorageService.getAccessToken()
let refreshToken = localStorageService.getRefreshToken()

const baseUrl = API.baseUrl
const axiosInstance = axios.create({
  baseUrl,
  headers: { Authorization: `Bearer ${accessToken}` },
})

axiosInstance.interceptors.request.use(
  async function (request) {
    console.log('interceptors')
    if (!accessToken) {
      accessToken = localStorageService.getAccessToken()
      request.headers.Authorization = `Bearer ${accessToken}`
    }
    // decode access token and check token is expired
    // console.log("isExpired: " + isExpired)
    if (!localStorageService.isAccessTokenExpired()) return request

    // if access token is expired, get new access token by refresh token
    console.log('Token refreshing... ')
    if (localStorageService.isRefreshTokenExpired()) {
      localStorageService.removeAuthInfo()
      toast.error('Session Expired. Please Login to continue.', {
        autoClose: 2000,
      })
      setTimeout(() => {
        window.location.reload(false)
      }, 2000)
      return request
    }
    // if refresh token is not expired, then get new token from server with refresh token
    let newAccessTokenResponse = await axios.post(
      baseUrl + API.auth.refreshToken,
      {
        refresh: refreshToken,
      }
    )
    // set new access token in header
    request.headers.Authorization = `Bearer ${newAccessTokenResponse.data.access}`
    store.dispatch(setAccessToken(newAccessTokenResponse.data.access))
    return request
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

export default axiosInstance
