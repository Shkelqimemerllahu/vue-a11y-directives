<template>
  <div class="page">
    <h1>Trap Focus Directive</h1>
    <p class="lead">Keep keyboard focus contained within a specific element - essential for modals, dialogs, and dropdown menus.</p>

    <section class="section">
      <h2>Overview</h2>
      <p>The <code>v-a11y-trap-focus</code> directive creates a focus trap that prevents keyboard navigation from leaving a container. When Tab is pressed at the last element, focus moves to the first. Shift+Tab from the first moves to the last.</p>
    </section>

    <section class="section">
      <h2>Basic Usage</h2>
      <CodeExample title="Simple Focus Trap" :code="examples.basic">
        <template #demo>
          <div class="demo-box">
            <button @click="showBasic = !showBasic" class="btn-primary">
              {{ showBasic ? 'Close' : 'Open' }} Focus Trap
            </button>
            <div v-if="showBasic" v-a11y-trap-focus class="trap-container">
              <h3>Focus is trapped here</h3>
              <p>Press Tab or Shift+Tab - focus cycles within this container.</p>
              <input type="text" placeholder="First input" />
              <input type="text" placeholder="Second input" />
              <button @click="showBasic = false">Close</button>
            </div>
          </div>
        </template>
      </CodeExample>
    </section>

    <section class="section">
      <h2>Modal Dialog</h2>
      <CodeExample title="Modal with Focus Trap" :code="examples.modal">
        <template #demo>
          <div class="demo-box">
            <button @click="showModal = true" class="btn-primary">Open Modal</button>
            <div v-if="showModal" class="modal-overlay" @click.self="showModal = false">
              <div v-a11y-trap-focus class="modal-content">
                <div class="modal-header">
                  <h3>Confirm Action</h3>
                  <button @click="showModal = false" class="close-btn">×</button>
                </div>
                <div class="modal-body">
                  <p>This is a modal with focus trap. Try tabbing through elements.</p>
                  <input v-model="modalInput" type="text" placeholder="Type something" />
                </div>
                <div class="modal-footer">
                  <button @click="showModal = false" class="btn-secondary">Cancel</button>
                  <button @click="showModal = false" class="btn-primary">Confirm</button>
                </div>
              </div>
            </div>
          </div>
        </template>
      </CodeExample>
    </section>

    <section class="section">
      <h2>Dropdown Menu</h2>
      <CodeExample title="Dropdown with Trap" :code="examples.dropdown">
        <template #demo>
          <div class="demo-box">
            <button @click="showDropdown = !showDropdown" class="btn-primary">Actions ▼</button>
            <div v-if="showDropdown" v-a11y-trap-focus class="dropdown">
              <button @click="action('edit')" class="dropdown-item">✏️ Edit</button>
              <button @click="action('copy')" class="dropdown-item">📋 Copy</button>
              <button @click="action('delete')" class="dropdown-item">🗑️ Delete</button>
            </div>
          </div>
        </template>
      </CodeExample>
    </section>

    <section class="section">
      <h2>Side Drawer</h2>
      <CodeExample title="Shopping Cart Drawer" :code="examples.drawer">
        <template #demo>
          <div class="demo-box">
            <button @click="showDrawer = true" class="btn-primary">🛒 Cart ({{ cart.length }})</button>
            <div v-if="showDrawer" class="drawer-overlay" @click.self="showDrawer = false">
              <div v-a11y-trap-focus class="drawer">
                <div class="drawer-header">
                  <h3>Shopping Cart</h3>
                  <button @click="showDrawer = false" class="close-btn">×</button>
                </div>
                <div class="drawer-body">
                  <div v-for="(item, i) in cart" :key="i" class="cart-item">
                    <span>{{ item.name }} - ${{ item.price }}</span>
                    <button @click="cart.splice(i, 1)" class="btn-sm">Remove</button>
                  </div>
                  <p v-if="cart.length === 0" class="empty">Cart is empty</p>
                </div>
                <div class="drawer-footer">
                  <button @click="showDrawer = false" class="btn-primary btn-block">Checkout</button>
                </div>
              </div>
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
            <tr><th>Property</th><th>Type</th><th>Default</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr><td><code>enabled</code></td><td>Boolean</td><td><code>true</code></td><td>Enable/disable trap</td></tr>
            <tr><td><code>initialFocus</code></td><td>String</td><td><code>null</code></td><td>Selector for initial focus</td></tr>
            <tr><td><code>returnFocus</code></td><td>Boolean</td><td><code>false</code></td><td>Return focus on deactivate</td></tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script>
import CodeExample from '../../components/CodeExample.vue'
export default {
  name: 'TrapFocusDirective',
  components: { CodeExample },
  data() {
    return {
      showBasic: false, showModal: false, showDropdown: false, showDrawer: false,
      modalInput: '', cart: [{ name: 'Item A', price: 29.99 }],
      examples: {
        basic: '<div v-a11y-trap-focus>\\n  <input type="text" />\\n  <button>Close</button>\\n</div>',
        modal: '<div v-if="show" class="modal">\\n  <div v-a11y-trap-focus>\\n    <h2>Title</h2>\\n    <button @click="close">Close</button>\\n  </div>\\n</div>',
        dropdown: '<div v-a11y-trap-focus class="dropdown">\\n  <button>Edit</button>\\n  <button>Delete</button>\\n</div>',
        drawer: '<div v-a11y-trap-focus class="drawer">\\n  <h3>Cart</h3>\\n  <button>Checkout</button>\\n</div>'
      }
    }
  },
  methods: {
    action(type) { console.log(type); this.showDropdown = false }
  }
}
</script>

<style scoped>
.trap-container { border: 2px solid #667eea; padding: 20px; margin-top: 15px; border-radius: 8px; background: #f7fafc; }
.modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.6); display: flex; align-items: center; justify-content: center; z-index: 1000; }
.modal-content { background: white; border-radius: 12px; max-width: 500px; width: 90%; box-shadow: 0 20px 60px rgba(0,0,0,0.3); }
.modal-header, .modal-footer { padding: 20px; display: flex; justify-content: space-between; align-items: center; }
.modal-header { border-bottom: 1px solid #e2e8f0; }
.modal-footer { border-top: 1px solid #e2e8f0; gap: 10px; }
.modal-body { padding: 20px; }
.close-btn { background: none; border: none; font-size: 28px; cursor: pointer; color: #718096; }
.dropdown { position: absolute; margin-top: 8px; background: white; border: 1px solid #e2e8f0; border-radius: 8px; padding: 8px; box-shadow: 0 10px 30px rgba(0,0,0,0.15); min-width: 180px; }
.dropdown-item { display: block; width: 100%; padding: 10px 16px; text-align: left; border: none; background: none; border-radius: 4px; cursor: pointer; }
.dropdown-item:hover { background: #edf2f7; }
.drawer-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 1000; }
.drawer { position: fixed; right: 0; top: 0; bottom: 0; width: 400px; max-width: 90vw; background: white; display: flex; flex-direction: column; }
.drawer-header, .drawer-footer { padding: 20px; }
.drawer-header { border-bottom: 1px solid #e2e8f0; display: flex; justify-content: space-between; }
.drawer-footer { border-top: 1px solid #e2e8f0; }
.drawer-body { flex: 1; overflow-y: auto; padding: 20px; }
.cart-item { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e2e8f0; }
.empty { text-align: center; color: #a0aec0; padding: 20px; }
.btn-block { width: 100%; }
.btn-sm { padding: 4px 8px; font-size: 12px; }
</style>
