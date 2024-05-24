import { reactive, toRefs } from 'vue'

const state = reactive({
  username: localStorage.getItem('username') || 'АККАУНТ'
})

export function useUser() {
  function setUsername(newUsername) {
    state.username = newUsername
    localStorage.setItem('username', newUsername)
  }

  return {
    ...toRefs(state),
    setUsername
  }
}
