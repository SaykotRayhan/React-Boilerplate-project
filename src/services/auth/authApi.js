import axios from 'axios'
import { API } from '../api.constant'

export async function login(username, password) {
  return await axios.post(API.baseUrl + API.auth.login, {
    username: username,
    password: password,
  })
}

export function registration(data) {
  axios
    .post(API.baseUrl + API.auth.registration, data)
    .then(response => {
      window.history.pushState()
    })
    .catch(error => {
      console.log(error)
    })
}
