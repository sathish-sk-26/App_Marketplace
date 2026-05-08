<template>
  <a class="link" :class="`link-${size}`" :href="href" @click.prevent="onClick"><slot /></a>
</template>

<script setup>
const props = defineProps({
  href: { type: String, default: '#' },
  size: {
    type: String,
    default: 'sm',
    validator: (v) => ['xs', 'sm', 'md'].includes(v)
  }
})
const emit = defineEmits(['click'])

function onClick(e) {
  emit('click', e)
}
</script>

<style scoped>
.link {
  color: var(--primary-600);
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
}
.link:hover { text-decoration: underline; }
.link-xs { font-size: var(--hr-text-xs); }
.link-sm { font-size: var(--hr-text-sm); }
.link-md { font-size: var(--hr-text-md); }
</style>
