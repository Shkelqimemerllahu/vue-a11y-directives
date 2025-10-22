<template>
  <div class="page">
    <h1>Real-World Examples</h1>
    <p class="lead">Production-ready examples showing how to use Vue A11y Directives in common UI patterns and real applications.</p>

    <section class="section">
      <h2>1. Shopping Cart with Drawer</h2>
      <p>A complete e-commerce cart with focus trap, announcements, and keyboard navigation.</p>
      
      <CodeExample title="Shopping Cart Component" :code="examples.shoppingCart">
        <template #demo>
          <div class="demo-box">
            <div class="shop-header">
              <h3>Product Store</h3>
              <button @click="cartOpen = true" class="cart-button">
                🛒 Cart ({{ cartItems.length }})
              </button>
            </div>
            
            <div class="product-grid">
              <div v-for="product in products" :key="product.id" class="product-card">
                <div class="product-image">{{ product.emoji }}</div>
                <h4>{{ product.name }}</h4>
                <p class="price">${{ product.price }}</p>
                <button @click="addToCart(product)" class="btn-primary">Add to Cart</button>
              </div>
            </div>
            
            <div v-if="cartOpen" class="drawer-overlay" @click.self="cartOpen = false">
              <div v-a11y-trap-focus class="drawer">
                <div class="drawer-header">
                  <h3>Shopping Cart</h3>
                  <button @click="cartOpen = false" class="close-btn" aria-label="Close cart">×</button>
                </div>
                
                <div class="drawer-body">
                  <div 
                    v-a11y-announce="cartAnnouncement" 
                    aria-live="polite" 
                    class="sr-only"
                  >
                    {{ cartAnnouncement }}
                  </div>
                  
                  <div v-if="cartItems.length === 0" class="empty-cart">
                    Your cart is empty
                  </div>
                  
                  <div 
                    v-for="(item, index) in cartItems" 
                    :key="index"
                    class="cart-item"
                  >
                    <span>{{ item.name }} - ${{ item.price }}</span>
                    <button @click="removeFromCart(index)" class="btn-remove">Remove</button>
                  </div>
                </div>
                
                <div class="drawer-footer">
                  <div class="total">Total: ${{ cartTotal }}</div>
                  <button 
                    :disabled="cartItems.length === 0" 
                    @click="checkout"
                    class="btn-primary btn-block"
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </template>
      </CodeExample>
    </section>

    <section class="section">
      <h2>2. Modal Form with Validation</h2>
      <p>Contact form in a modal with focus management, live validation, and announcements.</p>
      
      <CodeExample title="Contact Form Modal" :code="examples.modalForm">
        <template #demo>
          <div class="demo-box">
            <button @click="modalOpen = true" class="btn-primary">Open Contact Form</button>
            
            <div v-if="modalOpen" class="modal-overlay" @click.self="modalOpen = false">
              <div v-a11y-trap-focus class="modal-content">
                <div class="modal-header">
                  <h3>Contact Us</h3>
                  <button @click="modalOpen = false" class="close-btn">×</button>
                </div>
                
                <form @submit.prevent="submitForm" class="modal-body">
                  <div 
                    v-a11y-announce="formAnnouncement" 
                    aria-live="assertive" 
                    class="sr-only"
                  >
                    {{ formAnnouncement }}
                  </div>
                  
                  <div class="form-group">
                    <label for="contact-name">Name *</label>
                    <input 
                      id="contact-name"
                      v-model="form.name"
                      v-a11y-focus
                      v-a11y-aria="{ 
                        invalid: errors.name ? 'true' : null,
                        'aria-describedby': errors.name ? 'name-error' : null
                      }"
                      @blur="validateField('name')"
                      type="text"
                      :class="{ error: errors.name }"
                    />
                    <div v-if="errors.name" id="name-error" class="error-message" role="alert">
                      {{ errors.name }}
                    </div>
                  </div>
                  
                  <div class="form-group">
                    <label for="contact-email">Email *</label>
                    <input 
                      id="contact-email"
                      v-model="form.email"
                      v-a11y-aria="{ 
                        invalid: errors.email ? 'true' : null,
                        'aria-describedby': errors.email ? 'email-error' : null
                      }"
                      @blur="validateField('email')"
                      type="email"
                      :class="{ error: errors.email }"
                    />
                    <div v-if="errors.email" id="email-error" class="error-message" role="alert">
                      {{ errors.email }}
                    </div>
                  </div>
                  
                  <div class="form-group">
                    <label for="contact-message">Message *</label>
                    <textarea 
                      id="contact-message"
                      v-model="form.message"
                      v-a11y-aria="{ 
                        invalid: errors.message ? 'true' : null,
                        'aria-describedby': errors.message ? 'message-error' : null
                      }"
                      @blur="validateField('message')"
                      rows="4"
                      :class="{ error: errors.message }"
                    ></textarea>
                    <div v-if="errors.message" id="message-error" class="error-message" role="alert">
                      {{ errors.message }}
                    </div>
                  </div>
                  
                  <div class="modal-footer">
                    <button type="button" @click="modalOpen = false" class="btn-secondary">Cancel</button>
                    <button type="submit" :disabled="!isFormValid" class="btn-primary">Send Message</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </template>
      </CodeExample>
    </section>

    <section class="section">
      <h2>3. Data Table with Keyboard Navigation</h2>
      <p>Sortable, filterable table with full keyboard support and screen reader announcements.</p>
      
      <CodeExample title="Accessible Data Table" :code="examples.dataTable">
        <template #demo>
          <div class="demo-box">
            <div class="table-controls">
              <input 
                v-model="tableSearch"
                @input="filterTable"
                type="search"
                placeholder="Search users..."
                class="search-input"
              />
              <div 
                v-a11y-announce="tableAnnouncement" 
                aria-live="polite"
                class="sr-only"
              >
                {{ tableAnnouncement }}
              </div>
            </div>
            
            <div 
              v-a11y-keyboard="tableKeyboardHandlers"
              class="data-table"
              tabindex="0"
              role="grid"
            >
              <table>
                <thead>
                  <tr role="row">
                    <th 
                      v-for="column in tableColumns" 
                      :key="column.key"
                      @click="sortTable(column.key)"
                      class="sortable"
                      role="columnheader"
                    >
                      {{ column.label }}
                      <span v-if="sortKey === column.key">
                        {{ sortOrder === 'asc' ? '▲' : '▼' }}
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr 
                    v-for="(user, index) in filteredUsers" 
                    :key="user.id"
                    :class="{ 'selected-row': selectedRow === index }"
                    @click="selectedRow = index"
                    role="row"
                  >
                    <td role="gridcell">{{ user.name }}</td>
                    <td role="gridcell">{{ user.email }}</td>
                    <td role="gridcell">{{ user.role }}</td>
                    <td role="gridcell">{{ user.status }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div class="table-footer">
              Showing {{ filteredUsers.length }} of {{ tableUsers.length }} users
            </div>
          </div>
        </template>
      </CodeExample>
    </section>

    <section class="section">
      <h2>4. Accessible Tabs with Dynamic Content</h2>
      <p>Tab interface with lazy-loaded content, keyboard navigation, and proper ARIA attributes.</p>
      
      <CodeExample title="Tab Panel Component" :code="examples.tabPanel">
        <template #demo>
          <div class="demo-box">
            <div 
              v-a11y-keyboard="tabKeyboardHandlers"
              class="tab-interface"
              tabindex="0"
            >
              <div class="tabs" role="tablist">
                <button 
                  v-for="(tab, index) in tabPanels"
                  :key="index"
                  :id="`tab-${index}`"
                  v-a11y-aria="{ 
                    selected: activeTabIndex === index,
                    controls: `panel-${index}`
                  }"
                  @click="selectTab(index)"
                  :class="['tab', { active: activeTabIndex === index }]"
                  role="tab"
                  :tabindex="activeTabIndex === index ? 0 : -1"
                >
                  {{ tab.title }}
                </button>
              </div>
              
              <div 
                v-a11y-announce="tabAnnouncement"
                aria-live="polite"
                class="sr-only"
              >
                {{ tabAnnouncement }}
              </div>
              
              <div 
                v-for="(tab, index) in tabPanels"
                :key="index"
                v-show="activeTabIndex === index"
                v-a11y-aria="{ labelledby: `tab-${index}` }"
                :id="`panel-${index}`"
                class="tab-content"
                role="tabpanel"
              >
                <h4>{{ tab.title }}</h4>
                <p>{{ tab.content }}</p>
                <button v-if="tab.hasAction" class="btn-primary">{{ tab.action }}</button>
              </div>
            </div>
          </div>
        </template>
      </CodeExample>
    </section>

    <section class="section">
      <h2>5. Multi-Step Form Wizard</h2>
      <p>Step-by-step form with progress indication, validation, and keyboard navigation.</p>
      
      <CodeExample title="Form Wizard" :code="examples.wizard">
        <template #demo>
          <div class="demo-box">
            <div class="wizard">
              <div class="wizard-progress">
                <div 
                  v-for="(step, index) in wizardSteps"
                  :key="index"
                  :class="['wizard-step', { 
                    active: wizardCurrentStep === index,
                    completed: wizardCurrentStep > index
                  }]"
                >
                  <div class="step-number">{{ index + 1 }}</div>
                  <div class="step-label">{{ step.label }}</div>
                </div>
              </div>
              
              <div 
                v-a11y-announce="wizardAnnouncement"
                aria-live="polite"
                class="sr-only"
              >
                {{ wizardAnnouncement }}
              </div>
              
              <div class="wizard-content">
                <div v-if="wizardCurrentStep === 0">
                  <h3>Personal Information</h3>
                  <input v-model="wizardData.firstName" v-a11y-focus type="text" placeholder="First Name" />
                  <input v-model="wizardData.lastName" type="text" placeholder="Last Name" />
                </div>
                
                <div v-if="wizardCurrentStep === 1">
                  <h3>Contact Details</h3>
                  <input v-model="wizardData.email" v-a11y-focus type="email" placeholder="Email" />
                  <input v-model="wizardData.phone" type="tel" placeholder="Phone" />
                </div>
                
                <div v-if="wizardCurrentStep === 2">
                  <h3>Review & Submit</h3>
                  <div class="review-section">
                    <p><strong>Name:</strong> {{ wizardData.firstName }} {{ wizardData.lastName }}</p>
                    <p><strong>Email:</strong> {{ wizardData.email }}</p>
                    <p><strong>Phone:</strong> {{ wizardData.phone }}</p>
                  </div>
                </div>
              </div>
              
              <div class="wizard-actions">
                <button 
                  v-if="wizardCurrentStep > 0"
                  @click="wizardPrev"
                  class="btn-secondary"
                >
                  Previous
                </button>
                <button 
                  v-if="wizardCurrentStep < wizardSteps.length - 1"
                  @click="wizardNext"
                  class="btn-primary"
                >
                  Next
                </button>
                <button 
                  v-if="wizardCurrentStep === wizardSteps.length - 1"
                  @click="wizardSubmit"
                  class="btn-primary"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </template>
      </CodeExample>
    </section>

    <section class="section">
      <h2>6. Notification System</h2>
      <p>Toast notifications with auto-dismiss, screen reader announcements, and keyboard control.</p>
      
      <CodeExample title="Toast Notifications" :code="examples.notifications">
        <template #demo>
          <div class="demo-box">
            <div class="notification-demo">
              <button @click="addNotif('success', 'Changes saved successfully!')" class="btn-success">Success</button>
              <button @click="addNotif('error', 'Failed to save changes')" class="btn-danger">Error</button>
              <button @click="addNotif('warning', 'Your session will expire soon')" class="btn-warning">Warning</button>
              <button @click="addNotif('info', 'You have 3 new messages')" class="btn-secondary">Info</button>
            </div>
            
            <div class="notifications-container">
              <div 
                v-for="notif in notifications"
                :key="notif.id"
                v-a11y-announce="notif.message"
                :aria-live="notif.type === 'error' ? 'assertive' : 'polite'"
                :class="['notification', notif.type]"
                role="alert"
              >
                <span class="notif-icon">{{ notif.icon }}</span>
                <span class="notif-message">{{ notif.message }}</span>
                <button 
                  @click="removeNotif(notif.id)" 
                  class="notif-close"
                  aria-label="Close notification"
                >
                  ×
                </button>
              </div>
            </div>
          </div>
        </template>
      </CodeExample>
    </section>
  </div>
</template>

<script>
import CodeExample from '../components/CodeExample.vue'

export default {
  name: 'Examples',
  components: { CodeExample },
  data() {
    return {
      // Shopping Cart
      cartOpen: false,
      cartItems: [],
      cartAnnouncement: '',
      products: [
        { id: 1, name: 'Laptop', price: 999, emoji: '💻' },
        { id: 2, name: 'Mouse', price: 29, emoji: '🖱️' },
        { id: 3, name: 'Keyboard', price: 79, emoji: '⌨️' },
        { id: 4, name: 'Monitor', price: 299, emoji: '🖥️' }
      ],
      
      // Modal Form
      modalOpen: false,
      form: { name: '', email: '', message: '' },
      errors: { name: '', email: '', message: '' },
      formAnnouncement: '',
      
      // Data Table
      tableSearch: '',
      tableAnnouncement: '',
      sortKey: '',
      sortOrder: 'asc',
      selectedRow: 0,
      tableColumns: [
        { key: 'name', label: 'Name' },
        { key: 'email', label: 'Email' },
        { key: 'role', label: 'Role' },
        { key: 'status', label: 'Status' }
      ],
      tableUsers: [
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active' },
        { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'Inactive' },
        { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Manager', status: 'Active' }
      ],
      filteredUsers: [],
      
      // Tabs
      activeTabIndex: 0,
      tabAnnouncement: '',
      tabPanels: [
        { title: 'Overview', content: 'Welcome to our platform. Get started by exploring the features.', hasAction: true, action: 'Get Started' },
        { title: 'Features', content: 'Discover powerful features including real-time collaboration, advanced analytics, and more.', hasAction: false },
        { title: 'Pricing', content: 'Choose a plan that works for you. Start with our free tier or upgrade for more features.', hasAction: true, action: 'View Plans' }
      ],
      
      // Wizard
      wizardCurrentStep: 0,
      wizardAnnouncement: '',
      wizardSteps: [
        { label: 'Personal' },
        { label: 'Contact' },
        { label: 'Review' }
      ],
      wizardData: {
        firstName: '',
        lastName: '',
        email: '',
        phone: ''
      },
      
      // Notifications
      notifications: [],
      notifId: 0,
      
      examples: {
        shoppingCart: `<template>
  <div>
    <button @click="cartOpen = true">Cart ({{ items.length }})</button>
    
    <div v-if="cartOpen" class="drawer-overlay">
      <div v-a11y-trap-focus class="drawer">
        <h3>Shopping Cart</h3>
        <button @click="cartOpen = false">Close</button>
        
        <div v-a11y-announce="announcement" aria-live="polite"></div>
        
        <div v-for="item in items" :key="item.id">
          {{ item.name }} - \${{ item.price }}
          <button @click="remove(item)">Remove</button>
        </div>
        
        <button @click="checkout">Checkout</button>
      </div>
    </div>
  </div>
</template>`,
        modalForm: `<template>
  <div v-if="open" class="modal-overlay">
    <div v-a11y-trap-focus class="modal">
      <h3>Contact Form</h3>
      
      <div v-a11y-announce="announcement" aria-live="assertive"></div>
      
      <form @submit.prevent="submit">
        <input 
          v-model="form.name"
          v-a11y-focus
          v-a11y-aria="{ invalid: errors.name, 'aria-describedby': 'name-error' }"
          @blur="validate('name')"
        />
        <div v-if="errors.name" id="name-error" role="alert">
          {{ errors.name }}
        </div>
        
        <button type="submit">Send</button>
      </form>
    </div>
  </div>
</template>`,
        dataTable: `<template>
  <div v-a11y-keyboard="keyboardHandlers" tabindex="0" role="grid">
    <div v-a11y-announce="announcement" aria-live="polite"></div>
    
    <table>
      <thead>
        <tr>
          <th @click="sort('name')">Name</th>
          <th @click="sort('email')">Email</th>
        </tr>
      </thead>
      <tbody>
        <tr 
          v-for="(user, i) in users" 
          :class="{ selected: selectedRow === i }"
        >
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>`,
        tabPanel: `<template>
  <div v-a11y-keyboard="tabHandlers" tabindex="0">
    <div role="tablist">
      <button 
        v-for="(tab, i) in tabs"
        v-a11y-aria="{ selected: active === i, controls: 'panel-' + i }"
        @click="selectTab(i)"
        role="tab"
      >
        {{ tab.title }}
      </button>
    </div>
    
    <div v-a11y-announce="announcement" aria-live="polite"></div>
    
    <div 
      v-for="(tab, i) in tabs"
      v-show="active === i"
      :id="'panel-' + i"
      role="tabpanel"
    >
      {{ tab.content }}
    </div>
  </div>
</template>`,
        wizard: `<template>
  <div class="wizard">
    <div class="progress">
      <div 
        v-for="(step, i) in steps"
        :class="{ active: currentStep === i }"
      >
        {{ step.label }}
      </div>
    </div>
    
    <div v-a11y-announce="announcement" aria-live="polite"></div>
    
    <div class="content">
      <component :is="steps[currentStep].component" />
    </div>
    
    <button v-if="currentStep > 0" @click="prev">Previous</button>
    <button @click="next">Next</button>
  </div>
</template>`,
        notifications: `<template>
  <div class="notifications">
    <div 
      v-for="notif in notifications"
      v-a11y-announce="notif.message"
      :aria-live="notif.type === 'error' ? 'assertive' : 'polite'"
      :class="['notification', notif.type]"
      role="alert"
    >
      {{ notif.message }}
      <button @click="remove(notif.id)">×</button>
    </div>
  </div>
</template>`
      }
    }
  },
  computed: {
    cartTotal() {
      return this.cartItems.reduce((sum, item) => sum + item.price, 0).toFixed(2)
    },
    isFormValid() {
      return this.form.name && this.form.email && this.form.message && 
             !this.errors.name && !this.errors.email && !this.errors.message
    },
    tableKeyboardHandlers() {
      return {
        arrowUp: (e) => {
          e.preventDefault()
          this.selectedRow = Math.max(0, this.selectedRow - 1)
        },
        arrowDown: (e) => {
          e.preventDefault()
          this.selectedRow = Math.min(this.filteredUsers.length - 1, this.selectedRow + 1)
        }
      }
    },
    tabKeyboardHandlers() {
      return {
        arrowLeft: () => this.selectTab(Math.max(0, this.activeTabIndex - 1)),
        arrowRight: () => this.selectTab(Math.min(this.tabPanels.length - 1, this.activeTabIndex + 1))
      }
    }
  },
  mounted() {
    this.filteredUsers = [...this.tableUsers]
  },
  methods: {
    addToCart(product) {
      this.cartItems.push({ ...product })
      this.cartAnnouncement = `${product.name} added to cart`
    },
    removeFromCart(index) {
      const item = this.cartItems[index]
      this.cartItems.splice(index, 1)
      this.cartAnnouncement = `${item.name} removed from cart`
    },
    checkout() {
      alert('Proceeding to checkout!')
      this.cartOpen = false
    },
    validateField(field) {
      if (field === 'name' && !this.form.name) {
        this.errors.name = 'Name is required'
      } else if (field === 'name') {
        this.errors.name = ''
      }
      
      if (field === 'email' && !this.form.email) {
        this.errors.email = 'Email is required'
      } else if (field === 'email' && !/\S+@\S+\.\S+/.test(this.form.email)) {
        this.errors.email = 'Please enter a valid email'
      } else if (field === 'email') {
        this.errors.email = ''
      }
      
      if (field === 'message' && !this.form.message) {
        this.errors.message = 'Message is required'
      } else if (field === 'message') {
        this.errors.message = ''
      }
    },
    submitForm() {
      if (this.isFormValid) {
        this.formAnnouncement = 'Form submitted successfully!'
        setTimeout(() => {
          this.modalOpen = false
          this.form = { name: '', email: '', message: '' }
        }, 1500)
      }
    },
    filterTable() {
      const query = this.tableSearch.toLowerCase()
      this.filteredUsers = this.tableUsers.filter(user => 
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.role.toLowerCase().includes(query)
      )
      this.tableAnnouncement = `${this.filteredUsers.length} users found`
    },
    sortTable(key) {
      if (this.sortKey === key) {
        this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc'
      } else {
        this.sortKey = key
        this.sortOrder = 'asc'
      }
      
      this.filteredUsers.sort((a, b) => {
        const aVal = a[key]
        const bVal = b[key]
        const modifier = this.sortOrder === 'asc' ? 1 : -1
        return aVal < bVal ? -modifier : modifier
      })
      
      this.tableAnnouncement = `Table sorted by ${key} in ${this.sortOrder}ending order`
    },
    selectTab(index) {
      this.activeTabIndex = index
      this.tabAnnouncement = `${this.tabPanels[index].title} tab selected`
      
      // Focus the selected tab for keyboard navigation
      this.$nextTick(() => {
        const selectedTab = document.getElementById(`tab-${index}`)
        if (selectedTab) {
          selectedTab.focus()
        }
      })
    },
    wizardNext() {
      this.wizardCurrentStep++
      this.wizardAnnouncement = `Step ${this.wizardCurrentStep + 1}: ${this.wizardSteps[this.wizardCurrentStep].label}`
    },
    wizardPrev() {
      this.wizardCurrentStep--
      this.wizardAnnouncement = `Step ${this.wizardCurrentStep + 1}: ${this.wizardSteps[this.wizardCurrentStep].label}`
    },
    wizardSubmit() {
      alert('Form submitted!')
    },
    addNotif(type, message) {
      const icons = { success: '✓', error: '✗', warning: '⚠️', info: 'ℹ️' }
      const notif = {
        id: this.notifId++,
        type,
        message,
        icon: icons[type]
      }
      this.notifications.push(notif)
      setTimeout(() => this.removeNotif(notif.id), 5000)
    },
    removeNotif(id) {
      this.notifications = this.notifications.filter(n => n.id !== id)
    }
  }
}
</script>

<style scoped>
.shop-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.cart-button { padding: 10px 20px; background: #667eea; color: white; border: none; border-radius: 6px; cursor: pointer; }
.product-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 15px; margin-bottom: 20px; }
.product-card { border: 1px solid #e2e8f0; padding: 15px; border-radius: 8px; text-align: center; }
.product-image { font-size: 48px; margin-bottom: 10px; }
.price { font-size: 20px; font-weight: 600; color: #667eea; margin: 10px 0; }
.drawer-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 1000; }
.drawer { position: fixed; right: 0; top: 0; bottom: 0; width: 400px; max-width: 90vw; background: white; display: flex; flex-direction: column; }
.drawer-header, .drawer-footer { padding: 20px; border-bottom: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center; }
.drawer-footer { border-top: 1px solid #e2e8f0; border-bottom: none; flex-direction: column; gap: 15px; }
.drawer-body { flex: 1; overflow-y: auto; padding: 20px; }
.cart-item { display: flex; justify-content: space-between; padding: 15px 0; border-bottom: 1px solid #e2e8f0; }
.empty-cart { text-align: center; padding: 40px; color: #a0aec0; }
.total { font-size: 18px; font-weight: 600; width: 100%; }
.btn-block { width: 100%; }
.close-btn { background: none; border: none; font-size: 28px; cursor: pointer; color: #718096; }
.btn-remove { padding: 4px 12px; background: #fc8181; color: white; border: none; border-radius: 4px; cursor: pointer; }

.modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.6); display: flex; align-items: center; justify-content: center; z-index: 1000; }
.modal-content { background: white; border-radius: 12px; max-width: 500px; width: 90%; box-shadow: 0 20px 60px rgba(0,0,0,0.3); }
.modal-header, .modal-footer { padding: 20px; display: flex; justify-content: space-between; align-items: center; }
.modal-header { border-bottom: 1px solid #e2e8f0; }
.modal-body { padding: 20px; }
.modal-footer { border-top: 1px solid #e2e8f0; gap: 10px; }
.form-group { margin-bottom: 20px; }
.form-group label { display: block; margin-bottom: 5px; font-weight: 500; }
.form-group input, .form-group textarea { width: 100%; padding: 8px 12px; border: 1px solid #cbd5e0; border-radius: 4px; }
.form-group input.error, .form-group textarea.error { border-color: #fc8181; }
.error-message { color: #c53030; font-size: 14px; margin-top: 5px; }

.table-controls { margin-bottom: 15px; }
.search-input { width: 100%; padding: 10px; border: 1px solid #cbd5e0; border-radius: 8px; }
.data-table { border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; }
.data-table:focus { outline: 2px solid #667eea; outline-offset: 2px; }
.data-table table { width: 100%; border-collapse: collapse; }
.data-table th, .data-table td { padding: 12px; text-align: left; border-bottom: 1px solid #e2e8f0; }
.data-table th { background: #f7fafc; font-weight: 600; cursor: pointer; }
.data-table th:hover { background: #edf2f7; }
.selected-row { background: #edf2f7; }
.table-footer { margin-top: 10px; color: #718096; font-size: 14px; }

.tab-interface:focus { outline: 2px solid #667eea; outline-offset: 2px; }
.tabs { display: flex; gap: 5px; border-bottom: 2px solid #e2e8f0; margin-bottom: 20px; }
.tab { padding: 12px 24px; border: none; background: none; cursor: pointer; border-bottom: 3px solid transparent; }
.tab.active { border-bottom-color: #667eea; color: #667eea; font-weight: 600; }
.tab-content { padding: 20px; background: #f7fafc; border-radius: 8px; }

.wizard { border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; }
.wizard-progress { display: flex; justify-content: space-between; margin-bottom: 30px; }
.wizard-step { text-align: center; flex: 1; }
.step-number { width: 40px; height: 40px; border-radius: 50%; background: #e2e8f0; color: #718096; display: flex; align-items: center; justify-content: center; margin: 0 auto 8px; font-weight: 600; }
.wizard-step.active .step-number { background: #667eea; color: white; }
.wizard-step.completed .step-number { background: #48bb78; color: white; }
.wizard-content { margin-bottom: 20px; }
.wizard-content input { width: 100%; padding: 10px; margin-bottom: 10px; border: 1px solid #cbd5e0; border-radius: 4px; }
.review-section { background: #f7fafc; padding: 20px; border-radius: 8px; }
.wizard-actions { display: flex; gap: 10px; justify-content: flex-end; }

.notification-demo { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 20px; }
.notifications-container { position: fixed; top: 20px; right: 20px; z-index: 1000; display: flex; flex-direction: column; gap: 10px; min-width: 300px; }
.notification { padding: 15px; border-radius: 8px; display: flex; align-items: center; gap: 10px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); animation: slideIn 0.3s; }
.notification.success { background: #c6f6d5; color: #22543d; }
.notification.error { background: #fed7d7; color: #742a2a; }
.notification.warning { background: #fef3c7; color: #78350f; }
.notification.info { background: #bee3f8; color: #2c5282; }
.notif-icon { font-size: 20px; }
.notif-message { flex: 1; }
.notif-close { background: none; border: none; font-size: 24px; cursor: pointer; padding: 0; line-height: 1; }
@keyframes slideIn { from { transform: translateX(400px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }

.btn-success { background: #48bb78; color: white; }
.btn-success:hover { background: #38a169; }
.btn-warning { background: #ed8936; color: white; }
.btn-warning:hover { background: #dd6b20; }
.sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); border: 0; }
</style>
