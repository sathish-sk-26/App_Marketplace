<template>
  <div class="external-connection">
    <div class="empty-state">
      <h2 class="title">Connection Pending</h2>
      <p class="subtitle">Let's get you connected with {{ providerName }}</p>

      <div class="illustration" aria-hidden="true">
        <svg viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg">
          <!-- background network/dots circle -->
          <ellipse cx="300" cy="220" rx="220" ry="150" fill="#EEF4FF" opacity="0.6" />
          <g stroke="#C7D7FE" stroke-width="1" fill="none" opacity="0.7">
            <line x1="120" y1="180" x2="220" y2="120" />
            <line x1="220" y1="120" x2="380" y2="120" />
            <line x1="380" y1="120" x2="480" y2="180" />
            <line x1="480" y1="180" x2="430" y2="300" />
            <line x1="430" y1="300" x2="170" y2="300" />
            <line x1="170" y1="300" x2="120" y2="180" />
            <line x1="220" y1="120" x2="300" y2="220" />
            <line x1="380" y1="120" x2="300" y2="220" />
            <line x1="170" y1="300" x2="300" y2="220" />
            <line x1="430" y1="300" x2="300" y2="220" />
          </g>
          <g fill="#C7D7FE">
            <circle cx="120" cy="180" r="3" />
            <circle cx="220" cy="120" r="3" />
            <circle cx="380" cy="120" r="3" />
            <circle cx="480" cy="180" r="3" />
            <circle cx="430" cy="300" r="3" />
            <circle cx="170" cy="300" r="3" />
            <circle cx="300" cy="220" r="3" />
          </g>

          <!-- left cable -->
          <path d="M 80 320 Q 150 320 200 280" stroke="#3B82F6" stroke-width="14" fill="none" stroke-linecap="round" />

          <!-- right cable -->
          <path d="M 520 320 Q 450 320 400 280" stroke="#3B82F6" stroke-width="14" fill="none" stroke-linecap="round" />

          <!-- left person -->
          <g>
            <!-- head -->
            <circle cx="195" cy="135" r="22" fill="#FBE5D6" />
            <!-- hair -->
            <path d="M 175 130 Q 175 110 195 110 Q 215 110 215 130 L 215 122 Q 195 117 180 125 Z" fill="#2D2D2D" />
            <!-- shirt -->
            <path d="M 165 165 L 225 165 L 235 230 L 155 230 Z" fill="#FFFFFF" stroke="#2D2D2D" stroke-width="2" />
            <!-- pants -->
            <path d="M 160 230 L 235 230 L 230 320 L 200 320 L 198 250 L 195 320 L 165 320 Z" fill="#2D2D2D" />
            <!-- arms holding plug -->
            <path d="M 165 175 Q 145 200 175 235" stroke="#FBE5D6" stroke-width="16" fill="none" stroke-linecap="round" />
            <path d="M 225 175 Q 245 200 245 240" stroke="#FBE5D6" stroke-width="16" fill="none" stroke-linecap="round" />
            <!-- plug body (blue, prongs to the right) -->
            <rect x="220" y="225" width="60" height="70" rx="6" fill="#3B82F6" stroke="#1E3A8A" stroke-width="2" />
            <rect x="280" y="240" width="18" height="8" fill="#9CA3AF" />
            <rect x="280" y="272" width="18" height="8" fill="#9CA3AF" />
          </g>

          <!-- right person -->
          <g>
            <!-- head -->
            <circle cx="405" cy="135" r="22" fill="#FBE5D6" />
            <!-- hair (longer) -->
            <path d="M 383 135 Q 383 105 405 105 Q 430 105 430 135 L 430 160 Q 425 145 420 140 L 392 140 Q 388 150 383 158 Z" fill="#2D2D2D" />
            <!-- shirt -->
            <path d="M 375 165 L 435 165 L 445 230 L 365 230 Z" fill="#FFFFFF" stroke="#2D2D2D" stroke-width="2" />
            <!-- pants -->
            <path d="M 370 230 L 445 230 L 440 320 L 410 320 L 408 250 L 405 320 L 375 320 Z" fill="#2D2D2D" />
            <!-- arms holding plug -->
            <path d="M 375 175 Q 355 200 355 240" stroke="#FBE5D6" stroke-width="16" fill="none" stroke-linecap="round" />
            <path d="M 435 175 Q 455 200 425 235" stroke="#FBE5D6" stroke-width="16" fill="none" stroke-linecap="round" />
            <!-- plug body (socket, prongs to the left) -->
            <rect x="320" y="225" width="60" height="70" rx="6" fill="#3B82F6" stroke="#1E3A8A" stroke-width="2" />
            <circle cx="335" cy="245" r="4" fill="#1E3A8A" />
            <circle cx="335" cy="275" r="4" fill="#1E3A8A" />
            <circle cx="355" cy="260" r="3" fill="#1E3A8A" />
          </g>

          <!-- ground shadows -->
          <ellipse cx="200" cy="328" rx="55" ry="5" fill="#2D2D2D" opacity="0.25" />
          <ellipse cx="410" cy="328" rx="55" ry="5" fill="#2D2D2D" opacity="0.25" />
        </svg>
      </div>

      <button class="connect-btn" @click="onConnect">Connect to {{ providerName }}</button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({ app: { type: Object, required: true } })

const providerName = computed(() => props.app.externalProvider || 'Jobber')

function onConnect() {
  // hook up real connection flow here
}
</script>

<style scoped>
.external-connection {
  display: flex;
  justify-content: center;
  padding: 32px 16px;
}
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 560px;
  width: 100%;
}
.title {
  margin: 0 0 8px;
  font-size: var(--hr-text-2xl);
  font-weight: 700;
  color: var(--gray-900);
}
.subtitle {
  margin: 0 0 24px;
  font-size: var(--hr-text-md);
  color: var(--gray-500);
}
.illustration {
  width: 100%;
  max-width: 480px;
  margin-bottom: 28px;
}
.illustration svg {
  width: 100%;
  height: auto;
  display: block;
}
.connect-btn {
  height: 48px;
  padding: 0 32px;
  border-radius: var(--radius-md);
  border: 0;
  background: var(--primary-500);
  color: #fff;
  font-size: var(--hr-text-md);
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease;
}
.connect-btn:hover { background: var(--primary-600); }
</style>
