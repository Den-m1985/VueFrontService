<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="p-3 m-0 border-0 bd-example m-0 border-0">
    <ul class="nav justify-content-center">
      <li class="nav-item">
        <a class="nav-link" href="/">ГЛАВНАЯ</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/contact">КОНТАКТЫ</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/about">О ПРОЕКТЕ</a>
      </li>
      <!--<li class="nav-item">
                <a class="nav-link" href="/admin">АДМИНКА</a>
            </li>-->
      <li class="nav-item">
        <a class="nav-link" href="/account"><span id="usernamePlaceholder">АККАУНТ</span></a>
      </li>
    </ul>
  </div>
  <RouterView />
</template>
