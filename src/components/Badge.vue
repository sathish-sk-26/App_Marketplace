<template>
  <span class="badge" :class="[`badge-${size}`, `badge-${variant}`]">
    <slot />
  </span>
</template>

<script setup>
defineProps({
  size: { type: String, default: 'md', validator: v => ['sm', 'md', 'lg'].includes(v) },
  variant: { type: String, default: 'primary', validator: v => ['primary', 'secondary', 'success', 'danger'].includes(v) }
})
</script>

<style scoped>
.badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-weight: 700;
  background: var(--primary-500);
  color: #fff;
}

.badge-sm {
  width: 16px;
  height: 16px;
  font-size: 10px;
}

.badge-md {
  width: 20px;
  height: 20px;
  font-size: 11px;
}

.badge-lg {
  width: 24px;
  height: 24px;
  font-size: 12px;
}

.badge-secondary {
  background: var(--gray-200);
  color: var(--gray-900);
}

.badge-success {
  background: var(--success-500);
}

.badge-danger {
  background: var(--danger-500);
}
</style>
