<template>
  <header class="topnav sticky-top" role="banner">
    <div class="container topnav-inner">
      <div class="brand">
        <span class="brand-icon" aria-hidden="true">
          <Icon name="bag" :size="18" />
        </span>
        <span class="brand-name">Marketplace</span>
      </div>

      <nav class="primary-nav" aria-label="Primary">
        <a href="#" class="nav-link">App dashboard</a>
        <button @click="router.push('/marketplace/apps/resource-centre')" class="nav-link">My apps</button>
        <button @click="router.push('/marketplace/ai-agents/E.D.I.D.H')" class="nav-link">AI agents</button>
        <button @click="router.push('/marketplace/installation')" class="nav-link">Installation review</button>
        <a href="#" class="nav-link has-dot">
          Product updates
          <span class="dot" aria-label="New updates" />
        </a>
      </nav>

      <div class="actions">
        <button class="icon-btn" aria-label="Notifications">
          <Icon name="bell" :size="18" />
        </button>
        <button class="icon-btn" aria-label="Help">
          <Icon name="help" :size="18" />
        </button>
        <button class="avatar" aria-label="Account menu">
          <img src="https://i.pravatar.cc/64?img=47" alt="" />
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useRouter } from 'vue-router'
import Icon from '@/components/Icon.vue'

const router = useRouter()
</script>

<style scoped>
.topnav {
  height: var(--nav-height);
  background: var(--surface);
  border-bottom: 1px solid var(--border);
}
.topnav-inner {
  height: 100%;
  display: flex;
  align-items: center;
  gap: 32px;
}
.brand {
  display: flex; align-items: center; gap: 8px;
  font-weight: 600; color: var(--gray-900);
  font-size: var(--hr-text-lg);
}
.brand-icon {
  width: 28px; height: 28px; border-radius: 6px;
  background: var(--primary-500); color: #fff;
  display: inline-flex; align-items: center; justify-content: center;
}
.primary-nav { display: flex; gap: 24px; flex: 1; }
.nav-link {
  position: relative;
  color: var(--gray-700);
  font-size: var(--hr-text-sm);
  font-weight: 500;
  padding: 4px 2px;
  border: none;
  background: none;
  cursor: pointer;
}
.nav-link:hover { color: var(--gray-900); }
.nav-link.has-dot { display: inline-flex; align-items: center; gap: 6px; }
.dot {
  width: 8px; height: 8px; border-radius: 50%;
  background: var(--error-500);
}
.actions {
  display: flex; align-items: center; gap: 8px;
  margin-inline-start: auto;
}
.icon-btn {
  width: 36px; height: 36px; border-radius: 50%;
  border: 0; background: transparent; color: var(--gray-600);
  display: inline-flex; align-items: center; justify-content: center;
}
.icon-btn:hover { background: var(--gray-100); color: var(--gray-900); }
.avatar {
  width: 36px; height: 36px; border-radius: 50%;
  border: 0; padding: 0; overflow: hidden; background: var(--gray-100);
}
.avatar img { width: 100%; height: 100%; object-fit: cover; }
</style>
