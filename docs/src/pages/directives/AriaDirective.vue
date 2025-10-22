<template>
  <div class="page">
    <h1>ARIA Directive</h1>
    <p class="lead">Dynamically manage ARIA attributes for accessible interactive widgets - buttons, tabs, accordions, tooltips, and complex UI patterns.</p>

    <section class="section">
      <h2>Overview</h2>
      <p>The <code>v-a11y-aria</code> directive simplifies managing ARIA attributes dynamically based on component state. Perfect for toggles, tabs, accordions, menus, and any interactive elements that need ARIA support.</p>
    </section>

    <section class="section">
      <h2>Toggle Button (aria-pressed)</h2>
      <CodeExample title="Accessible Toggle" :code="examples.toggle">
        <template #demo>
          <div class="demo-box">
            <button 
              v-a11y-aria="{ pressed: isPressed }"
              @click="isPressed = !isPressed"
              :class="['toggle-btn', { active: isPressed }]"
            >
              {{ isPressed ? 'Notifications On' : 'Notifications Off' }}
            </button>
            <p class="status-text">Status: {{ isPressed ? 'Enabled' : 'Disabled' }}</p>
          </div>
        </template>
      </CodeExample>
    </section>

    <section class="section">
      <h2>Expandable Section (aria-expanded)</h2>
      <CodeExample title="Accordion/Disclosure" :code="examples.expanded">
        <template #demo>
          <div class="demo-box">
            <div class="accordion">
              <button 
                v-a11y-aria="{ expanded: section1Open, controls: 'section1' }"
                @click="section1Open = !section1Open"
                class="accordion-trigger"
              >
                <span>Section 1: Getting Started</span>
                <span class="accordion-icon">{{ section1Open ? '▲' : '▼' }}</span>
              </button>
              <div v-if="section1Open" id="section1" class="accordion-content">
                <p>This section contains getting started information. The button above has aria-expanded="{{ section1Open }}" and aria-controls="section1".</p>
              </div>

              <button 
                v-a11y-aria="{ expanded: section2Open, controls: 'section2' }"
                @click="section2Open = !section2Open"
                class="accordion-trigger"
              >
                <span>Section 2: Advanced Features</span>
                <span class="accordion-icon">{{ section2Open ? '▲' : '▼' }}</span>
              </button>
              <div v-if="section2Open" id="section2" class="accordion-content">
                <p>Advanced features and configurations are explained here.</p>
              </div>
            </div>
          </div>
        </template>
      </CodeExample>
    </section>

    <section class="section">
      <h2>Tab Interface</h2>
      <CodeExample title="Accessible Tabs with ARIA" :code="examples.tabs">
        <template #demo>
          <div class="demo-box">
            <div class="tabs" role="tablist">
              <button 
                v-for="(tab, index) in tabs"
                :key="index"
                v-a11y-aria="{ selected: activeTab === index, controls: `panel${index}` }"
                @click="activeTab = index"
                :class="['tab', { active: activeTab === index }]"
                role="tab"
              >
                {{ tab.title }}
              </button>
            </div>
            <div 
              v-for="(tab, index) in tabs"
              :key="index"
              v-show="activeTab === index"
              v-a11y-aria="{ labelledby: `tab${index}` }"
              :id="`panel${index}`"
              class="tab-panel"
              role="tabpanel"
            >
              {{ tab.content }}
            </div>
          </div>
        </template>
      </CodeExample>
    </section>

    <section class="section">
      <h2>Disabled State</h2>
      <CodeExample title="Conditional Disabled State" :code="examples.disabled">
        <template #demo>
          <div class="demo-box">
            <label class="checkbox-label">
              <input type="checkbox" v-model="agreeToTerms" />
              I agree to the terms and conditions
            </label>
            
            <button 
              v-a11y-aria="{ disabled: !agreeToTerms }"
              :disabled="!agreeToTerms"
              @click="handleSubmit"
              class="btn-primary"
            >
              Submit
            </button>
            <p class="hint">Button is {{ agreeToTerms ? 'enabled' : 'disabled (aria-disabled="true")' }}</p>
          </div>
        </template>
      </CodeExample>
    </section>

    <section class="section">
      <h2>Live Region with aria-live</h2>
      <CodeExample title="Dynamic Content Updates" :code="examples.live">
        <template #demo>
          <div class="demo-box">
            <button @click="updateStatus" class="btn-primary">Update Status</button>
            <div 
              v-a11y-aria="{ live: 'polite', atomic: 'true' }"
              class="live-region"
            >
              {{ liveStatus }}
            </div>
          </div>
        </template>
      </CodeExample>
    </section>

    <section class="section">
      <h2>Tooltip with aria-describedby</h2>
      <CodeExample title="Accessible Tooltips" :code="examples.tooltip">
        <template #demo>
          <div class="demo-box">
            <button 
              v-a11y-aria="{ describedby: showTooltip ? 'tooltip1' : null }"
              @mouseenter="showTooltip = true"
              @mouseleave="showTooltip = false"
              @focus="showTooltip = true"
              @blur="showTooltip = false"
              class="btn-secondary tooltip-trigger"
            >
              Hover or Focus Me
            </button>
            <div v-if="showTooltip" id="tooltip1" role="tooltip" class="tooltip">
              This is helpful information about the button
            </div>
          </div>
        </template>
      </CodeExample>
    </section>

    <section class="section">
      <h2>Form Validation States</h2>
      <CodeExample title="aria-invalid and aria-describedby" :code="examples.validation">
        <template #demo>
          <div class="demo-box">
            <form class="validation-form">
              <label for="username">Username:</label>
              <input 
                id="username"
                v-model="username"
                v-a11y-aria="{ 
                  invalid: usernameError ? 'true' : null,
                  describedby: usernameError ? 'username-error' : null
                }"
                @blur="validateUsername"
                type="text"
                :class="{ error: usernameError }"
              />
              <div v-if="usernameError" id="username-error" class="error-message" role="alert">
                {{ usernameError }}
              </div>
            </form>
          </div>
        </template>
      </CodeExample>
    </section>

    <section class="section">
      <h2>Complex Widget: Menu Button</h2>
      <CodeExample title="Menu with ARIA" :code="examples.menu">
        <template #demo>
          <div class="demo-box">
            <button 
              v-a11y-aria="{ haspopup: 'true', expanded: menuOpen, controls: 'menu1' }"
              @click="menuOpen = !menuOpen"
              class="btn-primary"
            >
              Options {{ menuOpen ? '▲' : '▼' }}
            </button>
            <ul v-if="menuOpen" id="menu1" class="menu" role="menu">
              <li role="menuitem" tabindex="0" @click="selectOption('Edit')">Edit</li>
              <li role="menuitem" tabindex="0" @click="selectOption('Copy')">Copy</li>
              <li role="menuitem" tabindex="0" @click="selectOption('Delete')">Delete</li>
            </ul>
            <p v-if="selectedOption" class="selected-text">Selected: {{ selectedOption }}</p>
          </div>
        </template>
      </CodeExample>
    </section>

    <section class="section">
      <h2>API Reference</h2>
      <div class="api-table">
        <table>
          <thead>
            <tr><th>Property</th><th>Value Type</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr><td><code>pressed</code></td><td>Boolean</td><td>Sets aria-pressed (toggle buttons)</td></tr>
            <tr><td><code>expanded</code></td><td>Boolean</td><td>Sets aria-expanded (accordions, dropdowns)</td></tr>
            <tr><td><code>selected</code></td><td>Boolean</td><td>Sets aria-selected (tabs, lists)</td></tr>
            <tr><td><code>disabled</code></td><td>Boolean</td><td>Sets aria-disabled</td></tr>
            <tr><td><code>invalid</code></td><td>Boolean/String</td><td>Sets aria-invalid (form validation)</td></tr>
            <tr><td><code>controls</code></td><td>String</td><td>Sets aria-controls (ID reference)</td></tr>
            <tr><td><code>describedby</code></td><td>String</td><td>Sets aria-describedby (ID reference)</td></tr>
            <tr><td><code>labelledby</code></td><td>String</td><td>Sets aria-labelledby (ID reference)</td></tr>
            <tr><td><code>haspopup</code></td><td>Boolean/String</td><td>Sets aria-haspopup (menu, dialog, etc.)</td></tr>
            <tr><td><code>live</code></td><td>'polite'|'assertive'</td><td>Sets aria-live (live regions)</td></tr>
            <tr><td><code>atomic</code></td><td>Boolean/String</td><td>Sets aria-atomic</td></tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="section">
      <h2>Best Practices</h2>
      <div class="best-practices">
        <div class="practice-item">
          <span class="practice-icon">✓</span>
          <div>
            <strong>Use semantic HTML first:</strong>
            <p>ARIA should enhance, not replace native HTML elements.</p>
          </div>
        </div>
        <div class="practice-item">
          <span class="practice-icon">✓</span>
          <div>
            <strong>Keep IDs unique:</strong>
            <p>aria-controls, aria-describedby, and aria-labelledby reference elements by ID.</p>
          </div>
        </div>
        <div class="practice-item">
          <span class="practice-icon">✓</span>
          <div>
            <strong>Test with screen readers:</strong>
            <p>Always verify ARIA attributes work as expected with assistive technology.</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import CodeExample from '../../components/CodeExample.vue'
export default {
  name: 'AriaDirective',
  components: { CodeExample },
  data() {
    return {
      isPressed: false,
      section1Open: false,
      section2Open: false,
      activeTab: 0,
      tabs: [
        { title: 'Profile', content: 'View and edit your profile information here.' },
        { title: 'Settings', content: 'Manage your account settings and preferences.' },
        { title: 'Notifications', content: 'Configure how you receive notifications.' }
      ],
      agreeToTerms: false,
      liveStatus: 'Waiting for update...',
      updateCount: 0,
      showTooltip: false,
      username: '',
      usernameError: '',
      menuOpen: false,
      selectedOption: '',
      examples: {
        toggle: `<button v-a11y-aria="{ pressed: isActive }" @click="toggle">
  Toggle
</button>`,
        expanded: `<button v-a11y-aria="{ expanded: isOpen, controls: 'content' }">
  Expand
</button>
<div id="content" v-if="isOpen">Content</div>`,
        tabs: `<div role="tablist">
  <button v-a11y-aria="{ selected: active, controls: 'panel' }" role="tab">
    Tab
  </button>
</div>
<div id="panel" role="tabpanel">Content</div>`,
        disabled: `<button v-a11y-aria="{ disabled: !valid }" :disabled="!valid">
  Submit
</button>`,
        live: `<div v-a11y-aria="{ live: 'polite', atomic: 'true' }">
  {{ status }}
</div>`,
        tooltip: `<button v-a11y-aria="{ describedby: show ? 'tip' : null }">
  Hover
</button>
<div id="tip" role="tooltip">Info</div>`,
        validation: `<input v-a11y-aria="{ invalid: hasError, describedby: 'error' }" />
<div id="error" role="alert">{{ error }}</div>`,
        menu: `<button v-a11y-aria="{ haspopup: true, expanded: open }">
  Menu
</button>
<ul role="menu">...</ul>`
      }
    }
  },
  methods: {
    handleSubmit() {
      alert('Form submitted!')
    },
    updateStatus() {
      this.updateCount++
      this.liveStatus = `Status updated ${this.updateCount} time${this.updateCount > 1 ? 's' : ''}`
    },
    validateUsername() {
      if (!this.username) {
        this.usernameError = 'Username is required'
      } else if (this.username.length < 3) {
        this.usernameError = 'Username must be at least 3 characters'
      } else {
        this.usernameError = ''
      }
    },
    selectOption(option) {
      this.selectedOption = option
      this.menuOpen = false
    }
  }
}
</script>

<style scoped>
.toggle-btn { padding: 12px 24px; border: 2px solid #cbd5e0; background: white; border-radius: 8px; cursor: pointer; font-size: 16px; transition: all 0.2s; }
.toggle-btn.active { background: #667eea; color: white; border-color: #667eea; }
.status-text { margin-top: 10px; color: #718096; }
.accordion { display: flex; flex-direction: column; gap: 10px; }
.accordion-trigger { width: 100%; padding: 15px; border: 1px solid #e2e8f0; background: white; border-radius: 8px; cursor: pointer; display: flex; justify-content: space-between; align-items: center; text-align: left; font-size: 16px; }
.accordion-trigger:hover { background: #f7fafc; }
.accordion-icon { color: #667eea; }
.accordion-content { padding: 15px; background: #f7fafc; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 8px 8px; }
.tabs { display: flex; gap: 5px; border-bottom: 2px solid #e2e8f0; }
.tab { padding: 12px 24px; border: none; background: none; cursor: pointer; border-bottom: 3px solid transparent; transition: all 0.2s; }
.tab.active { border-bottom-color: #667eea; color: #667eea; font-weight: 600; }
.tab:hover { background: #f7fafc; }
.tab-panel { padding: 20px; background: #f7fafc; border-radius: 0 0 8px 8px; }
.checkbox-label { display: flex; align-items: center; gap: 10px; margin-bottom: 15px; cursor: pointer; }
.hint { font-size: 14px; color: #718096; margin-top: 10px; }
.live-region { margin-top: 15px; padding: 15px; background: #edf2f7; border-radius: 8px; min-height: 50px; font-weight: 500; }
.tooltip-trigger { position: relative; }
.tooltip { position: absolute; top: 100%; left: 50%; transform: translateX(-50%); margin-top: 8px; padding: 8px 12px; background: #2d3748; color: white; border-radius: 6px; font-size: 14px; white-space: nowrap; z-index: 10; }
.tooltip::before { content: ''; position: absolute; bottom: 100%; left: 50%; transform: translateX(-50%); border: 6px solid transparent; border-bottom-color: #2d3748; }
.validation-form { display: flex; flex-direction: column; gap: 10px; }
.validation-form input { padding: 8px 12px; border: 1px solid #cbd5e0; border-radius: 4px; }
.validation-form input.error { border-color: #fc8181; }
.error-message { color: #c53030; font-size: 14px; }
.menu { position: absolute; margin-top: 8px; background: white; border: 1px solid #e2e8f0; border-radius: 8px; padding: 8px; list-style: none; box-shadow: 0 10px 30px rgba(0,0,0,0.15); min-width: 180px; }
.menu li { padding: 10px 16px; cursor: pointer; border-radius: 4px; }
.menu li:hover, .menu li:focus { background: #edf2f7; outline: none; }
.selected-text { margin-top: 10px; font-weight: 500; color: #667eea; }
</style>
