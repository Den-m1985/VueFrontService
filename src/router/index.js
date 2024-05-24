import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Contact from '../views/Contact.vue'
import About from '../views/AboutView.vue'
import FindSameName from '../views/FindSameName.vue'
import Account from '../components/Account.vue'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/contact', component: Contact },
  { path: '/about', component: About },
  { path: '/account', component: Account },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/findSameName', component: FindSameName }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})
export default router
