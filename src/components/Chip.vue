<template>
  <button class="chip" :class="{ active }">
    <slot />
  </button>
</template>

<script setup>
defineProps({
  active: { type: Boolean, default: false }
})
</script>

<style scoped>
.chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border: 1px solid var(--border);
  border-radius: 999px;
  background: var(--surface);
  color: var(--gray-700);
  font-size: var(--hr-text-sm);
  font-weight: 500;
  cursor: pointer;
  transition: all .2s ease;
}
.chip:hover {
  border-color: var(--gray-300);
  background: var(--gray-50);
}
.chip.active {
  border-color: var(--primary-300);
  background: var(--primary-50);
  color: var(--primary-600);
}
</style>
