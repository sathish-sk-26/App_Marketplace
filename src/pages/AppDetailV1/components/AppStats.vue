<template>
  <section class="stats" aria-label="App statistics">
    <div class="stat">
      <div class="label">Rating</div>
      <div class="value rating-value" role="button" tabindex="0" @click="emit('navigate-to-reviews')" @keydown.enter="emit('navigate-to-reviews')">
        <span class="num">{{ app.rating.toFixed(1) }}</span>
        <StarRating :model-value="1" :max="1" size="md" />
        <Link size="xs" @click="emit('navigate-to-reviews')">({{ formatted(app.reviewCount) }})</Link>
      </div>
    </div>

    <div class="divider" aria-hidden="true" />

    <div class="stat">
      <div class="label">Who is this app for</div>
      <div class="value">
        <Icon name="users" :size="16" class="muted-icon" />
        <span class="num-md">{{ app.appFor[0] }}</span>
      </div>
    </div>

    <div class="divider" aria-hidden="true" />

    <div class="stat">
      <div class="label">Who can install</div>
      <div class="value tags-group">
        <div class="tag-item">
          <Tag size="lg" rounded :active="isActive(app.installableBy, 'Agency')" :inactive="!isActive(app.installableBy, 'Agency')" :icon="isActive(app.installableBy, 'Agency') ? 'check' : 'x'">Agency</Tag>
        </div>
        <div class="tag-item">
          <Tag size="lg" rounded :active="isActive(app.installableBy, 'Sub-account')" :inactive="!isActive(app.installableBy, 'Sub-account')" :icon="isActive(app.installableBy, 'Sub-account') ? 'check' : 'x'">Sub-account</Tag>
        </div>
      </div>
    </div>

    <div class="divider" aria-hidden="true" />

    <div class="stat">
      <div class="label">White-label</div>
      <div class="value">
        <Icon name="checkCircle" :size="16" class="success-icon" />
        <span class="num-md success-text">{{ app.whiteLabel }}</span>
      </div>
    </div>

    <div class="divider" aria-hidden="true" />

    <div class="stat">
      <div class="label">Installs</div>
      <div class="value">
        <Icon name="download" :size="16" class="muted-icon" />
        <span class="num-md">{{ formatted(app.installs) }}</span>
      </div>
      <Link class="sub-installs-link" size="xs">
        <Icon name="check" :size="12" />
        Installed in {{ app.subAccountInstalls }} sub-accounts
      </Link>
    </div>

    <div class="divider" aria-hidden="true" />

    <div class="stat">
      <div class="label">Pricing</div>
      <div class="value pricing-value">
        <div class="pricing-title">{{ app.pricingLabel }}</div>
        <Link size="xs" @click="emit('navigate-to-pricing')">View</Link>
      </div>
    </div>
  </section>
</template>

<script setup>
import StarRating from '@/components/StarRating.vue'
import Icon from '@/components/Icon.vue'
import Tag from '@/components/Tag.vue'
import Link from '@/components/Link.vue'

defineProps({ app: { type: Object, required: true } })
const emit = defineEmits(['navigate-to-reviews', 'navigate-to-pricing'])

const formatted = (n) => n.toLocaleString('en-US')
const isActive = (arr, value) => Array.isArray(arr) ? arr.includes(value) : false
</script>

<style scoped>
.stats {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  padding: 16px 0;
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  background: var(--surface);
}
.stat { min-width: 0; padding: 0 20px; }
.label {
  font-size: var(--hr-text-xs);
  color: var(--gray-500);
  margin-bottom: 6px;
}
.value {
  display: flex; align-items: center; gap: 8px;
  font-size: var(--hr-text-md);
  color: var(--gray-900);
}
.rating-value { gap: 6px; cursor: pointer; transition: opacity 0.2s ease; justify-content: center; }
.rating-value:hover { opacity: 0.7; }
.num {
  font-size: var(--hr-text-lg);
  font-weight: 600;
}
.num-md {
  font-size: var(--hr-text-md);
  font-weight: 500;
}
.muted { color: var(--gray-500); font-size: var(--hr-text-sm); }
.review-count {
  font-size: var(--hr-text-sm);
  color: var(--primary-600);
}
.muted-icon { color: var(--gray-500); }
.sub-installs-link {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  margin-top: 4px;
}
.success-icon { color: var(--success-500); }
.success-text { color: var(--success-700); }
.pricing-value {
  flex-direction: column !important;
  align-items: flex-start !important;
  gap: 4px !important;
}
.pricing-title {
  font-size: var(--hr-text-md);
  font-weight: 500;
  color: var(--gray-900);
}
.pricing-info {
  font-size: var(--hr-text-xs);
  color: var(--gray-600);
}
.divider {
  width: 1px; height: 36px; background: var(--gray-200);
}
.badge {
  display: inline-flex; align-items: center; gap: 4px;
  padding: 2px 8px; border-radius: 999px;
  font-size: var(--hr-text-xs); font-weight: 500;
}
.badge-success {
  background: var(--success-50); color: var(--success-700);
  border: 1px solid var(--success-200);
}
.tags-group {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}
.tag-item {
  display: flex;
  align-items: center;
  gap: 4px;
}
@media (max-width: 1024px) {
  .stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px 16px;
    padding: 20px;
  }
  .stat { padding: 0; }
  .divider { display: none; }
  .rating-value { justify-content: left; }
}
@media (max-width: 600px) {
  .stats {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
