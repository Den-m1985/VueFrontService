import axios from 'axios'

const TOKEN_KEY = 'accessToken'
const REFRESH_TOKEN_KEY = 'refreshToken'
const baseURL = 'http://localhost:8765'
//const baseURL = 'https://закупайумно.рф'

const api = axios.create()
api.defaults.baseURL = baseURL
axios.defaults.baseURL = baseURL

//start request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(TOKEN_KEY)
    if (token) {
      //config.headers.authorization = `Bearer ${localStorage.access_token}`
      config.headers.Authorization = `Bearer ${token}`

      const tokenPayload = JSON.parse(atob(token.split('.')[1]))
      const tokenTimeSec = tokenPayload.exp //in seconds
      //console.log('tokenTimeSec ', tokenTimeSec)
      const currentTimeSec = Math.floor(Date.now() / 1000)
      //console.log('currentTimeSec ', currentTimeSec)
      console.log('tokenTimeSec - currentTimeSec ', tokenTimeSec - currentTimeSec)
      if (tokenTimeSec - currentTimeSec < 10) {
        const newAccessToken = updateAccessToken()
        config.headers.Authorization = `Bearer ${newAccessToken}`
      }
    }
    return config
  },
  (error) => {
    console.error(error)
    return Promise.reject(error)
  }
)

function updateAccessToken() {
  console.log('api.js/function updateAccessToken()')
  const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY)
  if (refreshToken === null || refreshToken === 'null' || refreshToken === undefined) {
    this.$router.push('/login')
  }
  axios
    .post('/auth/api/token', { refreshToken })
    .then((response) => {
      const responseAccessToken = response.data.accessToken
      localStorage.setItem(TOKEN_KEY, responseAccessToken)

      return responseAccessToken
    })
    .catch((error) => {
      console.error(error)
      this.$router.push('/login')
      return Promise.reject(error)
    })
}

export default api
