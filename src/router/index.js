import { createRouter, createWebHistory } from 'vue-router'

import EmailView from '../views/template/EmailView.vue'
import HomeView from '../views/HomeView.vue'
import MessageView from '../views/MessageView.vue'
import LoginView from '../views/LoginView.vue'
// import PageNotFound from '../views/PageNotFound.vue'

import { useUserStore } from '@/store/user-store'

const routes = [
  {
    path: '/',
    component: LoginView
  },
  {
    path: '/email',
    beforeEnter: (to, from, next) => {
      useUserStore().email ? next() : next('/')
    },
    component: EmailView,
    children: [
      {
        path: '',
        component: HomeView
      },
      {
        path: 'message/:id',
        component: MessageView
      }
    ]
  }
  // ,
  // { 
  //   path: '*', 
  //   component: PageNotFound
  // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
