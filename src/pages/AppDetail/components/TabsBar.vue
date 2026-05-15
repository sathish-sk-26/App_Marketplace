<template>
  <div class="tabs-wrap" role="tablist" :aria-label="ariaLabel">
    <button
      v-for="t in tabs"
      :key="t.id"
      :id="`tab-${t.id}`"
      role="tab"
      :aria-selected="active === t.id"
      :aria-controls="`panel-${t.id}`"
      :tabindex="active === t.id ? 0 : -1"
      class="tab"
      :class="{ active: active === t.id }"
      @click="$emit('update:active', t.id)"
      @keydown.left.prevent="move(-1)"
      @keydown.right.prevent="move(1)"
    >
      {{ t.label }}
      <span v-if="t.count != null" class="count">{{ t.count }}</span>
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  tabs:   { type: Array, required: true },
  active: { type: String, required: true },
  ariaLabel: { type: String, default: 'App sections' }
})
const emit = defineEmits(['update:active'])

function move(dir) {
  const i = props.tabs.findIndex(t => t.id === props.active)
  const next = (i + dir + props.tabs.length) % props.tabs.length
  emit('update:active', props.tabs[next].id)
}
</script>

<style scoped>
.tabs-wrap {
  display: flex; gap: 4px;
  border-bottom: 1px solid var(--border);
  height: var(--tab-height);
  align-items: stretch;
  overflow-x: auto;
  scrollbar-width: none;
}
.tabs-wrap::-webkit-scrollbar { display: none; }
.tab {
  position: relative;
  border: 0;
  background: transparent;
  padding: 0 8px;
  font-size: var(--hr-text-sm);
  font-weight: 500;
  color: var(--gray-500);
  display: inline-flex;
  align-items: center;
  gap: 6px;
  white-space: nowrap;
}
.tab:hover { color: var(--gray-800); }
.tab.active { color: var(--primary-600); font-weight: 600; }
.tab.active::after {
  content: '';
  position: absolute;
  inset-inline: 8px;
  bottom: -1px;
  height: 2px;
  background: var(--primary-500);
  border-radius: 2px 2px 0 0;
}
.count {
  background: var(--gray-100);
  color: var(--gray-700);
  font-size: var(--hr-text-xs);
  padding: 1px 8px;
  border-radius: 999px;
}
.tab.active .count {
  background: var(--primary-50);
  color: var(--primary-700);
}
</style>
