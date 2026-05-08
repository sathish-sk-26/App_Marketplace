<template>
  <div class="page">
    <!-- Sticky marketplace top nav -->
    <TopNav />

    <main class="container">
      <!-- What's Included Section with Variations -->
      <section class="block">
        <h1 class="section-title">
          <Icon name="package" :size="24" />
          App Variations
        </h1>
        <p class="lead variations-intro">Explore different layout variations for presenting app features and integrations.</p>

        <div class="variations-tabs-wrapper">
          <div class="variations-tabs">
            <button
              v-for="tab in ['variation1', 'variation2', 'variation3']"
              :key="tab"
              class="variation-tab"
              :class="{ active: activeVariationTab === tab }"
              @click="activeVariationTab = tab"
            >
              {{ tab === 'variation1' ? 'Variation 1: 2-Column Layout' : tab === 'variation2' ? 'Variation 2: Single Column' : 'Variation 3: Horizontal Grid' }}
            </button>
          </div>
        </div>

        <!-- Variation 1 Content -->
        <div v-if="activeVariationTab === 'variation1'" class="variation-content-inner">
          <div class="variation-description">
            <p><strong>2-Column Layout:</strong> Label on the left (150px fixed width) with cards displayed in a grid on the right. This layout is compact and organized.</p>
          </div>

          <!-- Conversation Provider -->
          <div class="included-layout">
            <div class="included-left">
              <h3 class="included-heading">Conversation Provider</h3>
            </div>
            <div class="included-right">
              <div class="included-grid">
                <div v-for="provider in app.whatsIncluded.conversationProviders" :key="provider.name" class="included-card">
                  <Icon :name="provider.icon" :size="20" class="included-icon" />
                  <div class="included-label-group">
                    <div class="included-label">{{ provider.name }}</div>
                    <div class="included-type">Type: {{ provider.type }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="included-separator"></div>

          <!-- Custom JS -->
          <div class="included-layout">
            <div class="included-left">
              <h3 class="included-heading">Custom JS</h3>
            </div>
            <div class="included-right">
              <div class="included-grid">
                <div v-for="js in app.whatsIncluded.customJs" :key="js.name" class="included-card">
                  <Icon :name="js.icon" :size="20" class="included-icon" />
                  <span class="included-label">{{ js.name }}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="included-separator"></div>

          <!-- Custom Actions -->
          <div class="included-layout">
            <div class="included-left">
              <h3 class="included-heading">Custom Actions</h3>
            </div>
            <div class="included-right">
              <div class="included-grid">
                <div v-for="(action, idx) in app.whatsIncluded.customActions" v-show="expandedActions || idx < 3" :key="action.name" class="included-card">
                  <Icon :name="action.icon" :size="20" class="included-icon" />
                  <div class="included-label-group">
                    <div class="included-label">{{ action.name }}</div>
                    <div class="included-desc" v-if="action.description">{{ action.description }}</div>
                  </div>
                </div>
              </div>
              <Link v-if="app.whatsIncluded.customActionsExtra > 0" size="sm" @click="expandedActions = !expandedActions">
                {{ expandedActions ? 'View less' : `+ ${app.whatsIncluded.customActionsExtra} more` }}
              </Link>
            </div>
          </div>

          <div class="included-separator"></div>

          <!-- Custom Triggers -->
          <div class="included-layout">
            <div class="included-left">
              <h3 class="included-heading">Custom Triggers</h3>
            </div>
            <div class="included-right">
              <div class="included-grid">
                <div v-for="(trigger, idx) in app.whatsIncluded.customTriggers" v-show="expandedTriggers || idx < 3" :key="trigger.name" class="included-card">
                  <Icon :name="trigger.icon" :size="20" class="included-icon" />
                  <div class="included-label-group">
                    <div class="included-label">{{ trigger.name }}</div>
                    <div class="included-desc" v-if="trigger.description">{{ trigger.description }}</div>
                  </div>
                </div>
              </div>
              <Link v-if="app.whatsIncluded.customTriggersExtra > 0" size="sm" @click="expandedTriggers = !expandedTriggers">
                {{ expandedTriggers ? 'View less' : `+ ${app.whatsIncluded.customTriggersExtra} more` }}
              </Link>
            </div>
          </div>

          <div class="included-separator"></div>

          <!-- Snapshots -->
          <div class="included-layout">
            <div class="included-left">
              <h3 class="included-heading">Snapshots</h3>
            </div>
            <div class="included-right">
              <div class="included-grid">
                <div v-for="snapshot in app.whatsIncluded.snapshots" :key="snapshot.name" class="included-card">
                  <Icon :name="snapshot.icon" :size="20" class="included-icon" />
                  <span class="included-label">{{ snapshot.name }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Variation 2 Content -->
        <div v-if="activeVariationTab === 'variation2'" class="variation-content-inner">
          <div class="variation-description">
            <p><strong>Single Column Layout:</strong> Header displayed above cards in a full-width layout. This layout stacks vertically for a clean, scannable design.</p>
          </div>

          <!-- Conversation Provider -->
          <div class="single-column-layout">
            <h3 class="included-heading">Conversation Provider</h3>
            <div class="included-grid">
              <div v-for="provider in app.whatsIncluded.conversationProviders" :key="provider.name" class="included-card">
                <Icon :name="provider.icon" :size="20" class="included-icon" />
                <div class="included-label-group">
                  <div class="included-label">{{ provider.name }}</div>
                  <div class="included-type">Type: {{ provider.type }}</div>
                </div>
              </div>
            </div>
          </div>

          <div class="included-separator"></div>

          <!-- Custom JS -->
          <div class="single-column-layout">
            <h3 class="included-heading">Custom JS</h3>
            <div class="included-grid">
              <div v-for="js in app.whatsIncluded.customJs" :key="js.name" class="included-card">
                <Icon :name="js.icon" :size="20" class="included-icon" />
                <span class="included-label">{{ js.name }}</span>
              </div>
            </div>
          </div>

          <div class="included-separator"></div>

          <!-- Custom Actions -->
          <div class="single-column-layout">
            <h3 class="included-heading">Custom Actions</h3>
            <div class="included-grid">
              <div v-for="(action, idx) in app.whatsIncluded.customActions" v-show="expandedActions || idx < 3" :key="action.name" class="included-card">
                <Icon :name="action.icon" :size="20" class="included-icon" />
                <div class="included-label-group">
                  <div class="included-label">{{ action.name }}</div>
                  <div class="included-desc" v-if="action.description">{{ action.description }}</div>
                </div>
              </div>
            </div>
            <Link v-if="app.whatsIncluded.customActionsExtra > 0" size="sm" @click="expandedActions = !expandedActions">
              {{ expandedActions ? 'View less' : `+ ${app.whatsIncluded.customActionsExtra} more` }}
            </Link>
          </div>

          <div class="included-separator"></div>

          <!-- Custom Triggers -->
          <div class="single-column-layout">
            <h3 class="included-heading">Custom Triggers</h3>
            <div class="included-grid">
              <div v-for="(trigger, idx) in app.whatsIncluded.customTriggers" v-show="expandedTriggers || idx < 3" :key="trigger.name" class="included-card">
                <Icon :name="trigger.icon" :size="20" class="included-icon" />
                <div class="included-label-group">
                  <div class="included-label">{{ trigger.name }}</div>
                  <div class="included-desc" v-if="trigger.description">{{ trigger.description }}</div>
                </div>
              </div>
            </div>
            <Link v-if="app.whatsIncluded.customTriggersExtra > 0" size="sm" @click="expandedTriggers = !expandedTriggers">
              {{ expandedTriggers ? 'View less' : `+ ${app.whatsIncluded.customTriggersExtra} more` }}
            </Link>
          </div>

          <div class="included-separator"></div>

          <!-- Snapshots -->
          <div class="single-column-layout">
            <h3 class="included-heading">Snapshots</h3>
            <div class="included-grid">
              <div v-for="snapshot in app.whatsIncluded.snapshots" :key="snapshot.name" class="included-card">
                <Icon :name="snapshot.icon" :size="20" class="included-icon" />
                <span class="included-label">{{ snapshot.name }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Variation 3 Content -->
        <div v-if="activeVariationTab === 'variation3'" class="variation-content-inner">
          <div class="variation-description">
            <p><strong>Horizontal Grid Layout:</strong> 2-column grid where sections are arranged side-by-side. This layout maximizes horizontal space for wide screens.</p>
          </div>

          <div class="variation3-grid">
            <!-- Conversation Provider -->
            <div class="included-layout">
              <div class="included-left">
                <h3 class="included-heading">Conversation Provider</h3>
              </div>
              <div class="included-right">
                <div class="included-grid">
                  <div v-for="provider in app.whatsIncluded.conversationProviders" :key="provider.name" class="included-card">
                    <Icon :name="provider.icon" :size="20" class="included-icon" />
                    <div class="included-label-group">
                      <div class="included-label">{{ provider.name }}</div>
                      <div class="included-type">Type: {{ provider.type }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Custom JS -->
            <div class="included-layout">
              <div class="included-left">
                <h3 class="included-heading">Custom JS</h3>
              </div>
              <div class="included-right">
                <div class="included-grid">
                  <div v-for="js in app.whatsIncluded.customJs" :key="js.name" class="included-card">
                    <Icon :name="js.icon" :size="20" class="included-icon" />
                    <span class="included-label">{{ js.name }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Custom Actions -->
            <div class="included-layout">
              <div class="included-left">
                <h3 class="included-heading">Custom Actions</h3>
              </div>
              <div class="included-right">
                <div class="included-grid">
                  <div v-for="(action, idx) in app.whatsIncluded.customActions" v-show="expandedActions || idx < 3" :key="action.name" class="included-card">
                    <Icon :name="action.icon" :size="20" class="included-icon" />
                    <div class="included-label-group">
                      <div class="included-label">{{ action.name }}</div>
                      <div class="included-desc" v-if="action.description">{{ action.description }}</div>
                    </div>
                  </div>
                </div>
                <Link v-if="app.whatsIncluded.customActionsExtra > 0" size="sm" @click="expandedActions = !expandedActions">
                  {{ expandedActions ? 'View less' : `+ ${app.whatsIncluded.customActionsExtra} more` }}
                </Link>
              </div>
            </div>

            <!-- Custom Triggers -->
            <div class="included-layout">
              <div class="included-left">
                <h3 class="included-heading">Custom Triggers</h3>
              </div>
              <div class="included-right">
                <div class="included-grid">
                  <div v-for="(trigger, idx) in app.whatsIncluded.customTriggers" v-show="expandedTriggers || idx < 3" :key="trigger.name" class="included-card">
                    <Icon :name="trigger.icon" :size="20" class="included-icon" />
                    <div class="included-label-group">
                      <div class="included-label">{{ trigger.name }}</div>
                      <div class="included-desc" v-if="trigger.description">{{ trigger.description }}</div>
                    </div>
                  </div>
                </div>
                <Link v-if="app.whatsIncluded.customTriggersExtra > 0" size="sm" @click="expandedTriggers = !expandedTriggers">
                  {{ expandedTriggers ? 'View less' : `+ ${app.whatsIncluded.customTriggersExtra} more` }}
                </Link>
              </div>
            </div>

            <!-- Snapshots -->
            <div class="included-layout">
              <div class="included-left">
                <h3 class="included-heading">Snapshots</h3>
              </div>
              <div class="included-right">
                <div class="included-grid">
                  <div v-for="snapshot in app.whatsIncluded.snapshots" :key="snapshot.name" class="included-card">
                    <Icon :name="snapshot.icon" :size="20" class="included-icon" />
                    <span class="included-label">{{ snapshot.name }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { appData } from '@/pages/AppDetail/data.js'
import TopNav from '@/pages/AppDetail/components/TopNav.vue'
import Icon from '@/components/Icon.vue'
import Link from '@/components/Link.vue'

const activeVariationTab = ref('variation1')
const expandedActions = ref(false)
const expandedTriggers = ref(false)

const app = appData
</script>

<style scoped>
.page {
  min-height: 100vh;
  background: var(--bg);
}

.section-title {
  margin: 32px 0 12px;
  display: inline-flex;
  align-items: center;
  gap: 12px;
  font-size: var(--hr-text-2xl);
  font-weight: 700;
  color: var(--gray-900);
}

.variations-intro {
  margin: 0 0 32px;
  font-size: var(--hr-text-md);
  color: var(--gray-600);
  line-height: 1.6;
}

.variations-tabs-wrapper {
  margin-bottom: 32px;
}

.variations-tabs {
  display: flex;
  gap: 8px;
  border-bottom: 1px solid var(--border);
}

.variation-tab {
  padding: 12px 16px;
  border: none;
  background: none;
  color: var(--gray-600);
  font-size: var(--hr-text-sm);
  font-weight: 500;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  transition: color 0.2s ease, border-color 0.2s ease;
  position: relative;
  bottom: -1px;
}

.variation-tab:hover {
  color: var(--gray-800);
}

.variation-tab.active {
  color: var(--primary-600);
  border-bottom-color: var(--primary-600);
}

.variation-content-inner {
  display: flex;
  flex-direction: column;
  gap: 0;
  padding: 32px 0;
}

.variation-description {
  margin-bottom: 24px;
  padding: 16px;
  background: var(--gray-50);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border);
}

.variation-description p {
  margin: 0;
  font-size: var(--hr-text-sm);
  color: var(--gray-700);
  line-height: 1.6;
}

/* Included Layouts */
.included-layout {
  display: grid;
  grid-template-columns: 150px 1fr;
  gap: 20px;
  margin-top: 12px;
  margin-bottom: 20px;
  align-items: start;
}

.included-left {
  min-width: 0;
}

.included-right {
  min-width: 0;
}

.included-heading {
  font-size: var(--hr-text-sm);
  font-weight: 600;
  color: var(--gray-900);
  margin: 0 0 12px;
}

.included-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 12px;
}

.included-card {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px;
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  background: var(--surface);
  cursor: pointer;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.included-card:hover {
  border-color: var(--primary-300, var(--primary-500));
  box-shadow: var(--shadow-sm);
}

.included-icon {
  flex-shrink: 0;
  color: var(--gray-600);
}

.included-label {
  font-size: var(--hr-text-sm);
  font-weight: 500;
  color: var(--gray-900);
  line-height: 1.4;
}

.included-label-group {
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
  min-width: 0;
}

.included-type {
  font-size: var(--hr-text-xs);
  color: var(--gray-500);
  line-height: 1.3;
}

.included-desc {
  font-size: var(--hr-text-xs);
  color: var(--gray-600);
  line-height: 1.3;
}

.included-separator {
  height: 1px;
  background: var(--border);
  margin: 20px 0;
}

/* Single Column Layout */
.single-column-layout {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 12px;
  margin-bottom: 20px;
}

/* Variation 3 Grid */
.variation3-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
}
</style>
