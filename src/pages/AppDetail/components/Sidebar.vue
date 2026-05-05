<template>
  <aside class="sidebar" aria-label="App information">
    <section class="block">
      <h3 class="block-title">Categories</h3>
      <ul class="list">
        <li v-for="c in app.sidebar.categories" :key="c">
          <Icon name="user" :size="16" />
          <span>{{ c }}</span>
        </li>
      </ul>
    </section>

    <section class="block">
      <h3 class="block-title">Type</h3>
      <ul class="list">
        <li>
          <Icon name="checkCircle" :size="16" />
          <span>{{ app.sidebar.type }}</span>
        </li>
      </ul>
    </section>

    <section class="block">
      <h3 class="block-title">Resources</h3>
      <ul class="list">
        <li v-for="r in app.sidebar.resources" :key="r.name">
          <a :href="r.href" class="resource-link">
            <Icon :name="iconFor(r.icon)" :size="16" />
            <span>{{ r.name }}</span>
          </a>
        </li>
      </ul>
    </section>
  </aside>
</template>

<script setup>
import Icon from '@/components/Icon.vue'

defineProps({ app: { type: Object, required: true } })

function iconFor(key) {
  return ({
    support:    'help',
    docs:       'book',
    terms:      'fileText',
    privacy:    'shield',
    globe:      'globe'
  })[key] || 'globe'
}
</script>

<style scoped>
.sidebar { display: flex; flex-direction: column; gap: 28px; }
.block-title {
  margin: 0 0 12px;
  font-size: var(--hr-text-md);
  font-weight: 600;
  color: var(--gray-900);
}
.list {
  list-style: none; margin: 0; padding: 0;
  display: flex; flex-direction: column; gap: 10px;
}
.list li {
  display: flex; align-items: center; gap: 8px;
  font-size: var(--hr-text-sm);
  color: var(--gray-700);
}
.resource-link {
  display: inline-flex; align-items: center; gap: 8px;
  color: var(--gray-700);
}
.resource-link:hover { color: var(--primary-600); }
</style>
