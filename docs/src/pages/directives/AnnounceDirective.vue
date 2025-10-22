<template>
  <div class="page">
    <h1>Announce Directive</h1>
    <p class="lead">Make dynamic content changes accessible to screen readers with ARIA live regions - essential for notifications, status updates, and real-time changes.</p>

    <section class="section">
      <h2>Overview</h2>
      <p>The <code>v-a11y-announce</code> directive creates ARIA live regions that announce content changes to screen reader users. Perfect for notifications, loading states, form validation, and any dynamic content updates.</p>
    </section>

    <section class="section">
      <h2>Basic Announcement</h2>
      <CodeExample title="Simple Status Announcement" :code="examples.basic">
        <template #demo>
          <div class="demo-box">
            <button @click="announce('Task completed successfully!')" class="btn-primary">Complete Task</button>
            <button @click="announce('Error: Unable to save changes')" class="btn-danger">Trigger Error</button>
            <div v-a11y-announce="announcement" aria-live="polite" class="announcement-display">
              {{ announcement || 'No announcements yet' }}
            </div>
          </div>
        </template>
      </CodeExample>
    </section>

    <section class="section">
      <h2>Loading States</h2>
      <CodeExample title="Announce Loading Progress" :code="examples.loading">
        <template #demo>
          <div class="demo-box">
            <button @click="startLoading" :disabled="isLoading" class="btn-primary">
              {{ isLoading ? 'Loading...' : 'Load Data' }}
            </button>
            <div v-a11y-announce="loadingStatus" aria-live="polite" class="loading-status">
              <div v-if="isLoading" class="loader"></div>
              <p>{{ loadingStatus }}</p>
            </div>
          </div>
        </template>
      </CodeExample>
    </section>

    <section class="section">
      <h2>Form Validation</h2>
      <CodeExample title="Live Validation Feedback" :code="examples.validation">
        <template #demo>
          <div class="demo-box">
            <form @submit.prevent="submitForm" class="validation-form">
              <label>
                Email:
                <input 
                  v-model="email"
                  @blur="validateEmail"
                  type="email"
                  :class="{ error: emailError }"
                  placeholder="your@email.com"
                />
              </label>
              <div v-a11y-announce="emailError" aria-live="assertive" class="error-message">
                {{ emailError }}
              </div>
              
              <label>
                Password (min 8 characters):
                <input 
                  v-model="password"
                  @input="validatePassword"
                  type="password"
                  :class="{ error: passwordError }"
                />
              </label>
              <div v-a11y-announce="passwordError" aria-live="assertive" class="error-message">
                {{ passwordError }}
              </div>
              
              <button type="submit" :disabled="!isFormValid" class="btn-primary">Submit</button>
              <div v-a11y-announce="formSuccess" aria-live="polite" class="success-message">
                {{ formSuccess }}
              </div>
            </form>
          </div>
        </template>
      </CodeExample>
    </section>

    <section class="section">
      <h2>Live Search Results</h2>
      <CodeExample title="Announce Search Count" :code="examples.search">
        <template #demo>
          <div class="demo-box">
            <input 
              v-model="searchQuery"
              @input="performSearch"
              type="text"
              placeholder="Search products..."
              class="search-input"
            />
            <div v-a11y-announce="searchAnnouncement" aria-live="polite" class="search-results">
              <p class="search-count">{{ searchAnnouncement }}</p>
              <div v-for="result in searchResults" :key="result.id" class="search-result-item">
                {{ result.name }} - ${{ result.price }}
              </div>
            </div>
          </div>
        </template>
      </CodeExample>
    </section>

    <section class="section">
      <h2>Notification System</h2>
      <CodeExample title="Toast Notifications" :code="examples.notifications">
        <template #demo>
          <div class="demo-box">
            <div class="notification-controls">
              <button @click="addNotification('success', 'Changes saved!')" class="btn-success">Success</button>
              <button @click="addNotification('warning', 'Warning: Low storage')" class="btn-warning">Warning</button>
              <button @click="addNotification('error', 'Error: Connection failed')" class="btn-danger">Error</button>
              <button @click="addNotification('info', 'New message received')" class="btn-secondary">Info</button>
            </div>
            <div class="notifications-container">
              <div 
                v-for="notif in notifications"
                :key="notif.id"
                v-a11y-announce="notif.message"
                :class="['notification', notif.type]"
                aria-live="assertive"
              >
                <span class="notif-icon">{{ notif.icon }}</span>
                <span>{{ notif.message }}</span>
                <button @click="removeNotification(notif.id)" class="notif-close">×</button>
              </div>
            </div>
          </div>
        </template>
      </CodeExample>
    </section>

    <section class="section">
      <h2>Real-Time Updates</h2>
      <CodeExample title="Live Counter/Timer" :code="examples.realtime">
        <template #demo>
          <div class="demo-box">
            <button @click="toggleTimer" class="btn-primary">
              {{ timerRunning ? 'Stop' : 'Start' }} Timer
            </button>
            <div v-a11y-announce="timerAnnouncement" aria-live="polite" class="timer-display">
              <div class="timer-value">{{ timerValue }}s</div>
              <p class="timer-status">{{ timerAnnouncement }}</p>
            </div>
          </div>
        </template>
      </CodeExample>
    </section>

    <section class="section">
      <h2>API Reference</h2>
      <div class="api-table">
        <table>
          <thead>
            <tr><th>Property</th><th>Type</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr><td><code>message</code></td><td>String</td><td>The message to announce</td></tr>
            <tr><td><code>aria-live</code></td><td>'polite' | 'assertive'</td><td>Interruption level</td></tr>
            <tr><td><code>aria-atomic</code></td><td>Boolean</td><td>Announce entire region or just changes</td></tr>
            <tr><td><code>role</code></td><td>'status' | 'alert'</td><td>ARIA role for the live region</td></tr>
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
            <strong>Use 'polite' for most announcements:</strong>
            <p>Non-critical updates should use aria-live="polite" to avoid interrupting users.</p>
          </div>
        </div>
        <div class="practice-item">
          <span class="practice-icon">✓</span>
          <div>
            <strong>Reserve 'assertive' for urgent messages:</strong>
            <p>Errors, warnings, and time-sensitive info should use aria-live="assertive".</p>
          </div>
        </div>
        <div class="practice-item">
          <span class="practice-icon">✓</span>
          <div>
            <strong>Keep announcements concise:</strong>
            <p>Screen reader users prefer brief, clear messages.</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import CodeExample from '../../components/CodeExample.vue'
export default {
  name: 'AnnounceDirective',
  components: { CodeExample },
  data() {
    return {
      announcement: '',
      isLoading: false,
      loadingStatus: '',
      email: '',
      emailError: '',
      password: '',
      passwordError: '',
      formSuccess: '',
      searchQuery: '',
      searchAnnouncement: '',
      searchResults: [],
      notifications: [],
      notifId: 0,
      timerValue: 0,
      timerRunning: false,
      timerInterval: null,
      timerAnnouncement: '',
      allProducts: [
        { id: 1, name: 'Laptop', price: 999 },
        { id: 2, name: 'Mouse', price: 29 },
        { id: 3, name: 'Keyboard', price: 79 },
        { id: 4, name: 'Monitor', price: 299 },
        { id: 5, name: 'Headphones', price: 149 }
      ],
      examples: {
        basic: '<div v-a11y-announce="message" aria-live="polite">\\n  {{ message }}\\n</div>',
        loading: '<div v-a11y-announce="status" aria-live="polite">\\n  <p v-if="loading">Loading...</p>\\n  <p v-else>{{ status }}</p>\\n</div>',
        validation: '<div v-a11y-announce="errorMessage" aria-live="assertive" role="alert">\\n  {{ errorMessage }}\\n</div>',
        search: '<div v-a11y-announce="resultCount" aria-live="polite">\\n  {{ resultCount }} results found\\n</div>',
        notifications: '<div v-a11y-announce="notification" aria-live="assertive">\\n  {{ notification }}\\n</div>',
        realtime: '<div v-a11y-announce="status" aria-live="polite">\\n  {{ counter }} seconds elapsed\\n</div>'
      }
    }
  },
  computed: {
    isFormValid() {
      return this.email && this.password && !this.emailError && !this.passwordError
    }
  },
  methods: {
    announce(msg) {
      this.announcement = msg
      setTimeout(() => { this.announcement = '' }, 3000)
    },
    startLoading() {
      this.isLoading = true
      this.loadingStatus = 'Loading data...'
      setTimeout(() => {
        this.isLoading = false
        this.loadingStatus = 'Data loaded successfully!'
        setTimeout(() => { this.loadingStatus = '' }, 3000)
      }, 2000)
    },
    validateEmail() {
      if (!this.email) {
        this.emailError = 'Email is required'
      } else if (!/\S+@\S+\.\S+/.test(this.email)) {
        this.emailError = 'Please enter a valid email'
      } else {
        this.emailError = ''
      }
    },
    validatePassword() {
      if (this.password.length > 0 && this.password.length < 8) {
        this.passwordError = 'Password must be at least 8 characters'
      } else {
        this.passwordError = ''
      }
    },
    submitForm() {
      if (this.isFormValid) {
        this.formSuccess = '✓ Form submitted successfully!'
        setTimeout(() => { this.formSuccess = '' }, 3000)
      }
    },
    performSearch() {
      if (!this.searchQuery) {
        this.searchResults = []
        this.searchAnnouncement = ''
        return
      }
      this.searchResults = this.allProducts.filter(p => 
        p.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      )
      this.searchAnnouncement = `${this.searchResults.length} ${this.searchResults.length === 1 ? 'result' : 'results'} found`
    },
    addNotification(type, message) {
      const icons = { success: '✓', warning: '⚠️', error: '✗', info: 'ℹ️' }
      const notif = {
        id: this.notifId++,
        type,
        message,
        icon: icons[type]
      }
      this.notifications.push(notif)
      setTimeout(() => this.removeNotification(notif.id), 5000)
    },
    removeNotification(id) {
      this.notifications = this.notifications.filter(n => n.id !== id)
    },
    toggleTimer() {
      if (this.timerRunning) {
        clearInterval(this.timerInterval)
        this.timerRunning = false
        this.timerAnnouncement = `Timer stopped at ${this.timerValue} seconds`
      } else {
        this.timerValue = 0
        this.timerRunning = true
        this.timerAnnouncement = 'Timer started'
        this.timerInterval = setInterval(() => {
          this.timerValue++
          if (this.timerValue % 5 === 0) {
            this.timerAnnouncement = `${this.timerValue} seconds elapsed`
          }
        }, 1000)
      }
    }
  },
  beforeUnmount() {
    if (this.timerInterval) clearInterval(this.timerInterval)
  }
}
</script>

<style scoped>
.announcement-display, .loading-status { margin-top: 15px; padding: 15px; background: #edf2f7; border-radius: 8px; min-height: 50px; }
.loader { border: 3px solid #e2e8f0; border-top: 3px solid #667eea; border-radius: 50%; width: 30px; height: 30px; animation: spin 1s linear infinite; margin: 0 auto 10px; }
@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
.validation-form { display: flex; flex-direction: column; gap: 15px; }
.validation-form label { display: flex; flex-direction: column; gap: 5px; }
.validation-form input { padding: 8px 12px; border: 1px solid #cbd5e0; border-radius: 4px; }
.validation-form input.error { border-color: #fc8181; }
.error-message { color: #c53030; font-size: 14px; min-height: 20px; }
.success-message { color: #22543d; font-size: 14px; background: #c6f6d5; padding: 10px; border-radius: 4px; min-height: 20px; }
.search-input { width: 100%; padding: 10px; border: 1px solid #cbd5e0; border-radius: 8px; font-size: 16px; }
.search-results { margin-top: 15px; }
.search-count { font-weight: 600; margin-bottom: 10px; color: #2d3748; }
.search-result-item { padding: 10px; border-bottom: 1px solid #e2e8f0; }
.notification-controls { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 20px; }
.notifications-container { position: fixed; top: 20px; right: 20px; z-index: 1000; display: flex; flex-direction: column; gap: 10px; min-width: 300px; }
.notification { padding: 15px; border-radius: 8px; display: flex; align-items: center; gap: 10px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); animation: slideIn 0.3s; }
.notification.success { background: #c6f6d5; color: #22543d; }
.notification.warning { background: #fef3c7; color: #78350f; }
.notification.error { background: #fed7d7; color: #742a2a; }
.notification.info { background: #bee3f8; color: #2c5282; }
.notif-icon { font-size: 20px; }
.notif-close { background: none; border: none; font-size: 24px; cursor: pointer; margin-left: auto; padding: 0; line-height: 1; }
@keyframes slideIn { from { transform: translateX(400px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
.timer-display { text-align: center; margin-top: 20px; }
.timer-value { font-size: 48px; font-weight: 700; color: #667eea; }
.timer-status { margin-top: 10px; color: #718096; }
.btn-success { background: #48bb78; }
.btn-success:hover { background: #38a169; }
.btn-warning { background: #ed8936; }
.btn-warning:hover { background: #dd6b20; }
</style>
