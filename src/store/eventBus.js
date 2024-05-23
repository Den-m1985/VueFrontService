import { reactive } from 'vue'

export const eventBus = reactive({
  username: localStorage.getItem('username') || 'АККАУНТ',
  setUsername(newUsername) {
    this.username = newUsername
    localStorage.setItem('username', newUsername)
  }
})
