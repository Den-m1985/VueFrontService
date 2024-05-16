<script>
import axios from 'axios'
//import Error from './ErrorLogin.vue'
import { RouterLink } from 'vue-router'
export default {
  name: 'register',
  components: {
    //Error,
    RouterLink
  },
  data() {
    return {
      username: '',
      email: '',
      password: ''
      //error: ''
    }
  },
  methods: {
    async registerSubmit() {
      const data = {
        username: this.username,
        email: this.email,
        password: this.password
      }
      //console.log('data {}', data)
      document.getElementById('buttonContent').style.display = 'none'
      document.getElementById('loadingSpinner').style.display = 'inline-block'

      try {
        // в файле axios.js пропиали путь localhost... чтоб не писать его много раз
        const responce = await axios.post('auth/api/reg/register', data)
        console.log(`responce status: ${responce.status}`)
        console.log(responce)

        if (responce.status === 200) {
          this.data = responce.data
          changeButton()
          this.$router.push('/login')
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
          document.getElementById('registration-error').style.display = 'block'
        }
      }
    }
  }
}
function changeButton() {
  document.getElementById('buttonContent').style.display = 'inline-block'
  document.getElementById('loadingSpinner').style.display = 'none'
}
</script>

<template>
  <div class="container mt-4">
    <h4>РЕГИСТРАЦИЯ</h4>
    <form @submit.prevent="registerSubmit">
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
      <div class="row mb-3">
        <div class="col-sm-1 col-form-label">Email:</div>
        <div class="col-sm-3">
          <!--<input type="email" name="email" class="form-control" />-->
          <input type="email" class="form-control" v-model="email" />
        </div>
      </div>
      <div class="row mt-4">
        <div class="col-sm-1 col-form-label"></div>
        <div class="col-sm-3">
          <button type="submit" class="btn btn-outline-primary" id="uploadButton">
            <span id="buttonContent">ЗАРЕГИСТРИРОВАТЬ</span>
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
    <div class="row mt-4" id="registration-error" style="display: none; color: red">
      ОШИБКА! ЧТО-ТО ПОШЛО НЕ ТАК
    </div>
  </div>
</template>
