<script setup>
</script>

<template>
  <div class="container mt-4">
    <h4 th:inline="text">Привет <span id="usernamePlaceholder"></span></h4>
    <div id="failServer" style="display: none; color: red">
      <h2>сервер не отвечает</h2>
    </div>
    <div class="mt-1">
      <button type="button" id="loginButton" class="btn btn-light mt-4">
        <a href="/login">ВОЙТИ В АККАУНТ</a>
      </button>
    </div>
    <div class="mt-1">
      <button type="button" id="registerButton" class="btn btn-light mt-4">
        <a href="/register">ЗАРЕГИСТРИРОВАТСЯ</a>
      </button>
    </div>
    <form onsubmit="logout()">
      <div><input type="submit" id="logOutButton" value="ВЫЙТИ" /></div>
    </form>
  </div>
</template>
