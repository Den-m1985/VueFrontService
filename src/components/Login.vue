<script>
import axios from 'axios'
//import Error from './ErrorLogin.vue'
import { RouterLink } from 'vue-router'
export default {
  name: 'login_user',
  components: {
    //Error,
    RouterLink
  },
  data() {
    return {
      username: '',
      password: ''
      //error: ''
    }
  },
  methods: {
    async loginSubmit() {
      const data = {
        username: this.username,
        password: this.password
      }
      document.getElementById('buttonContent').style.display = 'none'
      document.getElementById('loadingSpinner').style.display = 'inline-block'

      try {
        // в файле axios.js пропиали путь localhost... чтоб не писать его много раз
        const responce = await axios.post('auth/api/login', data)
        console.log(responce)
        if (responce.status === 200) {
          this.data = responce.data
          // Извлечение токена из данных ответа
          const token = responce.data.accessToken
          localStorage.setItem('accessToken', token)
          localStorage.setItem('refreshToken', responce.data.refreshToken)

          // Декодирование JWT токена
          const base64Url = token.split('.')[1]
          const base64 = base64Url.replace('-', '+').replace('_', '/')
          // decode with Cirilic
          const decoder = new TextDecoder('utf-8')
          const decodedBase64 = decoder.decode(
            Uint8Array.from(atob(base64), (c) => c.charCodeAt(0))
          )
          const decodedPayload = JSON.parse(decodedBase64)
          //const decodedPayload = JSON.parse(window.atob(base64));
          //console.log('decodedPayload ' + decodedPayload)
          const username = JSON.stringify(decodedPayload)
          const parsedPayload = JSON.parse(username)
          const subValue = parsedPayload.sub

          // Сохранение имени пользователя в локальное хранилище
          localStorage.setItem('username', subValue)
          console.log('username ' + subValue)
          changeButton()
          this.$router.push('/')
        } else {
          // Unexpected response status
          changeButton()
          console.error(`Unexpected response status: ${responce.status}`)
        }
      } catch (error) {
        if (error.responce) {
          // Request made and server responded with a status code outside the 2xx range
          changeButton()
          console.error(`Error response status: ${error.responce.status}`)
          if (error.responce.status === 500) {
            // Server error
            document.getElementById('login-error').style.display = 'block'
            changeButton()
            console.error('Server error')
          }
        } else if (error.request) {
          // Request made but no response received
          changeButton()
          console.error('No response received')
        } else {
          // Error setting up the request
          changeButton()
          console.error('Error setting up the request')
          document.getElementById('server-error').style.display = 'block'
        }
      }
    }
  }
}
function changeButton() {
  var buttonContent = (document.getElementById('buttonContent').style.display = 'inline-block')
  var loadingSpinner = (document.getElementById('loadingSpinner').style.display = 'none')
}
</script>

<template>
  <div class="container mt-4">
    <h4>ВХОД В АККАУНТ</h4>
    <form @submit.prevent="loginSubmit">
      <div class="row mb-3">
        <div class="col-sm-1 col-form-label">ИМЯ:</div>
        <div class="col-sm-3">
          <!--<input type="text" name="username" class="form-control" />-->
          <input type="text" class="form-control" v-model="username" />
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-sm-1 col-form-label">ПАРОЛЬ:</div>
        <div class="col-sm-3">
          <!--<input type="password" name="password" class="form-control" />-->
          <input type="password" class="form-control" v-model="password" />
        </div>
      </div>
      <div class="row mt-4">
        <div class="col-sm-1 col-form-label"></div>
        <div class="col-sm-3">
          <button type="submit" class="btn btn-outline-primary" id="uploadButton">
            <span id="buttonContent">ВОЙТИ</span>
            <div
              id="loadingSpinner"
              class="spinner-border text-primary"
              role="status"
              style="display: none"
            >
              <span class="visually-hidden">Loading...</span>
            </div>
          </button>
        </div>
      </div>
    </form>
    <div id="login-error" style="display: none; color: red">ПОЛЬЗОВАТЕЛЬ НЕ НАЙДЕН</div>
    <div id="server-error" style="display: none; color: red">ОШИБКА С СЕРВЕРА</div>
  </div>
</template>
