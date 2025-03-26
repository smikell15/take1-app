import { createRouter, createWebHistory } from 'vue-router'
import Home from './components/Home.vue'
import Pieces from './components/Pieces.vue'
import Auditions from './components/Auditions.vue'

const routes = [
    { path : '/', component: Home },
    { path : '/pieces', component: Pieces },
    { path : '/auditions', component: Auditions }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router