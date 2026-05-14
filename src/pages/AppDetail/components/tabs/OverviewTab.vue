<template>
  <div class="overview">
  <div class="overview-layout">
  <div class="overview-main">
    <!-- Media gallery: large preview + 2 small previews -->
    <section class="media">
      <button class="media-main" @click="openPreview(-1)" aria-label="Play product tour video">
        <img :src="app.media.video.poster" alt="" />
        <span class="play"><Icon name="play" :size="22" /></span>
        <span class="media-title">{{ app.media.video.title }}</span>
      </button>
      <div class="media-side">
        <button
          v-for="(src, i) in app.media.images.slice(0, 2)"
          :key="i"
          type="button"
          class="media-thumb"
          :class="{ 'is-selected': previewIndex === i }"
          @click="openPreview(i)"
        >
          <img :src="src" :alt="`Screenshot ${i + 1}`" />
        </button>
        <button
          type="button"
          class="media-thumb media-thumb-more"
          :class="{ 'is-selected': previewIndex === 2 }"
          @click="openPreview(2)"
        >
          <img :src="app.media.images[2]" alt="Screenshot 3" />
          <span class="btn-tertiary">+ 3 more</span>
        </button>
      </div>
    </section>

    <!-- Media previewer (video + images) -->
    <Teleport to="body">
      <div v-if="previewOpen" class="preview-overlay" role="dialog" aria-modal="true" aria-label="Media preview" @click.self="closePreview">
        <button class="preview-close" type="button" @click="closePreview" aria-label="Close preview">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
        </button>
        <button class="preview-nav preview-prev" type="button" @click="prevPreview" aria-label="Previous">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <div class="preview-stage" @click.self="closePreview">
          <div v-if="previewIndex === -1" class="preview-video-wrap">
            <iframe
              :src="`${app.media.video.url}?autoplay=1`"
              title="Product tour video"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowfullscreen
            />
          </div>
          <img v-else :src="app.media.images[previewIndex]" :alt="`Screenshot ${previewIndex + 1}`" class="preview-image" />
        </div>
        <button class="preview-nav preview-next" type="button" @click="nextPreview" aria-label="Next">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
        <div class="preview-counter">
          {{ previewIndex + 2 }} / {{ app.media.images.length + 1 }}
        </div>
      </div>
    </Teleport>

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

    <!-- Conversation AI Agent (Only for AI Agent Apps, hidden on My Apps) -->
    <section class="block" v-if="app.isAIAgent">
      <div style="display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 16px;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <h2 class="section-title" style="margin: 0;">
            Conversation AI agent
          </h2>
          <Tag size="sm" primary icon="">{{ agents.length }}</Tag>
        </div>
        <div class="agent-variation-toggle">
          <button :class="{ active: agentVariation === 'nav' }" @click="agentVariation = 'nav'">Left nav</button>
          <button :class="{ active: agentVariation === 'stack' }" @click="agentVariation = 'stack'">Stacked</button>
        </div>
      </div>

      <!-- Variation 1: Left Nav + Right Detail -->
      <div v-if="agentVariation === 'nav'" class="agent-panel">
        <!-- Left Nav -->
        <div class="agent-nav">
          <button
            v-for="agent in agents"
            :key="agent.id"
            class="agent-nav-item"
            :class="{ active: selectedAgentId === agent.id }"
            @click="selectedAgentId = agent.id"
          >
            <span class="agent-nav-avatar" :style="{ background: agent.avatarBg, color: agent.avatarFg }" v-html="agent.avatarIcon"></span>
            <span class="agent-nav-name">{{ agent.name }}</span>
          </button>
        </div>

        <!-- Right Detail -->
        <div class="agent-card" v-if="selectedAgent">
          <div class="agent-card-topbar">
            <div class="agent-header">
              <div class="agent-avatar" :style="{ background: selectedAgent.avatarBg, color: selectedAgent.avatarFg }" v-html="selectedAgent.avatarIcon"></div>
              <h3 class="agent-name">{{ selectedAgent.name }}</h3>
            </div>
            <button class="btn btn-secondary test-agent-btn">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              Test your agent
            </button>
          </div>

          <div class="agent-description-wrap">
            <p ref="navDescRef" class="agent-description" :class="{ clamped: !descExpanded }">{{ selectedAgent.description }}</p>
            <template v-if="isDescOverflowing">
              <div v-if="!descExpanded" class="desc-gradient"></div>
              <button class="desc-toggle-btn" @click="descExpanded = !descExpanded">
                {{ descExpanded ? 'Show less' : 'Show more' }}
              </button>
            </template>
          </div>

          <div class="agent-section-layout">
            <div class="agent-section-left">
              <h4 class="agent-section-title">Use cases</h4>
            </div>
            <div class="agent-section-right">
              <div class="agent-chips">
                <span v-for="uc in selectedAgent.useCases" :key="uc" class="agent-chip">{{ uc }}</span>
              </div>
            </div>
          </div>

          <div class="agent-section-layout">
            <div class="agent-section-left">
              <h4 class="agent-section-title">Supported channels</h4>
            </div>
            <div class="agent-section-right">
              <div class="agent-channels">
                <div v-for="ch in selectedAgent.channels" :key="ch.name" class="agent-channel-pill">
                  <span class="pill-icon" v-html="ch.icon"></span>
                  <span class="pill-text">{{ ch.name }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Pre-configured Actions -->
          <div class="agent-actions-section">
            <h3 class="agent-actions-title">Pre-configured actions included in the package</h3>
            <div v-for="(group, gIdx) in agentActionGroups" :key="group.name">
              <div class="included-layout">
                <div class="included-left">
                  <h3 class="included-heading">{{ group.name }}</h3>
                </div>
                <div class="included-right">
                  <div class="included-grid">
                    <div v-for="item in group.items" :key="item.name" class="included-card">
                      <span class="card-icon-tile perm-svg" :style="{ background: group.bg, color: group.color }" v-html="getItemIcon(item.name, '')"></span>
                      <div class="included-label-group">
                        <div class="included-label">{{ item.name }}</div>
                        <div v-if="item.description" class="included-desc">{{ item.description }}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="gIdx < agentActionGroups.length - 1" class="included-separator"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Variation 2: Stacked Cards (no left nav) -->
      <div v-if="agentVariation === 'stack'" class="agent-stack">
        <div v-for="agent in agents.slice(0, 1)" :key="agent.id" class="agent-card stacked-card">
          <div class="agent-card-topbar">
            <div class="agent-header">
              <div class="agent-avatar" :style="{ background: agent.avatarBg, color: agent.avatarFg }" v-html="agent.avatarIcon"></div>
              <h3 class="agent-name">{{ agent.name }}</h3>
            </div>
            <button class="btn btn-secondary test-agent-btn">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              Test your agent
            </button>
          </div>

          <div class="agent-description-wrap">
            <p ref="stackDescRef" class="agent-description" :class="{ clamped: !descExpanded }">{{ agent.description }}</p>
            <template v-if="isDescOverflowing">
              <div v-if="!descExpanded" class="desc-gradient"></div>
              <button class="desc-toggle-btn" @click="descExpanded = !descExpanded">
                {{ descExpanded ? 'Show less' : 'Show more' }}
              </button>
            </template>
          </div>

          <div class="agent-section-layout">
            <div class="agent-section-left">
              <h4 class="agent-section-title">Use cases</h4>
            </div>
            <div class="agent-section-right">
              <div class="agent-chips">
                <span v-for="uc in agent.useCases" :key="uc" class="agent-chip">{{ uc }}</span>
              </div>
            </div>
          </div>

          <div class="agent-section-layout">
            <div class="agent-section-left">
              <h4 class="agent-section-title">Supported channels</h4>
            </div>
            <div class="agent-section-right">
              <div class="agent-channels">
                <div v-for="c in agent.channels" :key="c.name" class="agent-channel-pill">
                  <span class="pill-icon" v-html="c.icon"></span>
                  <span class="pill-text">{{ c.name }}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="agent-actions-section">
            <h3 class="agent-actions-title">Pre-configured actions included in the package</h3>
            <div v-for="(group, gIdx) in agentActionGroups" :key="agent.id + '-' + group.name">
              <div class="included-layout">
                <div class="included-left">
                  <h3 class="included-heading">{{ group.name }}</h3>
                </div>
                <div class="included-right">
                  <div class="included-grid">
                    <div v-for="item in group.items" :key="item.name" class="included-card">
                      <span class="card-icon-tile perm-svg" :style="{ background: group.bg, color: group.color }" v-html="getItemIcon(item.name, '')"></span>
                      <div class="included-label-group">
                        <div class="included-label">{{ item.name }}</div>
                        <div v-if="item.description" class="included-desc">{{ item.description }}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="gIdx < agentActionGroups.length - 1" class="included-separator"></div>
            </div>
          </div>
        </div>
      </div>

    </section>

    <!-- What's Included (Only for My Apps Page - hidden on AI Agents) -->
    <section class="block" v-if="!app.isAIAgent">
      <h2 class="section-title" style="padding-block: 20px;">What's included</h2>
      <!-- Variations (Only for non-AI Agent Apps - My Apps Page) -->
      <div class="variations-section" v-if="!app.isAIAgent">
        <div class="variations-tabs">
          <button
            v-for="tab in ['variation1', 'variation2', 'variation3', 'variation4', 'variation5']"
            :key="tab"
            class="variation-tab"
            :class="{ active: activeVariationTab === tab }"
            @click="activeVariationTab = tab"
          >
            {{ ({ variation1: 'Variation 1', variation2: 'Variation 2', variation3: 'Variation 3', variation4: 'Variation 4', variation5: 'Variation 5' })[tab] }}
          </button>
        </div>

        <!-- Variation 1 Content -->
        <div v-if="activeVariationTab === 'variation1'" class="variation-content-inner variation1">
          <!-- Conversation Provider -->
          <div v-show="expandedSections || 1 <= 5" class="included-layout">
            <div class="included-left">
              <h3 class="included-heading">Conversation provider</h3>
            </div>
            <div class="included-right">
              <div class="included-grid">
                <div v-for="(provider, idx) in app.whatsIncluded.conversationProviders" v-show="expandedConvProviders || idx < 5" :key="provider.name" class="included-card">
                  <span class="card-icon-tile perm-svg" style="background: #EFF4FF; color: #155EEF;" v-html="getItemIcon(provider.name, 'Conversation provider')"></span>
                  <div class="included-label-group">
                    <div class="included-label">{{ provider.name }}</div>
                    <div class="included-type">Type: {{ provider.type }}</div>
                  </div>
                </div>
              </div>
              <button v-if="getConvProvidersExtra > 0" class="show-more-btn" @click="expandedConvProviders = !expandedConvProviders">
                {{ expandedConvProviders ? 'View less' : `+ ${getConvProvidersExtra} more` }}
              </button>
            </div>
          </div>

          <div v-show="expandedSections || 1 <= 5" class="included-separator"></div>

          <!-- Custom JS -->
          <div v-show="expandedSections || 2 <= 5" class="included-layout">
            <div class="included-left">
              <h3 class="included-heading">Custom JS</h3>
            </div>
            <div class="included-right">
              <div class="included-grid">
                <div v-for="(js, idx) in app.whatsIncluded.customJs" v-show="expandedCustomJs || idx < 5" :key="js.name" class="included-card">
                  <span class="card-icon-tile perm-svg" style="background: #F4F3FF; color: #7839EE;" v-html="getItemIcon(js.name, 'Custom JS')"></span>
                  <span class="included-label">{{ js.name }}</span>
                </div>
              </div>
              <button v-if="getCustomJsExtra > 0" class="show-more-btn" @click="expandedCustomJs = !expandedCustomJs">
                {{ expandedCustomJs ? 'View less' : `+ ${getCustomJsExtra} more` }}
              </button>
            </div>
          </div>

          <div v-show="expandedSections || 2 <= 5" class="included-separator"></div>

          <!-- Custom Actions -->
          <div v-show="expandedSections || 3 <= 5" class="included-layout">
            <div class="included-left">
              <h3 class="included-heading">Custom actions</h3>
            </div>
            <div class="included-right">
              <div class="included-grid">
                <div v-for="(action, idx) in app.whatsIncluded.customActions" v-show="expandedActions || idx < 5" :key="action.name" class="included-card">
                  <span class="card-icon-tile perm-svg" style="background: #FFFAEB; color: #DC6803;" v-html="getItemIcon(action.name, 'Custom actions')"></span>
                  <div class="included-label-group">
                    <div class="included-label">{{ action.name }}</div>
                    <div class="included-desc" v-if="action.description">{{ action.description }}</div>
                  </div>
                </div>
              </div>
              <button v-if="getCustomActionsExtra > 0" class="show-more-btn" @click="expandedActions = !expandedActions">
                {{ expandedActions ? 'View less' : `+ ${getCustomActionsExtra} more` }}
              </button>
            </div>
          </div>

          <div v-show="expandedSections || 3 <= 5" class="included-separator"></div>

          <!-- Custom Triggers -->
          <div v-show="expandedSections || 4 <= 5" class="included-layout">
            <div class="included-left">
              <h3 class="included-heading">Custom triggers</h3>
            </div>
            <div class="included-right">
              <div class="included-grid">
                <div v-for="(trigger, idx) in app.whatsIncluded.customTriggers" v-show="expandedTriggers || idx < 5" :key="trigger.name" class="included-card">
                  <span class="card-icon-tile perm-svg" style="background: #ECFDF3; color: #039855;" v-html="getItemIcon(trigger.name, 'Custom triggers')"></span>
                  <div class="included-label-group">
                    <div class="included-label">{{ trigger.name }}</div>
                    <div class="included-desc" v-if="trigger.description">{{ trigger.description }}</div>
                  </div>
                </div>
              </div>
              <button v-if="getCustomTriggersExtra > 0" class="show-more-btn" @click="expandedTriggers = !expandedTriggers">
                {{ expandedTriggers ? 'View less' : `+ ${getCustomTriggersExtra} more` }}
              </button>
            </div>
          </div>

          <div v-show="expandedSections || 4 <= 5" class="included-separator"></div>

          <!-- Snapshots -->
          <div v-show="expandedSections || 5 <= 5" class="included-layout">
            <div class="included-left">
              <h3 class="included-heading">Snapshots</h3>
            </div>
            <div class="included-right">
              <div class="included-grid">
                <div v-for="(snapshot, idx) in app.whatsIncluded.snapshots" v-show="expandedSnapshots || idx < 5" :key="snapshot.name" class="included-card">
                  <span class="card-icon-tile perm-svg" style="background: #ECFEFF; color: #0E7090;" v-html="getItemIcon(snapshot.name, 'Snapshots')"></span>
                  <div class="included-label-group">
                    <div class="included-label">{{ snapshot.name }}</div>
                    <Link size="xs" href="#">View assets</Link>
                  </div>
                </div>
              </div>
              <button v-if="getSnapshotsExtra > 0" class="show-more-btn" @click="expandedSnapshots = !expandedSnapshots">
                {{ expandedSnapshots ? 'View less' : `+ ${getSnapshotsExtra} more` }}
              </button>
            </div>
          </div>

          <div v-show="expandedSections || 5 <= 5" class="included-separator"></div>

          <!-- Webhooks -->
          <div v-show="expandedSections || 6 <= 5" class="included-layout">
            <div class="included-left">
              <h3 class="included-heading">Webhooks</h3>
            </div>
            <div class="included-right">
              <div class="included-grid">
                <div v-for="webhook in app.whatsIncluded.webhooks" :key="webhook.name" class="included-card">
                  <span class="card-icon-tile perm-svg" style="background: #FDF2FA; color: #DD2590;" v-html="getItemIcon(webhook.name, 'Webhooks')"></span>
                  <div class="included-label-group">
                    <div class="included-label">{{ webhook.name }}</div>
                    <div class="included-desc" v-if="webhook.description">{{ webhook.description }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-show="expandedSections || 6 <= 5" class="included-separator"></div>

          <!-- Integrations -->
          <div v-show="expandedSections || 7 <= 5" class="included-layout">
            <div class="included-left">
              <h3 class="included-heading">Integrations</h3>
            </div>
            <div class="included-right">
              <div class="included-grid">
                <div v-for="integration in app.whatsIncluded.integrations" :key="integration.name" class="included-card">
                  <span class="card-icon-tile perm-svg" style="background: #F0FDF9; color: #0E9384;" v-html="getItemIcon(integration.name, 'Integrations')"></span>
                  <div class="included-label-group">
                    <div class="included-label">{{ integration.name }}</div>
                    <div class="included-desc" v-if="integration.description">{{ integration.description }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-show="expandedSections || 7 <= 5" class="included-separator"></div>

          <!-- API Endpoints -->
          <div v-show="expandedSections || 8 <= 5" class="included-layout">
            <div class="included-left">
              <h3 class="included-heading">API endpoints</h3>
            </div>
            <div class="included-right">
              <div class="included-grid">
                <div v-for="endpoint in app.whatsIncluded.apiEndpoints" :key="endpoint.name" class="included-card">
                  <span class="card-icon-tile perm-svg" style="background: #FFF6ED; color: #E04F16;" v-html="getItemIcon(endpoint.name, 'API endpoints')"></span>
                  <div class="included-label-group">
                    <div class="included-label">{{ endpoint.name }}</div>
                    <div class="included-desc" v-if="endpoint.description">{{ endpoint.description }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Show more sections link -->
          <Link v-if="hiddenSections > 0 && !expandedSections" size="sm" @click="expandedSections = true" class="show-more-sections-link">
            Show {{ hiddenSections }} more
          </Link>
          <Link v-if="hiddenSections > 0 && expandedSections" size="sm" @click="expandedSections = false" class="show-more-sections-link">
            Show less
          </Link>
        </div>

        <!-- Variation 2 Content -->
        <div v-if="activeVariationTab === 'variation2'" class="variation-content-inner variation2">
          <!-- Conversation Provider -->
          <div v-show="expandedSections || 1 <= 5" class="single-column-layout">
            <h3 class="included-heading">Conversation provider</h3>
            <div class="included-grid">
              <div v-for="(provider, idx) in app.whatsIncluded.conversationProviders" v-show="expandedConvProviders || idx < 5" :key="provider.name" class="included-card">
                <span class="card-icon-tile perm-svg" style="background: #EFF4FF; color: #155EEF;" v-html="getItemIcon(provider.name, 'Conversation provider')"></span>
                <div class="included-label-group">
                  <div class="included-label">{{ provider.name }}</div>
                  <div class="included-type">Type: {{ provider.type }}</div>
                </div>
              </div>
            </div>
            <Link v-if="getConvProvidersExtra > 0" size="sm" @click="expandedConvProviders = !expandedConvProviders">
              {{ expandedConvProviders ? 'View less' : `+ ${getConvProvidersExtra} more` }}
            </Link>
          </div>

          <div v-show="expandedSections || 1 <= 5" class="included-separator"></div>

          <!-- Custom JS -->
          <div v-show="expandedSections || 2 <= 5" class="single-column-layout">
            <h3 class="included-heading">Custom JS</h3>
            <div class="included-grid">
              <div v-for="(js, idx) in app.whatsIncluded.customJs" v-show="expandedCustomJs || idx < 5" :key="js.name" class="included-card">
                <span class="card-icon-tile perm-svg" style="background: #F4F3FF; color: #7839EE;" v-html="getItemIcon(js.name, 'Custom JS')"></span>
                <span class="included-label">{{ js.name }}</span>
              </div>
            </div>
            <Link v-if="getCustomJsExtra > 0" size="sm" @click="expandedCustomJs = !expandedCustomJs">
              {{ expandedCustomJs ? 'View less' : `+ ${getCustomJsExtra} more` }}
            </Link>
          </div>

          <div v-show="expandedSections || 2 <= 5" class="included-separator"></div>

          <!-- Custom Actions -->
          <div v-show="expandedSections || 3 <= 5" class="single-column-layout">
            <h3 class="included-heading">Custom actions</h3>
            <div class="included-grid">
              <div v-for="(action, idx) in app.whatsIncluded.customActions" v-show="expandedActions || idx < 5" :key="action.name" class="included-card">
                <span class="card-icon-tile perm-svg" style="background: #FFFAEB; color: #DC6803;" v-html="getItemIcon(action.name, 'Custom actions')"></span>
                <div class="included-label-group">
                  <div class="included-label">{{ action.name }}</div>
                  <div class="included-desc" v-if="action.description">{{ action.description }}</div>
                </div>
              </div>
            </div>
            <Link v-if="getCustomActionsExtra > 0" size="sm" @click="expandedActions = !expandedActions">
              {{ expandedActions ? 'View less' : `+ ${getCustomActionsExtra} more` }}
            </Link>
          </div>

          <div v-show="expandedSections || 3 <= 5" class="included-separator"></div>

          <!-- Custom Triggers -->
          <div v-show="expandedSections || 4 <= 5" class="single-column-layout">
            <h3 class="included-heading">Custom triggers</h3>
            <div class="included-grid">
              <div v-for="(trigger, idx) in app.whatsIncluded.customTriggers" v-show="expandedTriggers || idx < 5" :key="trigger.name" class="included-card">
                <span class="card-icon-tile perm-svg" style="background: #ECFDF3; color: #039855;" v-html="getItemIcon(trigger.name, 'Custom triggers')"></span>
                <div class="included-label-group">
                  <div class="included-label">{{ trigger.name }}</div>
                  <div class="included-desc" v-if="trigger.description">{{ trigger.description }}</div>
                </div>
              </div>
            </div>
            <Link v-if="getCustomTriggersExtra > 0" size="sm" @click="expandedTriggers = !expandedTriggers">
              {{ expandedTriggers ? 'View less' : `+ ${getCustomTriggersExtra} more` }}
            </Link>
          </div>

          <div v-show="expandedSections || 4 <= 5" class="included-separator"></div>

          <!-- Snapshots -->
          <div v-show="expandedSections || 5 <= 5" class="single-column-layout">
            <h3 class="included-heading">Snapshots</h3>
            <div class="included-grid">
              <div v-for="(snapshot, idx) in app.whatsIncluded.snapshots" v-show="expandedSnapshots || idx < 5" :key="snapshot.name" class="included-card">
                <span class="card-icon-tile perm-svg" style="background: #ECFEFF; color: #0E7090;" v-html="getItemIcon(snapshot.name, 'Snapshots')"></span>
                <span class="included-label">{{ snapshot.name }}</span>
              </div>
            </div>
            <Link v-if="getSnapshotsExtra > 0" size="sm" @click="expandedSnapshots = !expandedSnapshots">
              {{ expandedSnapshots ? 'View less' : `+ ${getSnapshotsExtra} more` }}
            </Link>
          </div>

          <!-- Show more sections link -->
          <Link v-if="hiddenSections > 0 && !expandedSections" size="sm" @click="expandedSections = true" class="show-more-sections-link">
            Show {{ hiddenSections }} more
          </Link>
          <Link v-if="hiddenSections > 0 && expandedSections" size="sm" @click="expandedSections = false" class="show-more-sections-link">
            Show less
          </Link>
        </div>

        <!-- Variation 3 Content -->
        <div v-if="activeVariationTab === 'variation3'" class="variation3-grid">
          <!-- Conversation Provider -->
          <div v-show="expandedSections || 1 <= 5" class="included-layout">
            <div class="included-left">
              <h3 class="included-heading">Conversation provider</h3>
            </div>
            <div class="included-right">
              <div class="included-grid">
                <div v-for="(provider, idx) in app.whatsIncluded.conversationProviders" v-show="expandedConvProviders || idx < 5" :key="provider.name" class="included-card">
                  <Icon :name="provider.icon" :size="20" class="included-icon" />
                  <div class="included-label-group">
                    <div class="included-label">{{ provider.name }}</div>
                    <div class="included-type">Type: {{ provider.type }}</div>
                  </div>
                </div>
              </div>
              <button v-if="getConvProvidersExtra > 0" class="show-more-btn" @click="expandedConvProviders = !expandedConvProviders">
                {{ expandedConvProviders ? 'View less' : `+ ${getConvProvidersExtra} more` }}
              </button>
            </div>
          </div>

          <!-- Custom JS -->
          <div v-show="expandedSections || 2 <= 5" class="included-layout">
            <div class="included-left">
              <h3 class="included-heading">Custom JS</h3>
            </div>
            <div class="included-right">
              <div class="included-grid">
                <div v-for="(js, idx) in app.whatsIncluded.customJs" v-show="expandedCustomJs || idx < 5" :key="js.name" class="included-card">
                  <Icon :name="js.icon" :size="20" class="included-icon" />
                  <span class="included-label">{{ js.name }}</span>
                </div>
              </div>
              <button v-if="getCustomJsExtra > 0" class="show-more-btn" @click="expandedCustomJs = !expandedCustomJs">
                {{ expandedCustomJs ? 'View less' : `+ ${getCustomJsExtra} more` }}
              </button>
            </div>
          </div>

          <!-- Custom Actions -->
          <div v-show="expandedSections || 3 <= 5" class="included-layout">
            <div class="included-left">
              <h3 class="included-heading">Custom actions</h3>
            </div>
            <div class="included-right">
              <div class="included-grid">
                <div v-for="(action, idx) in app.whatsIncluded.customActions" v-show="expandedActions || idx < 5" :key="action.name" class="included-card">
                  <Icon :name="action.icon" :size="20" class="included-icon" />
                  <div class="included-label-group">
                    <div class="included-label">{{ action.name }}</div>
                    <div class="included-desc" v-if="action.description">{{ action.description }}</div>
                  </div>
                </div>
              </div>
              <button v-if="getCustomActionsExtra > 0" class="show-more-btn" @click="expandedActions = !expandedActions">
                {{ expandedActions ? 'View less' : `+ ${getCustomActionsExtra} more` }}
              </button>
            </div>
          </div>

          <!-- Custom Triggers -->
          <div v-show="expandedSections || 4 <= 5" class="included-layout">
            <div class="included-left">
              <h3 class="included-heading">Custom triggers</h3>
            </div>
            <div class="included-right">
              <div class="included-grid">
                <div v-for="(trigger, idx) in app.whatsIncluded.customTriggers" v-show="expandedTriggers || idx < 5" :key="trigger.name" class="included-card">
                  <Icon :name="trigger.icon" :size="20" class="included-icon" />
                  <div class="included-label-group">
                    <div class="included-label">{{ trigger.name }}</div>
                    <div class="included-desc" v-if="trigger.description">{{ trigger.description }}</div>
                  </div>
                </div>
              </div>
              <button v-if="getCustomTriggersExtra > 0" class="show-more-btn" @click="expandedTriggers = !expandedTriggers">
                {{ expandedTriggers ? 'View less' : `+ ${getCustomTriggersExtra} more` }}
              </button>
            </div>
          </div>

          <!-- Snapshots -->
          <div v-show="expandedSections || 5 <= 5" class="included-layout">
            <div class="included-left">
              <h3 class="included-heading">Snapshots</h3>
            </div>
            <div class="included-right">
              <div class="included-grid">
                <div v-for="(snapshot, idx) in app.whatsIncluded.snapshots" v-show="expandedSnapshots || idx < 5" :key="snapshot.name" class="included-card">
                  <Icon :name="snapshot.icon" :size="20" class="included-icon" />
                  <div class="included-label-group">
                    <div class="included-label">{{ snapshot.name }}</div>
                    <Link size="xs" href="#">View assets</Link>
                  </div>
                </div>
              </div>
              <button v-if="getSnapshotsExtra > 0" class="show-more-btn" @click="expandedSnapshots = !expandedSnapshots">
                {{ expandedSnapshots ? 'View less' : `+ ${getSnapshotsExtra} more` }}
              </button>
            </div>
          </div>

          <!-- Show more sections link -->
          <Link v-if="hiddenSections > 0 && !expandedSections" size="sm" @click="expandedSections = true" class="show-more-sections-link">
            Show {{ hiddenSections }} more
          </Link>
          <Link v-if="hiddenSections > 0 && expandedSections" size="sm" @click="expandedSections = false" class="show-more-sections-link">
            Show less
          </Link>
        </div>

        <!-- Variation 4: Section cards with colored icons + count badges (scalable, all sections in one glance) -->
        <div v-if="activeVariationTab === 'variation4'" class="variation4-grid">
          <div v-for="section in whatsInsideSections" :key="section.id" class="inside-section-card">
            <div class="inside-section-head">
              <span class="inside-section-icon" :style="{ background: section.bg, color: section.color }">
                <Icon :name="section.icon" :size="18" />
              </span>
              <div class="inside-section-meta">
                <div class="inside-section-title">{{ section.label }}</div>
                <div class="inside-section-count">{{ section.items.length }} {{ section.items.length === 1 ? 'item' : 'items' }}</div>
              </div>
            </div>
            <ul class="inside-section-items">
              <li v-for="item in section.items.slice(0, 4)" :key="item.name" class="inside-section-item">
                <Icon :name="item.icon || section.icon" :size="14" class="inside-section-item-icon" />
                <span>{{ item.name }}</span>
              </li>
            </ul>
            <Link v-if="section.items.length > 4" size="xs" href="#">
              + {{ section.items.length - 4 }} more
            </Link>
          </div>
        </div>

        <!-- Variation 5: Sub-tab navigator (scalable to any number of sections, content stays focused) -->
        <div v-if="activeVariationTab === 'variation5'" class="variation5-wrap">
          <div class="inside-subnav" role="tablist">
            <button
              v-for="section in whatsInsideSections"
              :key="section.id"
              role="tab"
              :aria-selected="activeInsideCategory === section.id"
              class="inside-subnav-tab"
              :class="{ active: activeInsideCategory === section.id }"
              @click="activeInsideCategory = section.id"
            >
              <span class="inside-subnav-icon" :style="{ background: section.bg, color: section.color }">
                <Icon :name="section.icon" :size="14" />
              </span>
              <span class="inside-subnav-label">{{ section.label }}</span>
              <span class="inside-subnav-count">{{ section.items.length }}</span>
            </button>
          </div>
          <div class="inside-subnav-panel">
            <template v-for="section in whatsInsideSections" :key="section.id">
              <div v-if="activeInsideCategory === section.id" class="inside-subnav-grid">
                <div v-for="item in section.items" :key="item.name" class="included-card">
                  <Icon :name="item.icon || section.icon" :size="20" class="included-icon" />
                  <div class="included-label-group">
                    <div class="included-label">{{ item.name }}</div>
                    <div v-if="item.description" class="included-desc">{{ item.description }}</div>
                    <div v-else-if="item.type" class="included-type">Type: {{ item.type }}</div>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>

      <!-- Conversation Provider -->
      <template v-if="false">
      <div v-show="expandedConvProviders || 1 <= 5" class="included-layout">
        <div class="included-left">
          <h3 class="included-heading">Conversation provider</h3>
        </div>
        <div class="included-right">
          <div class="included-grid">
            <div v-for="(provider, idx) in app.whatsIncluded.conversationProviders" v-show="expandedConvProviders || idx < 5" :key="provider.name" class="included-card">
              <Icon :name="provider.icon" :size="20" class="included-icon" />
              <div class="included-label-group">
                <div class="included-label">{{ provider.name }}</div>
                <div class="included-type">Type: {{ provider.type }}</div>
              </div>
            </div>
          </div>
          <button v-if="getConvProvidersExtra > 0" class="show-more-btn" @click="expandedConvProviders = !expandedConvProviders">
            {{ expandedConvProviders ? 'View less' : `+ ${getConvProvidersExtra} more` }}
          </button>
        </div>
      </div>

      <div v-show="expandedConvProviders || 1 <= 5" class="included-separator"></div>

      <!-- Custom JS -->
      <div v-show="expandedCustomJs || 2 <= 5" class="included-layout">
        <div class="included-left">
          <h3 class="included-heading">Custom JS</h3>
        </div>
        <div class="included-right">
          <div class="included-grid">
            <div v-for="(js, idx) in app.whatsIncluded.customJs" v-show="expandedCustomJs || idx < 5" :key="js.name" class="included-card">
              <Icon :name="js.icon" :size="20" class="included-icon" />
              <span class="included-label">{{ js.name }}</span>
            </div>
          </div>
          <button v-if="getCustomJsExtra > 0" class="show-more-btn" @click="expandedCustomJs = !expandedCustomJs">
            {{ expandedCustomJs ? 'View less' : `+ ${getCustomJsExtra} more` }}
          </button>
        </div>
      </div>

      <div v-show="expandedCustomJs || 2 <= 5" class="included-separator"></div>

      <!-- Custom Actions -->
      <div v-show="expandedActions || 3 <= 5" class="included-layout">
        <div class="included-left">
          <h3 class="included-heading">Custom actions</h3>
        </div>
        <div class="included-right">
          <div class="included-grid">
            <div v-for="(action, idx) in app.whatsIncluded.customActions" v-show="expandedActions || idx < 5" :key="action.name" class="included-card">
              <Icon :name="action.icon" :size="20" class="included-icon" />
              <div class="included-label-group">
                <div class="included-label">{{ action.name }}</div>
                <div class="included-desc" v-if="action.description">{{ action.description }}</div>
              </div>
            </div>
          </div>
          <button v-if="getCustomActionsExtra > 0" class="show-more-btn" @click="expandedActions = !expandedActions">
            {{ expandedActions ? 'View less' : `+ ${getCustomActionsExtra} more` }}
          </button>
        </div>
      </div>

      <div v-show="expandedActions || 3 <= 5" class="included-separator"></div>

      <!-- Custom Triggers -->
      <div v-show="expandedTriggers || 4 <= 5" class="included-layout">
        <div class="included-left">
          <h3 class="included-heading">Custom triggers</h3>
        </div>
        <div class="included-right">
          <div class="included-grid">
            <div v-for="(trigger, idx) in app.whatsIncluded.customTriggers" v-show="expandedTriggers || idx < 5" :key="trigger.name" class="included-card">
              <Icon :name="trigger.icon" :size="20" class="included-icon" />
              <div class="included-label-group">
                <div class="included-label">{{ trigger.name }}</div>
                <div class="included-desc" v-if="trigger.description">{{ trigger.description }}</div>
              </div>
            </div>
          </div>
          <button v-if="getCustomTriggersExtra > 0" class="show-more-btn" @click="expandedTriggers = !expandedTriggers">
            {{ expandedTriggers ? 'View less' : `+ ${getCustomTriggersExtra} more` }}
          </button>
        </div>
      </div>

      <div v-show="expandedTriggers || 4 <= 5" class="included-separator"></div>

      <!-- Snapshots -->
      <div v-show="expandedSnapshots || 5 <= 5" class="included-layout">
        <div class="included-left">
          <h3 class="included-heading">Snapshots</h3>
        </div>
        <div class="included-right">
          <div class="included-grid">
            <div v-for="(snapshot, idx) in app.whatsIncluded.snapshots" v-show="expandedSnapshots || idx < 5" :key="snapshot.name" class="included-card">
              <Icon :name="snapshot.icon" :size="20" class="included-icon" />
              <div class="included-label-group">
                <div class="included-label">{{ snapshot.name }}</div>
                <Link size="xs" href="#">View assets</Link>
              </div>
            </div>
          </div>
          <button v-if="getSnapshotsExtra > 0" class="show-more-btn" @click="expandedSnapshots = !expandedSnapshots">
            {{ expandedSnapshots ? 'View less' : `+ ${getSnapshotsExtra} more` }}
          </button>
        </div>
      </div>
      </template>
    </section>

    <!-- Resources (Visible on Both Pages) -->
    <section v-if="app.resources" class="block resources-section">
      <div class="resources-title-row">
        <h2 class="section-title" style="margin:0; display:block;">Resources</h2>
        <Tag warning size="md" icon="" style="font-size: var(--hr-text-xs);">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" style="margin-right:4px;flex-shrink:0">
            <circle cx="8" cy="8" r="7.5" stroke="#B54708" stroke-width="1.5" fill="none"/>
            <path d="M8 4.5v4.5" stroke="#B54708" stroke-width="1.5" stroke-linecap="round" />
            <circle cx="8" cy="11.5" r="0.9" fill="#B54708" />
          </svg>
          This is visible only to agency admins and users.
        </Tag>
      </div>

      <div class="dev-resources-rows">
        <div class="dev-resources-row">
          <a v-if="app.resources.website" :href="app.resources.website" target="_blank" rel="noopener" class="dev-resource-link dev-resource-link--external">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <circle cx="10" cy="10" r="7.5" stroke="currentColor" stroke-width="1.4"/>
              <ellipse cx="10" cy="10" rx="3" ry="7.5" stroke="currentColor" stroke-width="1.4"/>
              <path d="M2.5 10h15" stroke="currentColor" stroke-width="1.4"/>
            </svg>
            <span>Website</span>
            <span class="ext-btn" aria-label="Open in new tab" role="img">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M8 4.5H5.5A1.5 1.5 0 0 0 4 6v8.5A1.5 1.5 0 0 0 5.5 16H14a1.5 1.5 0 0 0 1.5-1.5V12M11 4.5h4.5V9M15 5l-6.5 6.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
          </a>
          <a v-if="app.resources.documentationUrl" :href="app.resources.documentationUrl" target="_blank" rel="noopener" class="dev-resource-link dev-resource-link--external">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M5 2.5h6.5L15.5 6.5v10a1 1 0 0 1-1 1h-9.5a1 1 0 0 1-1-1v-13a1 1 0 0 1 1-1Z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/>
              <path d="M11.5 2.5v4h4" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/>
            </svg>
            <span>Documentation</span>
            <span class="ext-btn" aria-label="Open in new tab" role="img">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M8 4.5H5.5A1.5 1.5 0 0 0 4 6v8.5A1.5 1.5 0 0 0 5.5 16H14a1.5 1.5 0 0 0 1.5-1.5V12M11 4.5h4.5V9M15 5l-6.5 6.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
          </a>
        </div>
        <div class="dev-resources-row">
          <a v-if="app.resources.supportWebsiteUrl" :href="app.resources.supportWebsiteUrl" target="_blank" rel="noopener" class="dev-resource-link dev-resource-link--external">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <circle cx="10" cy="10" r="7.5" stroke="currentColor" stroke-width="1.4"/>
              <ellipse cx="10" cy="10" rx="3" ry="7.5" stroke="currentColor" stroke-width="1.4"/>
              <path d="M2.5 10h15" stroke="currentColor" stroke-width="1.4"/>
            </svg>
            <span>Support website</span>
            <span class="ext-btn" aria-label="Open in new tab" role="img">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M8 4.5H5.5A1.5 1.5 0 0 0 4 6v8.5A1.5 1.5 0 0 0 5.5 16H14a1.5 1.5 0 0 0 1.5-1.5V12M11 4.5h4.5V9M15 5l-6.5 6.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
          </a>
          <span v-if="app.resources.supportEmail" class="dev-resource-link dev-resource-value">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <rect x="2.5" y="4.5" width="15" height="11" rx="1.5" stroke="#667085" stroke-width="1.4"/>
              <path d="M2.5 6l7.5 5L17.5 6" stroke="#667085" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <a :href="`mailto:${app.resources.supportEmail}`">{{ app.resources.supportEmail }}</a>
            <button
              class="copy-btn"
              :class="{ copied: copiedKey === app.resources.supportEmail }"
              type="button"
              :aria-label="`Copy ${app.resources.supportEmail}`"
              @click="copyToClipboard(app.resources.supportEmail)"
            >
              <svg v-if="copiedKey === app.resources.supportEmail" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M4 10.5l4 4 8-9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <rect x="6.5" y="6.5" width="9" height="11" rx="1.5" stroke="currentColor" stroke-width="1.6"/>
                <path d="M4.5 13.5h-.5a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v.5" stroke="currentColor" stroke-width="1.6"/>
              </svg>
              <span v-if="copiedKey === app.resources.supportEmail" class="copy-toast">Copied!</span>
            </button>
          </span>
          <span v-if="app.resources.supportPhone" class="dev-resource-link dev-resource-value">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M4 3h3l1.5 4-2 1.5a10 10 0 0 0 5 5L13 11.5l4 1.5v3A1.5 1.5 0 0 1 15.5 17.5C8.5 17.5 2.5 11.5 2.5 4.5A1.5 1.5 0 0 1 4 3Z" stroke="#667085" stroke-width="1.4" stroke-linejoin="round"/>
            </svg>
            <a :href="`tel:${app.resources.supportPhone}`">{{ app.resources.supportPhone }}</a>
            <button
              class="copy-btn"
              :class="{ copied: copiedKey === app.resources.supportPhone }"
              type="button"
              :aria-label="`Copy ${app.resources.supportPhone}`"
              @click="copyToClipboard(app.resources.supportPhone)"
            >
              <svg v-if="copiedKey === app.resources.supportPhone" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M4 10.5l4 4 8-9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <rect x="6.5" y="6.5" width="9" height="11" rx="1.5" stroke="currentColor" stroke-width="1.6"/>
                <path d="M4.5 13.5h-.5a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v.5" stroke="currentColor" stroke-width="1.6"/>
              </svg>
              <span v-if="copiedKey === app.resources.supportPhone" class="copy-toast">Copied!</span>
            </button>
          </span>
        </div>
      </div>
    </section>

    <!-- Similar Apps -->
    <section v-if="app.similarApps?.length" class="block">
      <div class="section-title-row">
        <h2 class="section-title">Similar apps like</h2>
        <a href="#" class="view-more-link" @click.prevent>
          View more
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M7.5 4.5l6 5.5-6 5.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </a>
      </div>
      <div class="other-apps">
        <a v-for="o in app.similarApps.slice(0, 3)" :key="o.name" class="app-card" href="#">
          <div class="app-card-top">
            <span class="app-card-icon" :style="{ background: o.color }">{{ o.letter }}</span>
            <div class="app-card-identity">
              <div class="app-card-name">{{ o.name }}</div>
              <div class="app-card-by">By {{ o.developer || app.developer }}</div>
            </div>
            <span class="app-card-installs">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M8 1.5v9M8 10.5l3-3M8 10.5l-3-3M2.5 11v2a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1v-2" stroke="#667085" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              {{ formatNumber(o.installs ?? 12000) }}
            </span>
          </div>
          <div class="app-card-tagline">{{ o.description || o.category }}</div>
          <div class="app-card-rating">
            <span class="app-card-stars">
              <svg v-for="i in 5" :key="i" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" :fill="i <= Math.round(o.rating ?? 4.5) ? '#FBBF24' : '#E5E7EB'" aria-hidden="true">
                <path d="M8 1.5l1.96 4.18 4.54.5-3.4 3.08.94 4.49L8 11.4l-4.04 2.35.94-4.49L1.5 6.18l4.54-.5L8 1.5Z"/>
              </svg>
            </span>
            <span class="app-card-rating-val">{{ (o.rating ?? 4.5).toFixed(1) }}({{ o.reviewCount ?? 16 }})</span>
          </div>
          <div class="app-card-tags">
            <span class="app-card-tag">{{ o.pricing || 'Free' }}</span>
            <span v-if="o.whiteLabel" class="app-card-tag app-card-tag--wl">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M3 8l3.5 3.5L13 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
              WL
            </span>
            <span v-if="o.installed" class="app-card-tag app-card-tag--installed">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M3 8l3.5 3.5L13 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
              Installed
            </span>
          </div>
        </a>
      </div>
    </section>

    <!-- Other Apps (Visible on Both Pages) -->
    <section class="block">
      <div class="section-title-row">
        <h2 class="section-title">Other apps from {Same Developer}</h2>
        <a href="#" class="view-more-link" @click.prevent>
          View more
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M7.5 4.5l6 5.5-6 5.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </a>
      </div>
      <div class="other-apps">
        <a v-for="o in app.otherApps.slice(0, 3)" :key="o.name" class="app-card" href="#">
          <div class="app-card-top">
            <span class="app-card-icon" :style="{ background: o.color }">{{ o.letter }}</span>
            <div class="app-card-identity">
              <div class="app-card-name">{{ o.name }}</div>
              <div class="app-card-by">By {{ o.developer || app.developer }}</div>
            </div>
            <span class="app-card-installs">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M8 1.5v9M8 10.5l3-3M8 10.5l-3-3M2.5 11v2a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1v-2" stroke="#667085" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              {{ formatNumber(o.installs ?? 8500) }}
            </span>
          </div>
          <div class="app-card-tagline">{{ o.description || o.category }}</div>
          <div class="app-card-rating">
            <span class="app-card-stars">
              <svg v-for="i in 5" :key="i" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" :fill="i <= Math.round(o.rating ?? 4.5) ? '#FBBF24' : '#E5E7EB'" aria-hidden="true">
                <path d="M8 1.5l1.96 4.18 4.54.5-3.4 3.08.94 4.49L8 11.4l-4.04 2.35.94-4.49L1.5 6.18l4.54-.5L8 1.5Z"/>
              </svg>
            </span>
            <span class="app-card-rating-val">{{ (o.rating ?? 4.5).toFixed(1) }}({{ o.reviewCount ?? 16 }})</span>
          </div>
          <div class="app-card-tags">
            <span class="app-card-tag">{{ o.pricing || 'Free' }}</span>
            <span v-if="o.whiteLabel" class="app-card-tag app-card-tag--wl">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M3 8l3.5 3.5L13 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
              WL
            </span>
            <span v-if="o.installed" class="app-card-tag app-card-tag--installed">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M3 8l3.5 3.5L13 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
              Installed
            </span>
          </div>
        </a>
      </div>
    </section>

  </div>

  <!-- Right sidebar: App Details -->
  <aside class="overview-sidebar">
    <div class="app-details-card">
      <h3 class="details-heading">App details</h3>
      <div class="details-list">
        <div class="details-row">
          <span class="details-label">Category</span>
          <span class="details-value">{{ app.appDetails.categories.join(',  ') }}</span>
        </div>
        <div class="details-row">
          <span class="details-label">Business niche</span>
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
import { ref, computed, watch, nextTick, onMounted, onBeforeUnmount } from 'vue'
import Icon from '@/components/Icon.vue'
import Link from '@/components/Link.vue'
import Tag from '@/components/Tag.vue'
import { permissionIcons } from '../../permissionIcons.js'
import { itemIcons } from '../../itemIcons.js'

const sectionPermissionMap = {
  'Conversation provider': 'Conversations',
  'Custom JS':              'Objects',
  'Custom actions':         'Workflows',
  'Custom triggers':        'Workflows',
  'Snapshots':              'Snapshots',
  'Webhooks':               'Marketplace Installer Details',
  'Integrations':           'SaaS',
  'API endpoints':          'OAuth',
}
const channelIcons = {
  Facebook: `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 22 22" fill="none"><path d="M22 11C22 4.92486 17.0751 0 11 0C4.92486 0 0 4.92486 0 11C0 16.4903 4.02252 21.0412 9.28125 21.8664V14.1797H6.48828V11H9.28125V8.57656C9.28125 5.81969 10.9235 4.29687 13.4361 4.29687C14.6392 4.29687 15.8984 4.51172 15.8984 4.51172V7.21875H14.5114C13.145 7.21875 12.7188 8.06674 12.7188 8.9375V11H15.7695L15.2818 14.1797H12.7188V21.8664C17.9775 21.0412 22 16.4903 22 11Z" fill="#1877F2"/></svg>`,
  Call: `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 22 22" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M6.32976 3.35682C6.06963 3.22524 5.76242 3.22524 5.50229 3.35682C5.40446 3.4063 5.28251 3.51196 4.74441 4.05006L4.59991 4.19456C4.08638 4.70809 3.94795 4.85661 3.8373 5.05359C3.70905 5.2819 3.6016 5.69508 3.60238 5.95695C3.60307 6.18997 3.63747 6.3303 3.78896 6.86403C4.5366 9.49814 5.94698 11.9839 8.02262 14.0596C10.0982 16.1352 12.584 17.5456 15.2182 18.2932C15.7519 18.4447 15.8922 18.4791 16.1252 18.4798C16.3871 18.4806 16.8003 18.3731 17.0286 18.2449C17.2256 18.1342 17.3741 17.9958 17.8876 17.4823L18.0321 17.3378C18.5702 16.7997 18.6759 16.6777 18.7254 16.5799C18.8569 16.3198 18.8569 16.0126 18.7254 15.7524C18.6759 15.6546 18.5702 15.5326 18.0321 14.9945L17.8535 14.8159C17.4999 14.4623 17.4204 14.3899 17.3602 14.3508C17.0563 14.1532 16.6647 14.1532 16.3608 14.3508C16.3006 14.3899 16.2211 14.4623 15.8675 14.8159C15.7638 14.92 15.6596 15.0245 15.5346 15.1141C15.0882 15.4337 14.4813 15.5372 13.9542 15.3835C13.8072 15.3407 13.6861 15.2823 13.592 15.237C12.1494 14.5443 10.8187 13.6147 9.64307 12.4391C8.46747 11.2635 7.53789 9.9328 6.85573 8.512C6.79984 8.39604 6.7415 8.27503 6.69865 8.12802C6.54499 7.6009 6.64848 6.99401 6.96813 6.54761C7.05768 6.42253 7.1622 6.31839 7.24476 6.23613C7.61985 5.8611 7.69224 5.78161 7.73142 5.72135C7.92896 5.41752 7.92896 5.02584 7.73142 4.72202C7.69224 4.66176 7.61984 4.58226 7.26628 4.22869L7.08765 4.05006C6.54954 3.51196 6.42759 3.4063 6.32976 3.35682ZM4.67482 1.72085C5.45522 1.32612 6.37683 1.32612 7.15723 1.72085C7.55378 1.92142 7.89803 2.26655 8.29627 2.66581L8.56264 2.93233C8.88329 3.25247 9.10964 3.47844 9.26844 3.72268C9.86106 4.63416 9.86106 5.80921 9.26844 6.72068C9.10964 6.96493 8.88329 7.1909 8.62052 7.45322L8.56264 7.51103C8.46541 7.62789 8.47513 7.64874 8.50844 7.71849C9.10228 8.95533 9.91214 10.1155 10.9394 11.1428C11.9667 12.17 13.1269 12.9799 14.3637 13.5737C14.4714 13.6181 14.5712 13.5195 14.629 13.4617C14.8913 13.1989 15.1173 12.9725 15.3615 12.8137C16.273 12.2211 17.448 12.2211 18.3595 12.8137C18.6037 12.9725 18.8297 13.1989 19.092 13.4617L19.3285 13.6982C19.8156 14.1841 20.1608 14.5284 20.3613 14.925C20.7561 15.7053 20.7561 16.627 20.3613 17.4074C20.1608 17.8039 19.8156 18.1482 19.4164 18.5464L19.184 18.7786C18.6954 19.2677 18.3684 19.5951 17.9265 19.8433C17.4224 20.1265 16.698 20.3149 16.1198 20.3131C15.6139 20.3116 15.245 20.2068 14.7692 20.0716C11.7904 19.2261 9.02859 17.6583 6.72625 15.3559C4.42392 13.0536 2.8561 10.2917 2.02529 7.36461C1.87541 6.83723 1.77056 6.4683 1.76905 5.9624C1.76733 5.3842 1.95571 4.65981 2.2389 4.15569C2.48713 3.7138 2.81452 3.38674 3.24145 2.96026L3.44804 2.7537C3.93402 2.26655 4.27828 1.92142 4.67482 1.72085Z" fill="#475467"/></svg>`,
  SMS: `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#475467" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`,
  'Live Chat': `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#475467" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
  Instagram: `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none"><rect x="1.5" y="1.5" width="21" height="21" rx="8" fill="url(#ig_a)"/><rect x="1.5" y="1.5" width="21" height="21" rx="8" fill="url(#ig_b)"/><rect x="1.5" y="1.5" width="21" height="21" rx="8" fill="url(#ig_c)"/><path d="M17.25 7.875a1.125 1.125 0 1 1-2.25 0 1.125 1.125 0 0 1 2.25 0Z" fill="white"/><path fill-rule="evenodd" clip-rule="evenodd" d="M12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Zm0-1.5a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z" fill="white"/><path fill-rule="evenodd" clip-rule="evenodd" d="M4.5 11.7C4.5 9.18 4.5 7.92 4.99 6.957c.431-.843 1.12-1.532 1.967-1.966C7.92 4.5 9.18 4.5 11.7 4.5h.6c2.52 0 3.78 0 4.743.491a4.5 4.5 0 0 1 1.966 1.966C19.5 7.92 19.5 9.18 19.5 11.7v.6c0 2.52 0 3.78-.491 4.743a4.5 4.5 0 0 1-1.966 1.966C16.08 19.5 14.82 19.5 12.3 19.5h-.6c-2.52 0-3.78 0-4.743-.491a4.5 4.5 0 0 1-1.966-1.966C4.5 16.08 4.5 14.82 4.5 12.3v-.6Zm7.2-5.7h.6c1.285 0 2.158.001 2.833.056.658.054.994.151 1.229.27a3 3 0 0 1 1.312 1.311c.119.235.216.571.27 1.23.055.674.056 1.547.056 2.833v.6c0 1.285-.001 2.158-.056 2.833-.054.658-.151.994-.27 1.229a3 3 0 0 1-1.312 1.312c-.235.119-.571.216-1.23.27-.674.055-1.547.056-2.832.056h-.6c-1.285 0-2.158-.001-2.833-.056-.658-.054-.994-.151-1.229-.27a3 3 0 0 1-1.312-1.312c-.119-.235-.216-.571-.27-1.23C6.001 14.458 6 13.585 6 12.3v-.6c0-1.285.001-2.158.056-2.833.054-.658.151-.994.27-1.229A3 3 0 0 1 7.638 6.326c.235-.119.571-.216 1.23-.27C9.542 6.001 10.415 6 11.7 6Z" fill="white"/><defs><radialGradient id="ig_a" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(9 17.25) rotate(-55.376) scale(19.14)"><stop stop-color="#B13589"/><stop offset=".793" stop-color="#C62F94"/><stop offset="1" stop-color="#8A3AC8"/></radialGradient><radialGradient id="ig_b" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(8.25 23.25) rotate(-65.136) scale(16.946)"><stop stop-color="#E0E8B7"/><stop offset=".445" stop-color="#FB8A2E"/><stop offset=".715" stop-color="#E2425C"/><stop offset="1" stop-color="#E2425C" stop-opacity="0"/></radialGradient><radialGradient id="ig_c" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(.375 2.25) rotate(-8.13) scale(29.168 6.239)"><stop offset=".157" stop-color="#406ADC"/><stop offset=".468" stop-color="#6A45BE"/><stop offset="1" stop-color="#6A45BE" stop-opacity="0"/></radialGradient></defs></svg>`,
  WhatsApp: `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 22 22" fill="none"><g clip-path="url(#wa_clip)"><path fill-rule="evenodd" clip-rule="evenodd" d="M10.997 0C4.933 0 0 4.934 0 11c0 2.406.776 4.637 2.095 17.447l.724 21.534 4.952-1.817C9.691 21.334 11.003 22 11.003 22 17.067 22 22 17.066 22 11.001 22 4.934 17.067 0 11.003 0h-.006Zm-3.07 5.587c-.214-.51-.376-.53-.699-.543-.11-.006-.232-.013-.367-.013-.42 0-.86.123-1.125.395-.327.33-1.129 1.099-1.129 2.677s1.15 3.096 1.306 3.31c.162.213 2.243 3.498 5.476 4.837 2.527 1.048 3.277.951 3.852.828.84-.181 1.894-.802 2.16-1.552.265-.75.265-1.39.187-1.526-.077-.136-.29-.213-.614-.375-.323-.162-1.894-.938-2.192-1.041-.29-.11-.568-.069-.788.241-.31.434-.614.874-.859 1.139-.194.207-.51.233-.776.123-.354-.15-1.35-.499-2.578-1.592-.95-.848-1.596-1.902-1.784-2.218-.187-.322.02-.51.169-.685.161-.2.316-.343.478-.53.161-.188.252-.285.355-.505.11-.214.032-.433-.045-.595-.078-.162-.724-1.74-.99-2.38Z" fill="#67C15E"/></g><defs><clipPath id="wa_clip"><rect width="22" height="22" fill="white"/></clipPath></defs></svg>`,
  WebChat: `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#475467" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
}

function ch(name) { return { name, icon: channelIcons[name] } }

const monoIcons = {
  'Live Chat': `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
  SMS: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`,
  WhatsApp: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>`,
  Instagram: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>`,
  Facebook: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>`,
}

const agentBaseDescription = 'AI Sales Agent — Use cases and features for all business types. 1. Use cases. This AI Sales Agent can be deployed across any type of business, automating sales, lead qualification, and follow-up with natural, conversational voice interactions. Examples of use cases across niches: SaaS and software companies: Automate demo bookings, capture leads, qualify prospects, and send payment links. Coaching and consulting: Book strategy sessions, qualify client needs, provide answers to common questions, and send follow-ups. E-commerce and retail: Answer product questions, capture orders, confirm payments, and provide shipping updates. Marketing and service providers: Qualify potential clients, book consultation calls, and present service offerings. Professional services (legal, accounting, etc.): Capture client details, schedule appointments, answer FAQs, and share relevant information. Healthcare and wellness providers: Book appointments, provide service information, and answer common patient queries. Any B2B or B2C business: Fully adaptable to industry-specific offers, goals, and workflows. Key benefit across use cases: Dynamic setup: Just fill out one simple form with your business name, offers, and key details — these are automatically used to customize the AI\'s prompts, responses, and conversation flow. Fast deployment: The AI Sales Agent is trained and ready to go in under 60 seconds. 2. Features. The AI Sales Agent includes these core features: Structured sales flow: Captures accurate contact details first (name, email, phone). Greets prospects and qualifies their goals, challenges, and urgency. Answers FAQs and redirects unknown questions. Presents offers and guarantees persuasively. Handles objections and re-engages if necessary. Books appointments for follow-up. Concludes calls professionally and warmly. Customizable experience: Branded with your business name. Conversation tone, voice, and scripts are automatically personalized using your form inputs. Reads numbers and prices clearly for natural speech. Integrated workflows: Appointment booking and follow-up: Confirms sessions via email/SMS, sends reminders and prep materials, and automatically tags contacts in your CRM for tracking. Payment confirmation: Sends secure payment links, confirms successful payments, updates records, and applies the correct CRM tags for reporting and automation. AI knowledge and training: Continuously improves qualification, objection handling, and responses over time. Adaptable to any business type: Works for SaaS, coaching, retail, professional services, healthcare, and more. Customizable to match your products, offers, and services. Optimized to convert leads and book appointments automatically. Fallback and unknown question handling: Provides professional, general responses to off-topic questions. Redirects conversations back to your offers and goals. Analytics and optimization: Tracks leads, conversions, and interactions. Provides insights for improving performance and results. 3. Quick and simple setup. Simply fill out one form, and all your details — business name, offer, pricing, FAQs — are dynamically added to the AI\'s prompt. No technical expertise needed. Your AI agent is ready to engage prospects in less than 60 seconds, automatically tagging contacts in your CRM for smooth follow-up and reporting.'

const agents = [
  {
    id: 1,
    name: 'AI sales agent',
    avatarIcon: monoIcons['SMS'],
    avatarBg: '#EFF4FF',
    avatarFg: '#155EEF',
    description: agentBaseDescription,
    useCases: ['Lead qualification & appointment booking'],
    channels: [ch('SMS'), ch('Instagram'), ch('Facebook'), ch('WebChat'), ch('Live Chat'), ch('WhatsApp')],
  },
  {
    id: 2,
    name: 'LiveChat concierge',
    avatarIcon: monoIcons['Live Chat'],
    avatarBg: '#EFF4FF',
    avatarFg: '#155EEF',
    description: 'LiveChat concierge engages website visitors in real-time, answers product questions, qualifies leads, and routes high-intent prospects to your sales team. Configured for live chat channels with instant response handling, smart handoff triggers, and CRM contact creation on every conversation.',
    useCases: ['Real-time lead engagement', 'Live chat support'],
    channels: [ch('Live Chat'), ch('WebChat')],
  },
  {
    id: 3,
    name: 'WhatsApp concierge',
    avatarIcon: monoIcons['WhatsApp'],
    avatarBg: '#ECFDF3',
    avatarFg: '#099250',
    description: 'WhatsApp concierge handles inbound messages on WhatsApp, nurturing leads through conversational flows, booking appointments, and sending payment links — all within the WhatsApp thread. Leverages WhatsApp\'s high open rates to maximize conversion and re-engagement.',
    useCases: ['WhatsApp lead nurturing', 'Appointment booking'],
    channels: [ch('WhatsApp')],
  },
  {
    id: 4,
    name: 'SMS concierge',
    avatarIcon: monoIcons['SMS'],
    avatarBg: '#EFF4FF',
    avatarFg: '#155EEF',
    description: 'SMS concierge runs automated text-based sales conversations, following up on leads, confirming appointments, and collecting payments via SMS. Works 24/7 with no human intervention, sending personalized messages based on contact data from your CRM.',
    useCases: ['SMS follow-up', 'Appointment reminders'],
    channels: [ch('SMS')],
  },
  {
    id: 5,
    name: 'Instagram concierge',
    avatarIcon: monoIcons['Instagram'],
    avatarBg: '#FDF2FA',
    avatarFg: '#C11574',
    description: 'Instagram concierge responds to DMs and story replies on Instagram, converting social engagement into qualified leads. Captures contact details, qualifies intent, and books appointments directly from Instagram conversations — turning followers into customers.',
    useCases: ['Social lead capture', 'DM automation'],
    channels: [ch('Instagram')],
  },
  {
    id: 6,
    name: 'Facebook concierge',
    avatarIcon: monoIcons['Facebook'],
    avatarBg: '#EFF8FF',
    avatarFg: '#1570EF',
    description: 'Facebook concierge automates Messenger conversations for ads, page DMs, and comment replies — qualifying leads, booking calls, and sending follow-up sequences. Integrates seamlessly with your Facebook page to turn ad traffic into booked appointments.',
    useCases: ['Facebook ads follow-up', 'Messenger automation'],
    channels: [ch('Facebook')],
  },
]

const selectedAgentId = ref(agents[0].id)
const selectedAgent = computed(() => agents.find(a => a.id === selectedAgentId.value))
const agentVariation = ref('nav')
const descExpanded = ref(false)
const navDescRef = ref(null)
const stackDescRef = ref(null)
const isDescOverflowing = ref(false)

function checkDescOverflow() {
  nextTick(() => {
    const raw = navDescRef.value || stackDescRef.value
    const el = Array.isArray(raw) ? raw[0] : raw
    if (!el) { isDescOverflowing.value = false; return }
    isDescOverflowing.value = el.scrollHeight > el.clientHeight
  })
}

watch(selectedAgentId, () => {
  descExpanded.value = false
  checkDescOverflow()
})

watch(agentVariation, () => {
  descExpanded.value = false
  checkDescOverflow()
})

const agentActionGroups = [
  {
    name: 'Appointment booking',
    icon: 'calendar',
    bg: 'var(--success-50)',
    color: 'var(--success-600)',
    items: [
      { name: 'Appointment booking action' }
    ]
  },
  {
    name: 'Human handover',
    icon: 'users',
    bg: 'var(--warning-50)',
    color: 'var(--warning-600)',
    items: [
      { name: 'Human requested' },
      { name: 'Failed to resolve issue' },
      { name: 'Lack of information' }
    ]
  },
  {
    name: 'Trigger workflow',
    icon: 'repeat',
    bg: 'var(--primary-50)',
    color: 'var(--primary-600)',
    items: [
      { name: 'Payment link sent' }
    ]
  },
  {
    name: 'Stop bot',
    icon: 'arrowLeft',
    bg: '#FEF3F2',
    color: '#D92D20',
    items: [
      { name: 'Goodbye detection' }
    ]
  }
]

function getSectionIcon(label) {
  return permissionIcons[sectionPermissionMap[label]] || ''
}
function getItemIcon(itemName, sectionLabel) {
  return itemIcons[itemName] || getSectionIcon(sectionLabel)
}

const props = defineProps({ app: { type: Object, required: true } })
const playing = ref(false)
const previewOpen = ref(false)
const previewIndex = ref(0)

function openPreview(i) {
  previewIndex.value = i
  previewOpen.value = true
}
function closePreview() { previewOpen.value = false }
function nextPreview() {
  const imgs = props.app.media?.images?.length || 0
  const total = imgs + 1
  if (!total) return
  const cur = previewIndex.value + 1
  const next = (cur + 1) % total
  previewIndex.value = next - 1
}
function prevPreview() {
  const imgs = props.app.media?.images?.length || 0
  const total = imgs + 1
  if (!total) return
  const cur = previewIndex.value + 1
  const next = (cur - 1 + total) % total
  previewIndex.value = next - 1
}
function onPreviewKey(e) {
  if (!previewOpen.value) return
  if (e.key === 'Escape') closePreview()
  else if (e.key === 'ArrowRight') nextPreview()
  else if (e.key === 'ArrowLeft') prevPreview()
}
onMounted(() => {
  window.addEventListener('keydown', onPreviewKey)
  checkDescOverflow()
})
onBeforeUnmount(() => window.removeEventListener('keydown', onPreviewKey))
const expandedAbout = ref(false)
const expandedActions = ref(false)
const expandedTriggers = ref(false)
const expandedConvProviders = ref(false)
const expandedCustomJs = ref(false)
const expandedSnapshots = ref(false)
const activeVariationTab = ref('variation1')
const expandedSections = ref(false)

const getConvProvidersExtra = computed(() => Math.max(0, props.app.whatsIncluded.conversationProviders.length - 5))
const getCustomJsExtra = computed(() => Math.max(0, props.app.whatsIncluded.customJs.length - 5))
const getCustomActionsExtra = computed(() => Math.max(0, props.app.whatsIncluded.customActions.length - 5))
const getCustomTriggersExtra = computed(() => Math.max(0, props.app.whatsIncluded.customTriggers.length - 5))
const getSnapshotsExtra = computed(() => Math.max(0, props.app.whatsIncluded.snapshots.length - 5))
const totalSections = computed(() => {
  let count = 0
  if (props.app.whatsIncluded.conversationProviders?.length) count++
  if (props.app.whatsIncluded.customJs?.length) count++
  if (props.app.whatsIncluded.customActions?.length) count++
  if (props.app.whatsIncluded.customTriggers?.length) count++
  if (props.app.whatsIncluded.snapshots?.length) count++
  if (props.app.whatsIncluded.webhooks?.length) count++
  if (props.app.whatsIncluded.integrations?.length) count++
  if (props.app.whatsIncluded.apiEndpoints?.length) count++
  return count
})
const hiddenSections = computed(() => Math.max(0, totalSections.value - 5))

const whatsInsideSections = computed(() => {
  const wi = props.app.whatsIncluded || {}
  return [
    { id: 'conversationProviders', label: 'Conversation provider', icon: 'messageCircle', color: '#155EEF', bg: '#EFF4FF', items: wi.conversationProviders || [] },
    { id: 'customJs',              label: 'Custom JS',             icon: 'code',          color: '#7839EE', bg: '#F4F3FF', items: wi.customJs || [] },
    { id: 'customActions',         label: 'Custom actions',        icon: 'zap',           color: '#DC6803', bg: '#FFFAEB', items: wi.customActions || [] },
    { id: 'customTriggers',        label: 'Custom triggers',       icon: 'play',          color: '#039855', bg: '#ECFDF3', items: wi.customTriggers || [] },
    { id: 'snapshots',             label: 'Snapshots',             icon: 'camera',        color: '#0E7090', bg: '#ECFEFF', items: wi.snapshots || [] },
    { id: 'webhooks',              label: 'Webhooks',              icon: 'bell',          color: '#DD2590', bg: '#FDF2FA', items: wi.webhooks || [] },
    { id: 'integrations',          label: 'Integrations',          icon: 'share2',        color: '#0E9384', bg: '#F0FDF9', items: wi.integrations || [] },
    { id: 'apiEndpoints',          label: 'API endpoints',         icon: 'code',          color: '#E04F16', bg: '#FFF6ED', items: wi.apiEndpoints || [] },
  ].filter(s => s.items.length)
})
const activeInsideCategory = ref('conversationProviders')

const copiedKey = ref('')
let copiedTimer = null
function copyToClipboard(text) {
  navigator.clipboard?.writeText(text)
  copiedKey.value = text
  clearTimeout(copiedTimer)
  copiedTimer = setTimeout(() => { copiedKey.value = '' }, 1500)
}

function formatNumber(n) {
  if (n >= 1000) return `${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}k`
  return String(n)
}

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
.media-thumb {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 0;
  border: 2px solid transparent;
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: transparent;
  cursor: pointer;
  aspect-ratio: 4 / 3;
  transition: border-color .2s ease, transform .2s ease, box-shadow .2s ease;
}
.media-thumb > img {
  width: 100%; height: 100%; object-fit: cover;
  display: block;
  transition: transform .3s ease, filter .2s ease;
}
.media-thumb:hover {
  border-color: var(--gray-300);
  box-shadow: 0 4px 12px rgba(16, 24, 40, 0.10);
}
.media-thumb:hover > img {
  transform: scale(1.04);
}
.media-thumb:focus-visible {
  outline: none;
  border-color: var(--primary-500);
  box-shadow: 0 0 0 3px rgba(53, 106, 230, 0.25);
}
.media-thumb.is-selected {
  border-color: var(--primary-500);
  box-shadow: 0 0 0 3px rgba(53, 106, 230, 0.20);
}
.media-thumb-more {
  position: relative;
}
.media-thumb-more img {
  filter: brightness(0.45);
}
.media-thumb-more:hover img {
  filter: brightness(0.55);
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
  pointer-events: none;
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
  grid-template-columns: 140px 1fr;
  gap: 20px;
  align-items: start;
}
.included-left {
  min-width: 0;
}
.included-right {
  min-width: 0;
  gap: 12px;
  display: grid;
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
}
.variation1 .included-separator,
.variation3-grid .included-separator,
.agent-actions-section .included-separator {
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
  display: flex;
  align-items: center;
  gap: 8px;
}
.heading-icon {
  width: 24px;
  height: 24px;
  border-radius: 6px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.card-icon-tile {
  width: 32px;
  height: 32px;
  border-radius: 6px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.perm-svg :deep(svg) { width: 20px; height: 20px; }
.heading-icon.perm-svg :deep(svg) { width: 14px; height: 14px; }
.perm-svg :deep(svg path),
.perm-svg :deep(svg circle),
.perm-svg :deep(svg rect) { fill: currentColor; }
.included-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
  gap: 12px;
}
.agent-card .included-grid {
  grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
}
.triggers-grid {
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
}
.included-card {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px;
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  background: var(--surface);
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
.show-more-btn {
  width: fit-content;
  padding: 8px 16px;
  border: 1px solid var(--border);
  border-radius: 4px;
  background: var(--gray-50);
  color: var(--gray-700);
  font-size: var(--hr-text-sm);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}
.show-more-btn:hover {
  background: var(--gray-100);
  border-color: var(--gray-300);
}

/* Variations Section */
.variations-section {
  margin-top: 12px;
}
.variations-tabs {
  display: none;
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
  gap: 0px;
  margin-top: 12px;
  margin-bottom: 20px;
}

/* Horizontal Layout Grid for Variation 3 */
.variation3-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
}

/* Variation 4: Section overview cards with colored icons */
.variation4-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-top: 12px;
}
.inside-section-card {
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 16px;
  background: var(--surface);
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.inside-section-head {
  display: flex;
  align-items: center;
  gap: 12px;
}
.inside-section-icon {
  width: 36px; height: 36px;
  border-radius: 8px;
  display: inline-flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.inside-section-meta { display: flex; flex-direction: column; gap: 2px; }
.inside-section-title {
  font-size: var(--hr-text-sm);
  font-weight: 600;
  color: var(--gray-900);
}
.inside-section-count {
  font-size: var(--hr-text-xs);
  color: var(--gray-500);
}
.inside-section-items {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.inside-section-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: var(--hr-text-sm);
  color: var(--gray-700);
}
.inside-section-item-icon { color: var(--gray-400); flex-shrink: 0; }

/* Variation 5: Sub-tab navigator */
.variation5-wrap {
  margin-top: 12px;
  display: grid;
  grid-template-columns: 240px 1fr;
  gap: 24px;
}
.inside-subnav {
  display: flex;
  flex-direction: column;
  gap: 4px;
  border-right: 1px solid var(--border);
  padding-right: 12px;
}
.inside-subnav-tab {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 10px;
  border: none;
  background: transparent;
  border-radius: 6px;
  cursor: pointer;
  text-align: left;
  font-size: var(--hr-text-sm);
  color: var(--gray-700);
  transition: background 0.2s ease, color 0.2s ease;
}
.inside-subnav-tab:hover { background: var(--gray-50); }
.inside-subnav-tab.active {
  background: var(--primary-50, #EFF4FF);
  color: var(--primary-700, #155EEF);
  font-weight: 600;
}
.inside-subnav-icon {
  width: 26px; height: 26px;
  border-radius: 6px;
  display: inline-flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.inside-subnav-label { flex: 1; min-width: 0; }
.inside-subnav-count {
  font-size: var(--hr-text-xs);
  color: var(--gray-500);
  background: var(--gray-100);
  padding: 2px 8px;
  border-radius: 999px;
  font-weight: 500;
}
.inside-subnav-tab.active .inside-subnav-count {
  background: var(--primary-100, #D1E0FF);
  color: var(--primary-700, #155EEF);
}
.inside-subnav-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}
@media (max-width: 768px) {
  .variation4-grid { grid-template-columns: 1fr; }
  .variation5-wrap { grid-template-columns: 1fr; }
  .inside-subnav { border-right: 0; border-bottom: 1px solid var(--border); padding-right: 0; padding-bottom: 12px; }
  .inside-subnav-grid { grid-template-columns: 1fr; }
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
  margin: 0 0 4px;
  display: inline-flex; align-items: center; gap: 8px;
  font-size: var(--hr-text-xl);
  font-weight: 600; color: var(--gray-900);
}
.section-title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}
.view-more-link {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: var(--hr-text-sm);
  font-weight: 500;
  color: var(--primary-600, #155EEF);
  text-decoration: none;
}
.view-more-link:hover { text-decoration: underline; }
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
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 16px;
  padding-block-start: 16px;
}
.app-card {
  display: flex;
  flex-direction: column;
  gap: 12px;
  text-decoration: none;
  padding: 16px;
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  background: var(--surface);
  box-shadow: var(--shadow-xs);
  transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
}
.app-card:hover {
  border-color: var(--gray-300);
  box-shadow: var(--shadow-sm, 0 1px 3px rgba(16,24,40,0.1));
  transform: translateY(-2px);
}
.app-card-top {
  display: flex;
  align-items: center;
  gap: 12px;
}
.app-card-icon {
  width: 44px;
  height: 44px;
  border-radius: 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--gray-900);
  background: #E0E7FF;
  font-weight: 700;
  font-size: 11px;
  letter-spacing: 0.3px;
  flex-shrink: 0;
}
.app-card-identity {
  flex: 1;
  min-width: 0;
}
.app-card-name {
  font-size: 14px;
  font-weight: 600;
  color: var(--gray-900);
  line-height: 1.3;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.app-card-by {
  font-size: 14px;
  color: var(--gray-500);
  margin-top: 2px;
}
.app-card-installs {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: var(--gray-700);
  font-weight: 500;
  flex-shrink: 0;
  align-self: flex-start;
}
.app-card-tagline {
  font-size: 14px;
  color: var(--gray-700);
  line-height: 1.4;
}
.app-card-rating {
  display: flex;
  align-items: center;
  gap: 8px;
}
.app-card-stars {
  display: inline-flex;
  align-items: center;
  gap: 2px;
}
.app-card-rating-val {
  font-size: 14px;
  color: var(--gray-700);
  font-weight: 500;
}
.app-card-tags {
  display: flex;
  align-items: center;
  gap: 8px;
}
.app-card-tag {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 12px;
  border-radius: 999px;
  border: 1px solid var(--gray-300);
  font-size: 12px;
  color: var(--gray-700);
  font-weight: 500;
  background: #fff;
  line-height: 1.2;
}
.app-card-tag--wl {
  color: var(--primary-600, #1D4ED8);
  border-color: var(--primary-200, #BFDBFE);
  background: var(--primary-50, #EFF6FF);
}
.app-card-tag--installed {
  margin-left: auto;
  color: #039855;
  border-color: #6CE9A6;
  background: #ECFDF3;
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

/* Agent Card */
.agent-variation-toggle {
  display: inline-flex;
  border: 1px solid var(--border);
  border-radius: 8px;
  overflow: hidden;
  background: var(--surface);
}
.agent-variation-toggle button {
  padding: 6px 12px;
  font-size: var(--hr-text-sm);
  font-weight: 500;
  background: transparent;
  border: none;
  color: var(--gray-600);
  cursor: pointer;
}
.agent-variation-toggle button.active {
  background: var(--primary-50);
  color: var(--primary-700);
  font-weight: 600;
}

.agent-stack {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.agent-card.stacked-card {
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
}

.agent-panel {
  display: flex;
  gap: 0;
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  background: var(--surface);
  overflow: hidden;
  min-height: 400px;
}

.agent-nav {
  width: 240px;
  flex-shrink: 0;
  border-right: 1px solid var(--border);
  background: var(--gray-50);
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.agent-nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  border-radius: 8px;
  border: 1px solid transparent;
  background: transparent;
  cursor: pointer;
  text-align: left;
  width: 100%;
  transition: background 0.15s, border-color 0.15s, box-shadow 0.15s;
}

.agent-nav-item:hover {
  background: #fff;
  border-color: var(--gray-200);
}

.agent-nav-item.active {
  background: #fff;
  border-color: var(--gray-200);
  box-shadow: 0 1px 2px rgba(16, 24, 40, 0.05);
}

.agent-nav-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.agent-nav-avatar :deep(svg) { width: 16px; height: 16px; }

.agent-nav-name {
  font-size: var(--hr-text-sm);
  font-weight: 500;
  color: var(--gray-700);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.agent-nav-item.active .agent-nav-name {
  color: var(--primary-700);
  font-weight: 600;
}

.agent-card {
  flex: 1;
  min-width: 0;
  padding: 24px;
  background: var(--surface);
  overflow-y: auto;
}

.agent-card-topbar {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 4px;
}

.btn {
  height: 40px;
  border-radius: 4px;
  font-weight: 600;
  font-size: var(--hr-text-sm);
  border: 1px solid transparent;
  cursor: pointer;
}
.btn-secondary {
  background: var(--surface);
  color: var(--gray-900);
  border-color: var(--border);
}
.btn-secondary:hover { background: var(--gray-50); }

.test-agent-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 0 14px;
  white-space: nowrap;
  flex-shrink: 0;
}

.agent-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 0;
}
.agent-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.agent-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.agent-avatar :deep(svg) { width: 24px; height: 24px; }
.agent-name {
  margin: 0;
  font-size: var(--hr-text-xl);
  font-weight: 600;
  color: var(--gray-900);
}
.agent-description-wrap {
  position: relative;
  margin: 16px 0 24px;
}
.agent-description {
  margin: 0;
  font-size: var(--hr-text-sm);
  color: var(--gray-700);
  line-height: 1.6;
}
.agent-description.clamped {
  display: -webkit-box;
  -webkit-line-clamp: 8;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.desc-gradient {
  position: absolute;
  bottom: 28px;
  left: 0;
  right: 0;
  height: 48px;
  background: linear-gradient(to bottom, transparent, #fff);
  pointer-events: none;
}
.desc-toggle-btn {
  display: inline-block;
  margin-top: 6px;
  background: none;
  border: none;
  padding: 0;
  font-size: var(--hr-text-sm);
  font-weight: 600;
  color: var(--primary-600);
  cursor: pointer;
}
.desc-toggle-btn:hover {
  color: var(--primary-700);
  text-decoration: underline;
}
.agent-section-layout {
  display: grid;
  grid-template-columns: 140px 1fr;
  gap: 20px;
  align-items: start;
  margin-bottom: 20px;
}
.agent-section-layout:last-child {
  margin-bottom: 0;
}
.agent-section-left {
  min-width: 0;
}
.agent-section-right {
  min-width: 0;
}
.agent-section {
  margin-bottom: 20px;
}
.agent-section:last-child {
  margin-bottom: 0;
}
.agent-section-title {
  margin: 0;
  font-size: var(--hr-text-sm);
  font-weight: 600;
  color: var(--gray-900);
}
.agent-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.agent-chip {
  display: inline-block;
  padding: 4px 10px;
  border: 1px solid var(--border);
  border-radius: 20px;
  background: var(--gray-50);
  font-size: var(--hr-text-xs);
  color: var(--gray-700);
}
.agent-channels {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  align-items: center;
}
.agent-channel-pill {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 3px 8px;
  border: 1px solid var(--border);
  border-radius: 999px;
  background: var(--gray-50);
  height: fit-content;
  font-size: var(--hr-text-xs);
}
.pill-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--gray-700);
  flex-shrink: 0;
}
.pill-text {
  font-size: var(--hr-text-xs);
  color: var(--gray-700);
  font-weight: 500;
  white-space: nowrap;
}
.agent-channels-icons-only {
  gap: 8px;
}
.agent-channel-icon-only {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--gray-50);
  flex-shrink: 0;
  color: var(--gray-700);
}
.agent-channel {
  display: flex;
  align-items: center;
  gap: 8px;
}
.agent-channel-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  color: var(--gray-700);
  flex-shrink: 0;
}
.agent-channel-label {
  font-size: var(--hr-text-sm);
  color: var(--gray-700);
  font-weight: 500;
}
.agent-actions-section {
  margin-top: 32px;
  padding-top: 32px;
  border-top: 1px solid var(--border);
}
.agent-actions-title {
  margin: 0 0 24px;
  font-size: var(--hr-text-sm);
  font-weight: 600;
  color: var(--gray-900);
}

.resources-section {
  padding: 20px 0px 20px;
}
.resources-title-row {
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 20px;
}
.dev-resources-rows {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px 32px;
  margin-top: 8px;
}
.dev-resources-row {
  display: contents;
}
.dev-resource-link {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: var(--hr-text-md);
  color: #155EEF;
  text-decoration: none;
  font-weight: 500;
}
.dev-resource-link > span,
.dev-resource-link > a { margin-right: 2px; margin-left: 4px; }
.dev-resource-link > .ext-btn { margin: 0; }
.dev-resource-link:hover { text-decoration: underline; }
.dev-resource-link svg { flex-shrink: 0; color: var(--gray-500); }
.dev-resource-link--external {
  color: var(--gray-700);
}
.dev-resource-link--external svg { color: var(--gray-500); }
.dev-resource-link--external .ext-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 6px;
  color: var(--gray-500);
  transition: background 0.15s ease, color 0.15s ease;
}
.dev-resource-link--external:hover .ext-btn {
  background: var(--gray-100);
  color: var(--gray-700);
}
.dev-resource-link--external:hover { color: var(--gray-900); }
.dev-resource-value {
  color: var(--gray-700);
  min-width: 0;
  max-width: 100%;
  overflow: hidden;
}
.dev-resource-value:hover { text-decoration: none; }
.dev-resource-value a {
  color: var(--gray-700);
  text-decoration: none;
  font-weight: 500;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.dev-resource-value a:hover { color: var(--gray-900); text-decoration: underline; }
.copy-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: none;
  background: transparent;
  border-radius: 6px;
  cursor: pointer;
  color: var(--gray-500);
  transition: background 0.15s ease, color 0.15s ease;
}
.copy-btn:hover { background: var(--gray-100); color: var(--gray-700); }
.copy-btn.copied { color: #039855; }
.copy-toast {
  position: absolute;
  bottom: calc(100% + 6px);
  left: 50%;
  transform: translateX(-50%);
  padding: 4px 8px;
  background: var(--gray-900, #101828);
  color: #fff;
  font-size: 12px;
  font-weight: 500;
  border-radius: 4px;
  white-space: nowrap;
  pointer-events: none;
  animation: copy-toast-in 0.15s ease-out;
}
.copy-toast::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 4px solid transparent;
  border-top-color: var(--gray-900, #101828);
}
@keyframes copy-toast-in {
  from { opacity: 0; transform: translate(-50%, 4px); }
  to   { opacity: 1; transform: translate(-50%, 0); }
}
@media (max-width: 900px) {
  .dev-resources-row { gap: 12px 16px; }
}

.resources-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.resources-field {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 4px;
}
.resources-field-label {
  font-size: var(--hr-text-sm);
  font-weight: 500;
  color: var(--gray-600);
}
.resources-field-link {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: var(--hr-text-sm);
  color: #155EEF;
  text-decoration: none;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
}
.resources-field-link:hover { text-decoration: underline; }
.resources-field-link-row {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  overflow: hidden;
}
.resources-field-link-row .resources-field-link {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.resources-field-value {
  font-size: var(--hr-text-sm);
  color: var(--gray-800);
}
.resources-empty {
  font-size: var(--hr-text-sm);
  color: var(--gray-400);
}
.resources-separator {
  border: 0;
  border-top: 1px solid var(--border);
  margin: 16px 0 20px;
}
.resources-subheading {
  margin: 0 0 16px;
  font-size: var(--hr-text-md);
  font-weight: 600;
  color: var(--gray-900);
}
.resources-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}
.resources-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
  overflow: hidden;
}
.resources-copy-btn {
  border: 0;
  padding: 2px;
  background: transparent;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  color: var(--gray-500);
  flex-shrink: 0;
}
.resources-copy-btn:hover { color: var(--gray-700); }

@media (max-width: 900px) {
  .overview-layout { grid-template-columns: 1fr; }
  .overview-sidebar { position: static; }
  .resources-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 720px) {
  .media { grid-template-columns: 1fr; }
  .media-side { grid-template-columns: 1fr 1fr; grid-template-rows: auto; }
  .info-grid { grid-template-columns: 1fr; }
}
</style>

<style>
.preview-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(16, 24, 40, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 64px 80px;
  animation: previewFadeIn .2s ease;
}
@keyframes previewFadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
.preview-stage {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 100%;
  max-height: 100%;
}
.preview-image {
  max-width: 100%;
  max-height: 85vh;
  object-fit: contain;
  border-radius: 12px;
  box-shadow: 0 20px 40px rgba(0,0,0,.4);
  user-select: none;
}
.preview-video-wrap {
  width: min(1200px, 90vw);
  aspect-ratio: 16 / 9;
  max-height: 85vh;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0,0,0,.4);
  background: #000;
}
.preview-video-wrap iframe {
  width: 100%;
  height: 100%;
  border: 0;
}
.preview-close {
  position: absolute;
  top: 20px;
  right: 24px;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 0;
  background: rgba(255, 255, 255, 0.10);
  color: #fff;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: background .2s ease;
}
.preview-close:hover { background: rgba(255, 255, 255, 0.20); }
.preview-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 0;
  background: rgba(255, 255, 255, 0.10);
  color: #fff;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: background .2s ease;
}
.preview-nav:hover { background: rgba(255, 255, 255, 0.22); }
.preview-prev { left: 24px; }
.preview-next { right: 24px; }
.preview-counter {
  position: absolute;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  color: rgba(255, 255, 255, 0.85);
  font-size: 14px;
  font-weight: 500;
  padding: 6px 14px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.10);
}
@media (max-width: 720px) {
  .preview-overlay { padding: 56px 12px; }
  .preview-prev { left: 8px; }
  .preview-next { right: 8px; }
}
</style>
