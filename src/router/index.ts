import { createRouter, createWebHistory } from 'vue-router'
const MainMenu = () =>
  import(/* webpackChunkName: "main-menu" */ '../pages/MainMenu.vue')
const DisintegratedGameplay = () =>
  import(/* webpackChunkName: "main-menu" */ '../pages/DisintegratedGameplay.vue')
const IntegratedGameplay = () =>
  import(/* webpackChunkName: "main-menu" */ '../pages/IntegratedGameplay.vue')

const routes = [
  {
    path: '/',
    name: 'Main Menu',
    component: MainMenu 
  },
  {
    path: '/disintegrated-gameplay',
    name: 'Disintegrated Gameplay',
    component: DisintegratedGameplay 
  },
  {
    path: '/integrated-gameplay',
    name: 'Integrated Gameplay',
    component: IntegratedGameplay 
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router