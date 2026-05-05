<template>
  <div class="permissions">
    <h2 class="section-title">Permissions requested</h2>
    <p class="lead">
      This app requests access to the following resources within your account.
    </p>

    <div class="table" role="table" aria-label="App permissions">
      <div class="thead" role="row">
        <span role="columnheader">Resource</span>
        <span role="columnheader">Access level</span>
        <span role="columnheader">Description</span>
      </div>
      <div v-for="p in app.permissions" :key="p.scope" class="trow" role="row">
        <span role="cell" class="scope">
          <Icon name="lock" :size="14" />
          {{ p.scope }}
        </span>
        <span role="cell">
          <span class="badge" :class="p.access === 'Read' ? 'badge-info' : 'badge-warn'">
            {{ p.access }}
          </span>
        </span>
        <span role="cell" class="muted">{{ p.description }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import Icon from '@/components/Icon.vue'
defineProps({ app: { type: Object, required: true } })
</script>

<style scoped>
.permissions { display: flex; flex-direction: column; gap: 16px; }
.section-title { margin: 0; font-size: var(--hr-text-xl); font-weight: 600; }
.lead { margin: 0; color: var(--gray-600); }

.table {
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: var(--surface);
}
.thead, .trow {
  display: grid;
  grid-template-columns: 1fr 1fr 2fr;
  gap: 16px;
  padding: 14px 20px;
  align-items: center;
}
.thead {
  background: var(--gray-50);
  font-size: var(--hr-text-xs);
  font-weight: 600;
  color: var(--gray-600);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.trow + .trow { border-top: 1px solid var(--border); }
.trow { font-size: var(--hr-text-sm); }
.scope { display: inline-flex; align-items: center; gap: 8px; font-weight: 500; }
.muted { color: var(--gray-600); }

.badge {
  display: inline-block;
  padding: 2px 8px; border-radius: 999px;
  font-size: var(--hr-text-xs); font-weight: 500;
}
.badge-info { background: var(--primary-50); color: var(--primary-700); }
.badge-warn { background: var(--warning-50); color: var(--warning-600); }

@media (max-width: 720px) {
  .thead { display: none; }
  .trow { grid-template-columns: 1fr; gap: 6px; }
}
</style>
