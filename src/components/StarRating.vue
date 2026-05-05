<template>
  <div
    class="star-rating"
    :class="[`size-${size}`, { interactive }]"
    role="img"
    :aria-label="ariaLabel"
    @mouseleave="hoverValue = null"
  >
    <button
      v-for="i in max"
      :key="i"
      type="button"
      class="star-btn"
      :tabindex="interactive ? 0 : -1"
      :aria-label="`Rate ${i} out of ${max}`"
      :disabled="!interactive"
      @mouseenter="interactive && (hoverValue = i)"
      @click="onPick(i)"
      @keydown.enter.prevent="onPick(i)"
    >
      <svg viewBox="0 0 24 24" class="star" aria-hidden="true">
        <defs>
          <linearGradient :id="`g-${uid}-${i}`" x1="0" x2="1" y1="0" y2="0">
            <stop :offset="`${fillFor(i) * 100}%`" stop-color="var(--yellow-400)" />
            <stop :offset="`${fillFor(i) * 100}%`" stop-color="var(--gray-200)" />
          </linearGradient>
        </defs>
        <path
          :fill="`url(#g-${uid}-${i})`"
          d="M12 2.5l2.95 5.98 6.6.96-4.78 4.66 1.13 6.57L12 17.77 6.1 20.67l1.13-6.57L2.45 9.44l6.6-.96L12 2.5z"
        />
      </svg>
    </button>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  modelValue: { type: Number, default: 0 },
  max: { type: Number, default: 5 },
  size: { type: String, default: 'md' },
  interactive: { type: Boolean, default: false }
})
const emit = defineEmits(['update:modelValue', 'change'])

const uid = Math.random().toString(36).slice(2, 8)
const hoverValue = ref(null)

const displayed = computed(() =>
  hoverValue.value != null ? hoverValue.value : props.modelValue
)

function fillFor(i) {
  const v = displayed.value
  if (v >= i) return 1
  if (v > i - 1) return v - (i - 1)
  return 0
}

function onPick(i) {
  if (!props.interactive) return
  emit('update:modelValue', i)
  emit('change', i)
}

const ariaLabel = computed(
  () => `Rating: ${props.modelValue} out of ${props.max} stars`
)
</script>

<style scoped>
.star-rating {
  display: inline-flex;
  align-items: center;
  gap: 2px;
}
.star-btn {
  background: none;
  border: 0;
  padding: 0;
  display: inline-flex;
  cursor: default;
}
.star-rating.interactive .star-btn { cursor: pointer; }
.star { width: 16px; height: 16px; transition: transform .15s ease; }
.size-sm .star { width: 12px; height: 12px; }
.size-md .star { width: 16px; height: 16px; }
.size-lg .star { width: 20px; height: 20px; }
.size-xl .star { width: 28px; height: 28px; }
.star-rating.interactive .star-btn:hover .star { transform: scale(1.1); }
[dir="rtl"] .star-rating { flex-direction: row-reverse; }
</style>
