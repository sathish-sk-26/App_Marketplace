<template>
  <div class="pricing">
    <h2 class="section-title">Pricing plans</h2>
    <p class="lead">
      Choose the plan that fits your team. Upgrade, downgrade, or cancel anytime.
    </p>
    <div class="plans">
      <article
        v-for="p in app.pricing.plans"
        :key="p.name"
        class="plan"
        :class="{ highlight: p.highlighted }"
      >
        <div v-if="p.highlighted" class="ribbon">Most popular</div>
        <h3>{{ p.name }}</h3>
        <div class="price">
          <span class="amount">{{ p.price }}</span>
          <span class="period">{{ p.period }}</span>
        </div>
        <ul>
          <li v-for="f in p.features" :key="f">
            <Icon name="check" :size="14" />
            <span>{{ f }}</span>
          </li>
        </ul>
        <button class="btn" :class="p.highlighted ? 'btn-primary' : 'btn-secondary'">
          {{ p.highlighted ? 'Get started' : 'Choose plan' }}
        </button>
      </article>
    </div>
  </div>
</template>

<script setup>
import Icon from '@/components/Icon.vue'
defineProps({ app: { type: Object, required: true } })
</script>

<style scoped>
.pricing { display: flex; flex-direction: column; gap: 16px; }
.section-title { margin: 0; font-size: var(--hr-text-xl); font-weight: 600; }
.lead { margin: 0 0 8px; color: var(--gray-600); }
.plans {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
}
.plan {
  position: relative;
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  background: var(--surface);
  padding: 24px;
  display: flex; flex-direction: column; gap: 16px;
}
.plan.highlight {
  border-color: var(--primary-500);
  box-shadow: var(--shadow-md);
}
.ribbon {
  position: absolute; top: -10px; inset-inline-end: 16px;
  background: var(--primary-500); color: #fff;
  font-size: var(--hr-text-xs); font-weight: 600;
  padding: 2px 10px; border-radius: 999px;
}
.plan h3 { margin: 0; font-size: var(--hr-text-lg); }
.price { display: flex; align-items: baseline; gap: 4px; }
.amount { font-size: var(--hr-text-3xl); font-weight: 700; }
.period { color: var(--gray-500); font-size: var(--hr-text-sm); }
.plan ul { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 8px; }
.plan li { display: flex; gap: 8px; font-size: var(--hr-text-sm); color: var(--gray-700); }
.plan li :deep(svg) { color: var(--success-500); flex-shrink: 0; margin-top: 3px; }

.btn {
  margin-top: auto;
  height: 40px; border-radius: var(--radius-md);
  font-weight: 600; font-size: var(--hr-text-sm);
  border: 1px solid transparent;
}
.btn-primary { background: var(--primary-500); color: #fff; }
.btn-primary:hover { background: var(--primary-600); }
.btn-secondary {
  background: var(--surface); color: var(--gray-900);
  border-color: var(--border);
}
.btn-secondary:hover { background: var(--gray-50); }
</style>
