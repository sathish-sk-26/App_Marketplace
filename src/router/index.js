import { createRouter, createWebHistory } from 'vue-router'
import AppDetail from '@/pages/AppDetail/AppDetail.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/marketplace/apps/resource-centre' },
    { path: '/marketplace/apps/:id', name: 'AppDetail', component: AppDetail }
  ]
})
