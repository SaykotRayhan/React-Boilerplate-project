import localStorageService from '../services/utils/localStorageService'

const useAuth = () => {
  const isLoggedIn = localStorageService.getIsLoggedIn()
  return { isLoggedIn }
}

export default useAuth
