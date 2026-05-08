import { createRouter, createWebHistory } from 'vue-router'
import AppDetail from '@/pages/AppDetail/AppDetail.vue'
import AIAgentDetail from '@/pages/AIAgentDetail/AIAgentDetail.vue'
import AppVariations from '@/pages/AppVariations/AppVariations.vue'

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/marketplace/apps/resource-centre' },
    { path: '/marketplace/apps/:id', name: 'AppDetail', component: AppDetail },
    { path: '/marketplace/ai-agents/:id', name: 'AIAgentDetail', component: AIAgentDetail },
    { path: '/app-variations', name: 'AppVariations', component: AppVariations }
  ]
})
