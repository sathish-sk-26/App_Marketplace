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
  gap: 8px;
  height: 40px;
  padding: 0 14px;
  border: 1px solid var(--border);
  border-radius: 4px;
  background: var(--surface);
  color: var(--gray-900);
  font-size: var(--hr-text-sm);
  font-weight: 500;
  cursor: pointer;
  transition: border-color .2s ease, background .2s ease, color .2s ease;
}
.chip:hover {
  border-color: var(--gray-300);
}
.chip.active {
  border-color: var(--primary-300);
  background: var(--primary-50);
  color: var(--primary-600);
}
</style>
