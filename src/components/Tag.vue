<template>
  <div class="tag" :class="{ active, inactive, primary, rounded }" :style="sizeStyle">
    <Icon v-if="icon" :name="icon" :size="10" />
    <slot />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import Icon from './Icon.vue'

const props = defineProps({
  active: { type: Boolean, default: false },
  inactive: { type: Boolean, default: false },
  rounded: { type: Boolean, default: false },
  primary: { type: Boolean, default: false },
  icon: { type: String, default: 'check' },
  size: { type: String, default: 'sm' }
})

const sizes = {
  xs: { height: '1rem',     padding: '0 0.375rem', fontSize: 'var(--font-size-xs, 0.6875rem)', lineHeight: 'var(--font-line-height-xs, 1rem)' },
  sm: { height: '1.125rem', padding: '0 0.375rem', fontSize: 'var(--font-size-xs, 0.6875rem)', lineHeight: 'var(--font-line-height-xs, 1rem)' },
  md: { height: '1.5rem',   padding: '0 0.5rem',   fontSize: 'var(--font-size-xs, 0.6875rem)', lineHeight: 'var(--font-line-height-xs, 1rem)' },
  lg: { height: '1.75rem',  padding: '0 0.5rem',   fontSize: '0.8125rem', lineHeight: 'var(--font-line-height-md, 1.125rem)' },
}

const sizeStyle = computed(() => {
  const s = sizes[props.size] || sizes.sm
  return { height: s.height, minHeight: s.height, maxHeight: s.height, padding: s.padding, fontSize: s.fontSize, lineHeight: s.lineHeight }
})
</script>

<style scoped>
.tag {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.125rem;
  flex-shrink: 0;
  border-radius: 0.25rem;
  border: 1px solid transparent;
  text-align: center;
  font-family: Inter;
  font-style: normal;
  font-weight: var(--font-weight-medium, 500);
  letter-spacing: var(--font-letter-spacing-normal, 0);
}
.tag.active {
  background: var(--success-50);
  color: var(--success-700);
  border-color: var(--success-200);
}
.tag.primary {
  background: var(--primary-50, #EEF4FF);
  color: var(--primary-700, #1E40AF);
  border-color: var(--primary-200, #BFDBFE);
}
.tag.inactive {
  border-radius: 0.25rem;
  border: 1px solid var(--tag-gray-border-default, #D0D5DD);
  background: var(--tag-background, #FFF);
  color: var(--tag-gray-label-color-default, #344054);
}
.tag.rounded {
  border-radius: 999px;
}
</style>
