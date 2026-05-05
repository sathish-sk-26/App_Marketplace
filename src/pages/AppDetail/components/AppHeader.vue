<template>
  <div class="app-header" :class="{ compact }">
    <div class="header-row">
      <div class="identity">
        <div
          class="app-icon"
          :style="{ background: app.iconBg }"
          aria-hidden="true"
        >
          {{ app.iconLetter }}
        </div>
        <div class="meta">
          <h1 class="title">
            {{ app.name }}
            <Icon
              v-if="app.verified"
              name="badgeCheck"
              :size="18"
              class="verified"
              aria-label="Verified app"
            />
          </h1>
          <p v-if="!compact" class="tagline">{{ app.tagline }}</p>
        </div>
      </div>

      <div class="cta">
        <div class="scope-select" ref="scopeSelectRef">
          <button
            class="scope-btn"
            :aria-expanded="open"
            aria-haspopup="listbox"
            @click="open = !open"
            @blur="onBlur"
          >
            {{ scope }}
            <Icon name="chevronDown" :size="16" />
          </button>
          <ul v-if="open" class="scope-menu" role="listbox">
            <li
              v-for="s in app.scopes"
              :key="s"
              role="option"
              :aria-selected="scope === s"
              :class="{ active: scope === s }"
              @mousedown.prevent="select(s)"
            >
              {{ s }}
              <Icon v-if="scope === s" name="check" :size="14" />
            </li>
          </ul>
        </div>

        <button class="btn btn-primary">Update</button>

        <button class="icon-btn" aria-label="More actions">
          <Icon name="more" :size="18" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import Icon from '@/components/Icon.vue'

const props = defineProps({
  app: { type: Object, required: true },
  compact: { type: Boolean, default: false }
})

const open = ref(false)
const scope = ref(props.app.defaultScope)
const scopeSelectRef = ref(null)

function select(s) { scope.value = s; open.value = false }

function handleClickOutside(event) {
  if (scopeSelectRef.value && !scopeSelectRef.value.contains(event.target)) {
    open.value = false
  }
}

onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('mousedown', handleClickOutside)
})
</script>

<style scoped>
.app-header { padding-block: 24px; transition: padding .2s ease; }
.app-header.compact { padding-block: 12px; }

.header-row {
  display: flex; align-items: center; gap: 24px; flex-wrap: wrap;
}
.identity { display: flex; align-items: center; gap: 16px; flex: 1; min-width: 0; }
.app-icon {
  width: 56px; height: 56px; border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
  color: #fff; font-weight: 700; font-size: 26px;
  flex-shrink: 0;
  box-shadow: var(--shadow-sm);
}
.compact .app-icon { width: 36px; height: 36px; font-size: 18px; border-radius: 8px; }
.meta { min-width: 0; }
.title {
  margin: 0;
  font-size: var(--hr-text-3xl);
  font-weight: 700; color: var(--gray-900);
  display: inline-flex; align-items: center; gap: 8px;
  line-height: 1.2;
}
.compact .title { font-size: var(--hr-text-xl); }
.verified { color: var(--primary-500); }
.tagline {
  margin: 4px 0 0;
  color: var(--gray-500); font-size: var(--hr-text-sm);
}

.cta { display: flex; align-items: center; gap: 8px; }

.scope-select { position: relative; }
.scope-btn {
  display: inline-flex; align-items: center; gap: 8px;
  height: 40px; padding: 0 14px;
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  background: var(--surface); color: var(--gray-900);
  font-size: var(--hr-text-sm); font-weight: 500;
}
.scope-btn:hover { border-color: var(--gray-300); }
.scope-menu {
  position: absolute; top: calc(100% + 4px); inset-inline-start: 0;
  margin: 0; padding: 0; list-style: none;
  background: var(--color-neutral-white-base, #FFF);
  border: 1px solid var(--color-neutral-gray-300, #D0D5DD);
  border-radius: 0.25rem;
  box-shadow: 0 4px 8px -2px rgba(16, 24, 40, 0.10), 0 2px 4px -2px rgba(16, 24, 40, 0.06);
  min-width: 160px; z-index: 20;
}
.scope-menu li {
  padding: 8px 12px;
  font-family: Inter;
  font-weight: 400;
  font-style: normal;
  font-size: var(--font-size-md, 1rem);
  line-height: var(--font-line-height-md, 1.5);
  letter-spacing: var(--font-letter-spacing-normal, 0);
  color: var(--color-neutral-gray-700, rgba(52, 64, 84, 1));
  display: flex; align-items: center; justify-content: space-between;
  cursor: pointer;
  transition: all .2s ease;
}
.scope-menu li:hover { background: var(--gray-50); }
.scope-menu li.active { color: var(--primary-600); }

.btn {
  height: 40px; padding: 0 18px; border-radius: var(--radius-md);
  border: 1px solid transparent; font-weight: 600;
  font-size: var(--hr-text-sm);
}
.btn-primary {
  background: var(--primary-500); color: #fff;
}
.btn-primary:hover { background: var(--primary-600); }

.icon-btn {
  width: 40px; height: 40px; border-radius: var(--radius-md);
  border: 1px solid var(--border); background: var(--surface);
  color: var(--gray-700);
  display: inline-flex; align-items: center; justify-content: center;
}
.icon-btn:hover { background: var(--gray-50); }

@media (max-width: 640px) {
  .header-row { gap: 12px; }
  .cta { width: 100%; justify-content: flex-end; }
}
</style>
