import { createRouter, createWebHistory } from 'vue-router'
import AppDetail from '@/pages/AppDetail/AppDetail.vue'
import AppDetailV1 from '@/pages/AppDetailV1/AppDetailV1.vue'
import AIAgentDetail from '@/pages/AIAgentDetail/AIAgentDetail.vue'
import AppVariations from '@/pages/AppVariations/AppVariations.vue'
import Installation from '@/pages/Installation/Installation.vue'

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/marketplace/apps/resource-centre' },
    { path: '/marketplace/apps/:id', name: 'AppDetail', component: AppDetail },
    { path: '/marketplace/apps-v1/:id', name: 'AppDetailV1', component: AppDetailV1 },
    { path: '/marketplace/ai-agents/:id', name: 'AIAgentDetail', component: AIAgentDetail },
    { path: '/marketplace/installation', name: 'Installation', component: Installation },
    { path: '/app-variations', name: 'AppVariations', component: AppVariations }
  ]
})
