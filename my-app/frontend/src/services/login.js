import axios from 'axios'
const baseUrl = '/api/login'

const getLoggedUser = () => {
  const user = window.localStorage.getItem('loggedUser')
  return JSON.parse(user)
}

const setLoggedUser = (user) => {
  window.localStorage.setItem('loggedUser', JSON.stringify(user))
}

const clearLoggedUser = (user) => {
  window.localStorage.removeItem('loggedUser')
}

const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

export default { login, getLoggedUser, setLoggedUser, clearLoggedUser }
