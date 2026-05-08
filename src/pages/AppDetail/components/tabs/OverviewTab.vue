<template>
  <div class="overview">
  <div class="overview-layout">
  <div class="overview-main">
    <!-- Media gallery: large preview + 2 small previews -->
    <section class="media">
      <button class="media-main" @click="playing = true" aria-label="Play product tour video">
        <template v-if="!playing">
          <img :src="app.media.video.poster" alt="" />
          <span class="play"><Icon name="play" :size="22" /></span>
          <span class="media-title">{{ app.media.video.title }}</span>
        </template>
        <iframe
          v-else
          :src="app.media.video.url"
          title="Product tour video"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowfullscreen
        />
      </button>
      <div class="media-side">
        <img v-for="(src, i) in app.media.images.slice(0, 2)" :key="i" :src="src" :alt="`Screenshot ${i + 1}`" />
        <div class="media-thumb-more">
          <img :src="app.media.images[2]" alt="Screenshot 3" />
          <button class="btn-tertiary">+ 3 more</button>
        </div>
      </div>
    </section>

    <!-- About -->
    <section class="block">
      <div class="about-container" :class="{ collapsed: !expandedAbout }">
        <div class="lead" v-html="app.about.description"></div>
        <div v-if="!expandedAbout" class="gradient-overlay"></div>
      </div>
      <Link size="sm" @click="expandedAbout = !expandedAbout">
        {{ expandedAbout ? 'Show less' : 'Show more' }}
      </Link>
      <ul class="bullets">
        <li v-for="b in app.about.bullets" :key="b">
          <span class="bullet-check"><Icon name="check" :size="12" /></span>
          {{ b }}
        </li>
      </ul>
      <div class="tags">
        <span v-for="t in app.about.tags" :key="t" class="tag">{{ t }}</span>
      </div>
    </section>

    <hr class="rule" />

    <!-- What's Included -->
    <section class="block">
      <h2 class="section-title">
        <Icon name="package" :size="18" />
        What's Included
      </h2>
      <p class="lead whats-included-desc">{{ app.whatsIncluded.description }}</p>

      <div class="included-separator"></div>

      <!-- Variations -->
      <div class="variations-section">
        <div class="variations-tabs">
          <button
            v-for="tab in ['variation1', 'variation2', 'variation3']"
            :key="tab"
            class="variation-tab"
            :class="{ active: activeVariationTab === tab }"
            @click="activeVariationTab = tab"
          >
            {{ tab === 'variation1' ? 'Variation 1' : tab === 'variation2' ? 'Variation 2' : 'Variation 3' }}
          </button>
        </div>

        <!-- Variation 1 Content -->
        <div v-if="activeVariationTab === 'variation1'" class="variation-content-inner">
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
        <div v-if="activeVariationTab === 'variation3'" class="variation3-grid">
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

    <hr class="rule" />

    <!-- Other Apps -->
    <section class="block">
      <h2 class="section-title">
        <Icon name="image" :size="18" />
        Other Apps From {Same Developer}
      </h2>
      <div class="other-apps">
        <a v-for="o in app.otherApps" :key="o.name" class="app-card" href="#">
          <span class="app-card-icon" :style="{ background: o.color }">{{ o.letter }}</span>
          <div class="app-card-meta">
            <div class="app-card-name">{{ o.name }}</div>
            <div class="app-card-cat">{{ o.category }}</div>
          </div>
        </a>
      </div>
    </section>

    <hr class="rule" />

  </div>

  <!-- Right sidebar: App Details -->
  <aside class="overview-sidebar">
    <div class="app-details-card">
      <h3 class="details-heading">App Details</h3>
      <div class="details-list">
        <div class="details-row">
          <span class="details-label">Category</span>
          <span class="details-value">{{ app.appDetails.categories.join(',  ') }}</span>
        </div>
        <div class="details-row">
          <span class="details-label">Business Niche</span>
          <span class="details-value">{{ app.appDetails.businessNiche.join(', ') }}</span>
        </div>
        <div class="details-row">
          <span class="details-label">Version</span>
          <span class="details-value">{{ app.appDetails.version }}</span>
        </div>
        <div class="details-row">
          <span class="details-label">Updated</span>
          <span class="details-value">{{ app.appDetails.updated }}</span>
        </div>
        <div class="details-row">
          <span class="details-label">Developer</span>
          <span class="details-value">{{ app.appDetails.developer }}</span>
        </div>
      </div>
    </div>
  </aside>

  </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Icon from '@/components/Icon.vue'
import Link from '@/components/Link.vue'

defineProps({ app: { type: Object, required: true } })
const playing = ref(false)
const expandedAbout = ref(false)
const expandedActions = ref(false)
const expandedTriggers = ref(false)
const activeVariationTab = ref('variation1')

function iconFor(key) {
  return ({
    support:    'help',
    docs:       'book',
    terms:      'fileText',
    privacy:    'shield',
    globe:      'globe'
  })[key] || 'globe'
}
</script>

<style scoped>
.overview { display: flex; flex-direction: column; gap: 32px; }
.overview-layout {
  display: grid;
  grid-template-columns: 1fr 280px;
  gap: 60px;
  align-items: start;
}
.overview-main { display: flex; flex-direction: column; gap: 32px; min-width: 0; }
.overview-sidebar { position: relative; }
.app-details-card {
  border: none;
  border-radius: var(--radius-lg);
  background: transparent;
  padding: 0px 20px;
}
.details-heading {
  margin: 0 0 16px;
  font-size: var(--hr-text-sm);
  font-weight: 600;
  color: var(--gray-900);
}
.details-list { display: flex; flex-direction: column; gap: 20px; }
.details-row {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.details-label {
  font-size: var(--hr-text-xs);
  color: var(--gray-500);
}
.details-value {
  font-size: var(--hr-text-sm);
  font-weight: 500;
  color: var(--gray-700);
}

/* Media */
.media {
  display: grid;
  grid-template-columns: 4.2fr 1fr;
  gap: 12px;
}
.media-main {
  position: relative; aspect-ratio: 16 / 9;
  border: 0; padding: 0; overflow: hidden;
  border-radius: var(--radius-lg);
  background: #000;
  cursor: pointer;
}
.media-main img { width: 100%; height: 100%; object-fit: cover; }
.media-main iframe { width: 100%; height: 100%; border: 0; }
.media-main .play {
  position: absolute; inset: 0; margin: auto;
  width: 56px; height: 56px; border-radius: 50%;
  background: var(--error-500); color: #fff;
  display: inline-flex; align-items: center; justify-content: center;
  pointer-events: none;
}
.media-title {
  position: absolute; top: 16px; inset-inline-start: 16px;
  color: #fff; font-weight: 600; font-size: var(--hr-text-md);
  text-shadow: 0 1px 2px rgba(0,0,0,.6);
}
.media-side { display: grid; grid-template-rows: 1fr 1fr 1fr; gap: 8px; height: 100%; }
.media-side > img {
  width: 100%; height: 100%; object-fit: cover;
  border-radius: var(--radius-lg);
  aspect-ratio: 4 / 3;
}
.media-thumb-more {
  position: relative;
  border-radius: var(--radius-lg);
  overflow: hidden;
  aspect-ratio: 4 / 3;
}
.media-thumb-more img {
  width: 100%; height: 100%; object-fit: cover;
  display: block;
  filter: brightness(0.45);
}
.btn-tertiary {
  position: absolute;
  inset: 0;
  margin: auto;
  width: fit-content;
  height: 36px;
  display: inline-flex;
  padding: 8px 14px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 8px;
  border: 1px solid var(--color-neutral-gray-300, #D0D5DD);
  background: var(--color-neutral-white-base, #FFF);
  box-shadow: 0 1px 2px 0 rgba(16, 24, 40, 0.05);
  color: var(--gray-700);
  font-size: var(--hr-text-sm);
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s ease, border-color 0.2s ease;
}
.btn-tertiary:hover { background: var(--gray-50); border-color: var(--gray-400); }

/* Sections */
.kicker {
  font-size: var(--hr-text-xs); font-weight: 600;
  letter-spacing: 0.08em; color: var(--gray-500);
  margin: 0 0 12px;
}
.lead {
  margin: 0 0 16px;
  font-size: var(--hr-text-lg);
  color: var(--gray-800);
  line-height: 1.6;
}
.lead p {
  margin: 0 0 12px;
  color: var(--gray-700);
}
.lead p:last-child {
  margin-bottom: 0;
}
.lead strong { font-weight: 600; }
.lead em { font-style: italic; }
.lead a { color: var(--primary-600); text-decoration: none; }
.lead a:hover { text-decoration: underline; }
.about-container {
  position: relative;
}
.about-container.collapsed {
  max-height: 480px;
  overflow: hidden;
}
.gradient-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 80px;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 100%);
  pointer-events: none;
}
.lead h4 {
  margin: 16px 0 8px;
  font-size: var(--hr-text-lg);
  font-weight: 600;
  color: var(--gray-900);
}
.lead h4:first-child {
  margin-top: 0;
}

/* What's Included */
.included-layout {
  display: grid;
  grid-template-columns: 170px 1fr;
  gap: 20px;
  /* margin-top: 12px; */
  /* margin-bottom: 20px; */
  align-items: start;
}
.included-left {
  min-width: 0;
}
.included-right {
  min-width: 0;
}
.actions-grid {
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
}
.whats-included-desc {
  font-size: var(--hr-text-sm);
  color: var(--gray-500);
}
.included-separator {
  height: 1px;
  background: var(--border);
  margin: 20px 0;
}
.included-section {
  margin-top: 20px;
}
.included-heading {
  font-size: var(--hr-text-sm);
  font-weight: 600;
  color: var(--gray-900);
  margin: 0 0 12px;
}
.included-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 12px;
}
.triggers-grid {
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
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

/* Variations Section */
.variations-section {
  margin-top: 12px;
}
.variations-tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
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
}
.single-column-layout {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 12px;
  margin-bottom: 20px;
}

/* Horizontal Layout Grid for Variation 3 */
.variation3-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
}
.trigger-card {
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
}
.trigger-content {
  width: 100%;
}
.trigger-name {
  font-size: var(--hr-text-sm);
  font-weight: 600;
  color: var(--gray-900);
}
.trigger-desc {
  font-size: var(--hr-text-xs);
  color: var(--gray-600);
  line-height: 1.3;
}
.bullets { margin: 0 0 16px; padding: 0; list-style: none; }
.bullets li {
  display: flex; align-items: flex-start; gap: 10px;
  font-size: var(--hr-text-sm);
  color: var(--gray-700);
  padding: 6px 0;
}
.bullet-check {
  width: 18px; height: 18px; border-radius: 50%;
  background: var(--success-50); color: var(--success-600);
  display: inline-flex; align-items: center; justify-content: center;
  flex-shrink: 0; margin-top: 1px;
}
.tags { display: flex; flex-wrap: wrap; gap: 8px; }
.tag {
  font-size: var(--hr-text-xs);
  padding: 4px 10px; border-radius: 999px;
  background: var(--gray-50); border: 1px solid var(--gray-200);
  color: var(--gray-700);
}

.rule { border: 0; border-top: 1px solid var(--border); margin: 0; }

.works-head {
  display: flex; align-items: center; justify-content: space-between;
  margin-bottom: 16px;
}
.works-head .kicker { margin: 0; }
.muted { color: var(--gray-500); font-size: var(--hr-text-sm); }
.integrations { display: flex; flex-wrap: wrap; gap: 8px; }
.integration {
  display: inline-flex; align-items: center; gap: 8px;
  background: var(--surface); border: 1px solid var(--border);
  border-radius: 999px;
  padding: 4px 12px 4px 4px;
  font-size: var(--hr-text-sm); color: var(--gray-800);
}
.i-icon {
  width: 22px; height: 22px; border-radius: 50%;
  display: inline-flex; align-items: center; justify-content: center;
  color: #fff; font-size: 11px; font-weight: 700;
}
.integration.more {
  padding: 6px 12px;
  background: var(--gray-50); color: var(--gray-700);
  cursor: pointer; border: 1px dashed var(--gray-300);
}

.section-title {
  margin: 0 0 12px;
  display: inline-flex; align-items: center; gap: 8px;
  font-size: var(--hr-text-xl);
  font-weight: 600; color: var(--gray-900);
}
.sub-title {
  margin: 16px 0 8px;
  font-size: var(--hr-text-sm); font-weight: 600;
  color: var(--gray-900);
}
.chips { display: flex; flex-wrap: wrap; gap: 12px; }
.chip {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 8px 14px; border: 1px solid var(--border);
  border-radius: var(--radius-md);
  font-size: var(--hr-text-sm); color: var(--gray-800);
  background: var(--surface);
}
.chip-icon { width: 20px; height: 20px; border-radius: 50%; }
.chip-help { color: var(--gray-400); margin-inline-start: 4px; }

.other-apps {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 16px;
}
.app-card {
  display: flex; flex-direction: column; gap: 10px;
  text-decoration: none;
}
.app-card-icon {
  width: 64px; height: 64px; border-radius: var(--radius-lg);
  display: inline-flex; align-items: center; justify-content: center;
  color: #fff; font-weight: 700; font-size: 22px;
  box-shadow: var(--shadow-xs);
}
.app-card-name {
  font-size: var(--hr-text-sm); font-weight: 600;
  color: var(--gray-900);
}
.app-card-cat {
  font-size: var(--hr-text-xs); color: var(--gray-500);
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 24px;
}
.info-block {}
.block-title {
  margin: 0 0 12px;
  font-size: var(--hr-text-md);
  font-weight: 600;
  color: var(--gray-900);
}
.list {
  list-style: none; margin: 0; padding: 0;
  display: flex; flex-direction: column; gap: 10px;
}
.list li {
  display: flex; align-items: center; gap: 8px;
  font-size: var(--hr-text-sm);
  color: var(--gray-700);
}
.resource-link {
  display: inline-flex; align-items: center; gap: 8px;
  color: var(--gray-700);
}
.resource-link:hover { color: var(--primary-600); }

@media (max-width: 900px) {
  .overview-layout { grid-template-columns: 1fr; }
  .overview-sidebar { position: static; }
}
@media (max-width: 720px) {
  .media { grid-template-columns: 1fr; }
  .media-side { grid-template-columns: 1fr 1fr; grid-template-rows: auto; }
  .info-grid { grid-template-columns: 1fr; }
}
</style>
