import { createRouter, createWebHistory } from 'vue-router'
import Home from './components/Home.vue'
import Pieces from './components/Pieces.vue'
import Auditions from './components/Auditions.vue'
import Login from './components/Login.vue'
import Register from './components/Register.vue'

const routes = [
    { path : '/', component: Home },
    { path: '/register', component: Register },
    { path: '/login', component: Login },
    { path : '/pieces', component: Pieces },
    { path : '/auditions', component: Auditions }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router