<script>
import { useUser } from './store/useUser.js'

export default {
  setup() {
    const { username } = useUser()
    return {
      username
    }
  }
}
</script>

<template>
  <div class="p-3 m-0 border-0 bd-example m-0 border-0">
    <ul class="nav justify-content-center">
      <li class="nav-item">
        <RouterLink class="nav-link" to="/">ГЛАВНАЯ</RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink class="nav-link" to="/contact">КОНТАКТЫ</RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink class="nav-link" to="/about">О ПРОЕКТЕ</RouterLink>
      </li>
      <!--<li class="nav-item">
                <a class="nav-link" href="/admin">АДМИНКА</a>
            </li>-->
      <li class="nav-item">
        <RouterLink class="nav-link" to="/account">
          <span>{{ username }}</span>
        </RouterLink>
      </li>
    </ul>
  </div>
  <RouterView />
</template>
