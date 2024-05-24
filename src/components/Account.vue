<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUser } from '../store/useUser'

const router = useRouter()
const { username, setUsername } = useUser()
const isLoggedIn = ref(false)
const isTokenExpired = ref(false)

function logout() {
  localStorage.removeItem('username')
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
  setUsername('АККАУНТ') // Reset the username in the state
  router.push('/login')
}
/*
onMounted(() => {
  if (isAccessTokenExpired()) {
    console.log('accessToken истек')
    updateAccessToken()
    isTokenExpired.value = true
    document.getElementById('logOutButton').style.display = 'none'
  } else {
    const storedUsername = localStorage.getItem('username')
    if (storedUsername) {
      setUsername(storedUsername)
      isLoggedIn.value = true

      document.getElementById('usernamePlaceholder').innerText = username
      document.getElementById('loginButton').style.display = 'none'
      document.getElementById('registerButton').style.display = 'none'
      document.getElementById('logOutButton').style.display = 'block'
    } else {
      document.getElementById('loginButton').style.display = 'block'
      document.getElementById('registerButton').style.display = 'block'
      //document.getElementById('logOutButton').style.display = 'none';
    }
  }
})
*/
</script>

<template>
  <div class="container mt-4">
    <h4 th:inline="text">Привет <span id="usernamePlaceholder"></span></h4>
    <div id="failServer" style="display: none; color: red">
      <h2>сервер не отвечает</h2>
    </div>
    <div class="mt-1">
      <button type="button" id="loginButton" class="btn btn-light mt-4">
        <RouterLink to="/login"> ВОЙТИ В АККАУНТ </RouterLink>
      </button>
    </div>
    <div class="mt-1">
      <button type="button" id="registerButton" class="btn btn-light mt-4">
        <RouterLink to="/register"> ЗАРЕГИСТРИРОВАТСЯ </RouterLink>
      </button>
    </div>
    <form @submit.prevent="logout">
      <div><input type="submit" id="logOutButton" value="ВЫЙТИ" /></div>
    </form>
  </div>
</template>
