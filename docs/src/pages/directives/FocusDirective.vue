<template>
  <div class="directive-page">
    <h1 class="page-title">v-a11y-focus</h1>
    <p class="page-subtitle">
      Automatically manage focus with optional delays and text selection for improved accessibility.
    </p>

    <div class="section">
      <h2 class="section-title">Overview</h2>
      <p>
        The <code>v-a11y-focus</code> directive helps manage focus automatically when elements are mounted or become visible.
        This is essential for accessibility, especially when opening modals, showing dynamic content, or navigating between views.
      </p>
    </div>

    <div class="section">
      <h2 class="section-title">Basic Usage</h2>
      
      <CodeExample 
        title="Simple Auto-focus"
        :code="examples.basic"
      >
        <template #demo>
          <button @click="showBasic = !showBasic" class="demo-btn">
            {{ showBasic ? 'Hide' : 'Show' }} Input
          </button>
          <input 
            v-if="showBasic"
            v-a11y-focus="200"
            type="text"
            placeholder="Auto-focused input"
            class="demo-input"
          />
        </template>
      </CodeExample>
    </div>

    <div class="section">
      <h2 class="section-title">With Text Selection</h2>
      <p>Automatically select text content when focusing:</p>
      
      <CodeExample 
        title="Focus with Selection"
        :code="examples.selection"
      >
        <template #demo>
          <button @click="showSelection = !showSelection" class="demo-btn">
            {{ showSelection ? 'Hide' : 'Show' }} Input
          </button>
          <input 
            v-if="showSelection"
            v-a11y-focus="{ delay: 100, select: true }"
            type="text"
            value="This text will be selected"
            class="demo-input"
          />
        </template>
      </CodeExample>
    </div>

    <div class="section">
      <h2 class="section-title">Custom Delay</h2>
      <p>Control when focus is applied with custom delays:</p>
      
      <CodeExample 
        title="Custom Delay (500ms)"
        :code="examples.delay"
      >
        <template #demo>
          <button @click="showDelay = !showDelay" class="demo-btn">
            {{ showDelay ? 'Hide' : 'Show' }} Input
          </button>
          <input 
            v-if="showDelay"
            v-a11y-focus="500"
            type="text"
            placeholder="Focused after 500ms"
            class="demo-input"
          />
        </template>
      </CodeExample>
    </div>

    <div class="section">
      <h2 class="section-title">API Reference</h2>
      
      <div class="api-table">
        <table>
          <thead>
            <tr>
              <th>Value Type</th>
              <th>Description</th>
              <th>Example</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>Number</code></td>
              <td>Delay in milliseconds before focusing</td>
              <td><code>v-a11y-focus="200"</code></td>
            </tr>
            <tr>
              <td><code>Object</code></td>
              <td>Configuration object with delay and select options</td>
              <td><code>v-a11y-focus="{ delay: 300, select: true }"</code></td>
            </tr>
            <tr>
              <td><code>Boolean</code></td>
              <td>Enable/disable focus (true = immediate focus)</td>
              <td><code>v-a11y-focus="true"</code></td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>Object Configuration</h3>
      <div class="api-table">
        <table>
          <thead>
            <tr>
              <th>Property</th>
              <th>Type</th>
              <th>Default</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>delay</code></td>
              <td><code>Number</code></td>
              <td><code>0</code></td>
              <td>Delay in milliseconds before focusing</td>
            </tr>
            <tr>
              <td><code>select</code></td>
              <td><code>Boolean</code></td>
              <td><code>false</code></td>
              <td>Automatically select text content</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="section">
      <h2 class="section-title">Best Practices</h2>
      <ul class="best-practices">
        <li>✅ Use delays (100-300ms) to avoid jarring focus changes</li>
        <li>✅ Focus the first interactive element in modals and dialogs</li>
        <li>✅ Use text selection for edit forms with pre-filled values</li>
        <li>❌ Don't auto-focus without user action (can be disorienting)</li>
        <li>❌ Avoid focusing non-interactive elements</li>
      </ul>
    </div>

    <div class="section">
      <h2 class="section-title">Real-World Example</h2>
      
      <CodeExample 
        title="Modal Dialog with Auto-focus"
        :code="examples.modal"
      >
        <template #demo>
          <button @click="showModal = true" class="demo-btn">
            Open Modal
          </button>
          
          <div v-if="showModal" class="modal-overlay" @click="showModal = false">
            <div class="modal" @click.stop>
              <h3>Edit Profile</h3>
              <div class="form-group">
                <label for="modal-name">Name:</label>
                <input 
                  id="modal-name"
                  v-a11y-focus="{ delay: 200, select: true }"
                  v-model="modalName"
                  type="text"
                  class="demo-input"
                />
              </div>
              <div class="form-group">
                <label for="modal-email">Email:</label>
                <input 
                  id="modal-email"
                  v-model="modalEmail"
                  type="email"
                  class="demo-input"
                />
              </div>
              <div class="modal-actions">
                <button @click="showModal = false" class="demo-btn">Cancel</button>
                <button @click="showModal = false" class="demo-btn demo-btn-primary">Save</button>
              </div>
            </div>
          </div>
        </template>
      </CodeExample>
    </div>
  </div>
</template>

<script>
import CodeExample from '@/components/CodeExample.vue';

export default {
  name: 'FocusDirective',
  components: {
    CodeExample
  },
  data() {
    return {
      showBasic: false,
      showSelection: false,
      showDelay: false,
      showModal: false,
      modalName: 'John Doe',
      modalEmail: 'john@example.com',
      examples: {
        basic: `<input 
  v-a11y-focus="200"
  type="text"
  placeholder="Auto-focused input"
/>`,
        selection: `<input 
  v-a11y-focus="{ delay: 100, select: true }"
  type="text"
  value="This text will be selected"
/>`,
        delay: `<input 
  v-a11y-focus="500"
  type="text"
  placeholder="Focused after 500ms"
/>`,
        modal: `<template>
  <div v-if="showModal" class="modal">
    <h3>Edit Profile</h3>
    
    <!-- First input gets auto-focus with text selection -->
    <input 
      v-a11y-focus="{ delay: 200, select: true }"
      v-model="name"
      type="text"
    />
    
    <input v-model="email" type="email" />
    
    <button @click="save">Save</button>
  </div>
</template>`
      }
    };
  }
};
</script>

<style scoped>
code {
  background: #f0f4ff;
  padding: 0.2rem 0.4rem;
  border-radius: 3px;
  font-size: 0.9em;
  color: var(--primary);
}

.demo-btn {
  padding: 0.75rem 1.5rem;
  background: white;
  border: 2px solid var(--primary);
  border-radius: 6px;
  color: var(--primary);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  margin-bottom: 1rem;
}

.demo-btn:hover {
  background: var(--primary);
  color: white;
}

.demo-btn-primary {
  background: var(--primary);
  color: white;
}

.demo-btn-primary:hover {
  background: var(--primary-dark);
}

.demo-input {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid var(--border);
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.2s;
  margin-top: 0.5rem;
}

.demo-input:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.api-table {
  overflow-x: auto;
  margin: 1.5rem 0;
}

table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border: 2px solid var(--border);
  border-radius: 8px;
}

thead {
  background: var(--bg-alt);
}

th, td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid var(--border);
}

th {
  font-weight: 600;
  color: var(--text);
}

td code {
  white-space: nowrap;
}

tbody tr:last-child td {
  border-bottom: none;
}

.best-practices {
  list-style: none;
  padding: 0;
}

.best-practices li {
  padding: 0.75rem 1rem;
  margin-bottom: 0.5rem;
  background: white;
  border-left: 4px solid var(--success);
  border-radius: 4px;
}

.best-practices li:contains("❌") {
  border-left-color: var(--error);
}

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  max-width: 500px;
  width: 90%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.modal h3 {
  margin-top: 0;
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.modal-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
}
</style>
