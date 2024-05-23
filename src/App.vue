<script>
import { eventBus } from '../src/store/eventBus'

export default {
  data() {
    return {
      username: eventBus.username
    }
  },
  mounted() {
    this.username = eventBus.username
  },
  watch: {
    'eventBus.username': {
      handler(newUsername) {
        this.username = newUsername
      },
      immediate: true
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
          <span v-text="username"></span>
        </RouterLink>
      </li>
    </ul>
  </div>
  <RouterView />
</template>
