import axios from 'axios'
//import router from "../router/index"
//import { RouterLink } from 'vue-router'
//import router from './router'


const TOKEN_KEY = 'accessToken'
const REFRESH_TOKEN_KEY = 'refreshToken'

function updateAccessToken() {
  // Получение refreshToken из localStorage
  const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
  if (refreshToken === null || refreshToken === "null" || refreshToken === undefined) {
    this.$router.push('/login')
  }
  axios.post('/auth/api/token', { refreshToken })
  .then((response) => {
    const responseAccessToken = response.data.accessToken
    localStorage.setItem(TOKEN_KEY, responseAccessToken)
   
    return responseAccessToken
  })
  .catch((error) => {
    console.error(error)
    //router.push('/login')
    this.$router.push('/login')
    return Promise.reject(error)
  })
}

const api = axios.create()
//const api = axios.create({
//    baseURL: 'http://localhost:8765',
//    timeout: 10000,
//    headers: {
//      'Content-Type': 'application/json'
//    }
//  })

//start request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(TOKEN_KEY)
    console.log("token {}", token)
    if (token) {
      //config.headers.authorization = `Bearer ${localStorage.access_token}`
      config.headers.Authorization = `Bearer ${token}`

      const tokenPayload = JSON.parse(atob(token.split('.')[1]))
      const expiryTime = tokenPayload.exp * 1000 // Переводим из секунд в миллисекунды
      console.log("expiryTime {}", expiryTime)
      // попробовать такой метод:
      /*
      const tokenParts = token.split('.')
      const tokenExpiration = JSON.parse(atob(tokenParts[1])).exp
      const currentTime = Math.floor(Date.now() / 1000)
       if (tokenExpiration - currentTime < 60) {
      */
      // Сравниваем с текущим временем
      console.log("Date.now() {}", Date.now())
      console.log("Date.now() >= expiryTime {}", Date.now() >= expiryTime)
      if (Date.now() >= expiryTime) {
        const  newAccessToken = updateAccessToken();
        config.headers.Authorization = `Bearer ${newAccessToken}`
      }
    } else{
      updateAccessToken()
    }
    return config
  },
  (error) => {
    console.error(error)
    return Promise.reject(error)
  }
)

export default api