import jwtDecode from 'jwt-decode'
import dayjs from 'dayjs'

const USER_INFO = 'userInfo'
const AUTH_TOKEN = 'access_token'
const REFRESH_TOKEN = 'refresh_token'
const IS_LOGGEDIN = 'isLoggedIn'

const localStorageService = {
  setAccessToken(token) {
    localStorage.setItem(AUTH_TOKEN, token)
  },
  getAccessToken() {
    return localStorage.getItem(AUTH_TOKEN)
  },
  isAccessTokenExpired() {
    return dayjs.unix(jwtDecode(this.getAccessToken()).exp).diff(dayjs()) < 1
  },
  removeAccessToken() {
    localStorage.removeItem(AUTH_TOKEN)
  },
  setRefreshToken(token) {
    localStorage.setItem(REFRESH_TOKEN, token)
  },
  getRefreshToken() {
    return localStorage.getItem(REFRESH_TOKEN)
  },
  isRefreshTokenExpired() {
    return dayjs.unix(jwtDecode(this.getRefreshToken()).exp).diff(dayjs()) < 1
  },
  removeRefreshToken() {
    localStorage.removeItem(REFRESH_TOKEN)
  },
  setUserInfo(userInfo) {
    localStorage.setItem(USER_INFO, JSON.stringify(userInfo))
  },
  getUserInfo() {
    return JSON.parse(localStorage.getItem(USER_INFO))
  },
  setIsLoggedIn(isLoggedIn) {
    localStorage.setItem(IS_LOGGEDIN, isLoggedIn)
  },
  getIsLoggedIn() {
    return localStorage.getItem(IS_LOGGEDIN)
  },
  removeUserInfo() {
    localStorage.removeItem(USER_INFO)
  },
  removeAuthInfo() {
    localStorage.removeItem(AUTH_TOKEN)
    localStorage.removeItem(REFRESH_TOKEN)
    localStorage.removeItem(USER_INFO)
    localStorage.removeItem(IS_LOGGEDIN)
  },
}

export default localStorageService
