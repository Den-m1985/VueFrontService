import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Contact from '../components/Contact.vue'
import About from '../views/AboutView.vue'
import Account from '../components/Account.vue'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import FindSameName from '../components/FindSameName.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/contact',
      name: 'contact',
      component: Contact
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/account',
      name: 'account',
      component: Account
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/findSameName',
      name: 'findSameName',
      component: FindSameName
    }
  ]
})

export default router
