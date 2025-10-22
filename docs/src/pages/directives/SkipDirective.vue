<template>
  <div class="directive-page">
    <h1>v-a11y-skip</h1>
    <p class="subtitle">Skip elements from keyboard navigation and screen readers</p>

    <section class="usage-section">
      <h2>Basic Usage</h2>
      
      <div class="example-block">
        <h3>1. Always Skip (No Value)</h3>
        <div class="code-example">
          <pre v-pre><code>&lt;!-- Always skip this element --&gt;
&lt;div v-a11y-skip&gt;
  This content is hidden from keyboard and screen readers
&lt;/div&gt;</code></pre>
        </div>
        <p class="explanation">✅ Element is always removed from tab order and hidden from screen readers</p>
      </div>

      <div class="example-block">
        <h3>2. Skip with Boolean</h3>
        <div class="code-example">
          <pre v-pre><code>&lt;div v-a11y-skip="true"&gt;Hidden&lt;/div&gt;
&lt;div v-a11y-skip="false"&gt;Visible&lt;/div&gt;</code></pre>
        </div>
        <p class="explanation">✅ Pass true/false to control skip behavior dynamically</p>
      </div>

      <div class="example-block">
        <h3>3. Skip Based on Item Property</h3>
        <div class="code-example">
          <pre v-pre><code>&lt;button 
  v-for="item in items" 
  :key="item.id"
  v-a11y-skip="item.disabled"
&gt;
  Click me
&lt;/button&gt;</code></pre>
        </div>
        <p class="explanation">✅ When <code>item.disabled</code> is true, button is skipped from Tab navigation</p>
      </div>

      <div class="example-block">
        <h3>4. Skip Based on Condition</h3>
        <div class="code-example">
          <pre v-pre><code>&lt;div 
  v-for="item in items" 
  :key="item.id"
  v-a11y-skip="item.id === selectedId"
&gt;
  Content
&lt;/div&gt;</code></pre>
        </div>
        <p class="explanation">✅ Currently selected item is skipped - users can Tab only through unselected items</p>
      </div>
    </section>

    <section class="modifiers-section">
      <h2>Modifiers (Optional)</h2>
      
      <div class="modifier-detailed">
        <h3>🎨 .visual Modifier</h3>
        <p class="modifier-description">
          Adds visual feedback when element is skipped. Makes it obvious to sighted users that the element is disabled/inactive.
        </p>
        <div class="code-example">
          <pre v-pre><code>&lt;div v-a11y-skip.visual="item.inactive"&gt;
  This will be grayed out when inactive
&lt;/div&gt;</code></pre>
        </div>
        <div class="modifier-effects">
          <p><strong>What it does:</strong></p>
          <ul>
            <li>Sets <code>opacity: 0.5</code> - makes element semi-transparent</li>
            <li>Sets <code>filter: grayscale(100%)</code> - removes all colors</li>
            <li>Removes from Tab order (<code>tabindex="-1"</code>)</li>
            <li>Hides from screen readers (<code>aria-hidden="true"</code>)</li>
          </ul>
        </div>
      </div>

      <div class="modifier-detailed">
        <h3>🚫 .noInteraction Modifier</h3>
        <p class="modifier-description">
          Completely prevents any mouse/touch interactions. User cannot click, hover, or interact with the element at all.
        </p>
        <div class="code-example">
          <pre v-pre><code>&lt;button v-a11y-skip.noInteraction="item.disabled"&gt;
  Cannot click when disabled
&lt;/button&gt;</code></pre>
        </div>
        <div class="modifier-effects">
          <p><strong>What it does:</strong></p>
          <ul>
            <li>Sets <code>pointer-events: none</code> - blocks ALL pointer interactions</li>
            <li>No click, no hover, no right-click, no drag</li>
            <li>Removes from Tab order (<code>tabindex="-1"</code>)</li>
            <li>Hides from screen readers (<code>aria-hidden="true"</code>)</li>
          </ul>
        </div>
      </div>

      <div class="modifier-detailed">
        <h3>🎯 Combine Modifiers</h3>
        <div class="code-example">
          <pre v-pre><code>&lt;!-- Both visual indication AND block interactions --&gt;
&lt;button v-a11y-skip.visual.noInteraction="item.disabled"&gt;
  Fully disabled button
&lt;/button&gt;</code></pre>
        </div>
        <p class="explanation">✅ Use both modifiers together for complete "disabled" behavior</p>
      </div>
    </section>

    <section class="demo-section">
      <h2>Live Demo</h2>
      
      <div class="demo-controls">
        <label>
          <input type="checkbox" v-model="showDisabled" />
          Show disabled items visually
        </label>
      </div>

      <h3>1. Button List with Skip (Disabled Items)</h3>
      <div class="demo-buttons">
        <button 
          v-for="item in demoItems" 
          :key="item.id"
          v-a11y-skip="item.disabled"
          :class="{ 'item-disabled': item.disabled && showDisabled }"
          class="demo-button"
          @click="handleButtonClick(item)"
        >
          {{ item.name }}
        </button>
      </div>

      <div class="demo-status">
        <p><strong>Status:</strong> {{ buttonStatus }}</p>
        <p><strong>Instructions:</strong> Press Tab repeatedly. You should only Tab through Item 1, 3, and 5. Items 2 and 4 are disabled and will be skipped!</p>
      </div>

      <h3>2. Cards with Conditional Skip (Selected Item Skipped)</h3>
      <div class="demo-cards">
        <div 
          v-for="card in demoCards" 
          :key="card.id"
          v-a11y-skip="card.id === selectedCardId"
          class="demo-card"
          :class="{ 'card-selected': card.id === selectedCardId }"
          tabindex="0"
          @click="selectCard(card.id)"
        >
          <h4>{{ card.title }}</h4>
          <p>{{ card.description }}</p>
          <span v-if="card.id === selectedCardId" class="selected-badge">✓ Selected (Skipped from Tab)</span>
        </div>
      </div>

      <div class="demo-status">
        <p><strong>Selected Card:</strong> {{ selectedCardId ? `Card ${selectedCardId}` : 'None' }}</p>
        <p><strong>Instructions:</strong> Click a card to select it. Once selected, that card is SKIPPED from Tab navigation. Try using Tab - you'll only Tab through unselected cards!</p>
      </div>

      <h3>3. With .visual Modifier (Inactive Items Grayed Out + Skipped)</h3>
      <div class="demo-visual">
        <div 
          v-for="item in visualItems" 
          :key="item.id"
          v-a11y-skip.visual="item.inactive"
          class="visual-item"
          tabindex="0"
        >
          <span>{{ item.name }}</span>
          <button @click="toggleItemActive(item)" class="toggle-btn">
            {{ item.inactive ? 'Activate' : 'Deactivate' }}
          </button>
        </div>
      </div>

      <div class="demo-status">
        <p><strong>Active Items:</strong> {{ activeItemsCount }} / {{ visualItems.length }}</p>
        <p><strong>Instructions:</strong> Click "Deactivate" buttons. Inactive items become grayed out (opacity + grayscale) AND are skipped from Tab navigation. Try using Tab - you can only Tab through active (colored) items!</p>
        <p class="warning-note">⚠️ Notice: Inactive items are NOT clickable and NOT reachable by Tab!</p>
      </div>
    </section>

    <section class="features-section">
      <h2>What It Does</h2>
      <ul class="features-list">
        <li>✅ Sets <code>tabindex="-1"</code> to remove from tab order</li>
        <li>✅ Sets <code>aria-hidden="true"</code> to hide from screen readers</li>
        <li>✅ Adds <code>data-a11y-skip="true"</code> attribute for CSS targeting</li>
        <li>✅ Can prevent pointer interactions with <code>.noInteraction</code> modifier</li>
        <li>✅ Can add visual indication with <code>.visual</code> modifier</li>
        <li>✅ Dynamically updates when condition changes</li>
        <li>✅ Restores original attributes when un-skipped</li>
      </ul>
    </section>

    <section class="use-cases-section">
      <h2>Common Use Cases</h2>
      <div class="use-cases-grid">
        <div class="use-case">
          <h3>🚫 Disabled Items</h3>
          <p>Skip disabled buttons or form fields from navigation</p>
          <code>v-a11y-skip="item.disabled"</code>
        </div>
        <div class="use-case">
          <h3>✔️ Selected Items</h3>
          <p>Skip currently selected items to focus on available options</p>
          <code>v-a11y-skip="item.id === selectedId"</code>
        </div>
        <div class="use-case">
          <h3>👁️ Hidden Content</h3>
          <p>Skip collapsed accordion content or hidden panels</p>
          <code>v-a11y-skip="!section.isOpen"</code>
        </div>
        <div class="use-case">
          <h3>🔒 Locked Features</h3>
          <p>Skip premium features that require upgrade</p>
          <code>v-a11y-skip="!user.isPremium"</code>
        </div>
        <div class="use-case">
          <h3>📋 Empty States</h3>
          <p>Skip empty list items or placeholder content</p>
          <code>v-a11y-skip="items.length === 0"</code>
        </div>
        <div class="use-case">
          <h3>⏳ Loading States</h3>
          <p>Skip content while loading</p>
          <code>v-a11y-skip="isLoading"</code>
        </div>
      </div>
    </section>

    <section class="api-section">
      <h2>API Reference</h2>
      <table class="api-table">
        <thead>
          <tr>
            <th>Value</th>
            <th>Type</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>undefined</code></td>
            <td>-</td>
            <td>Always skip (default behavior)</td>
          </tr>
          <tr>
            <td><code>true</code></td>
            <td>Boolean</td>
            <td>Skip element</td>
          </tr>
          <tr>
            <td><code>false</code></td>
            <td>Boolean</td>
            <td>Don't skip element</td>
          </tr>
          <tr>
            <td><code>expression</code></td>
            <td>Any</td>
            <td>Skip when truthy, don't skip when falsy</td>
          </tr>
        </tbody>
      </table>
    </section>

    <section class="css-section">
      <h2>CSS Targeting</h2>
      <p>You can style skipped elements using the <code>data-a11y-skip</code> attribute:</p>
      <div class="code-example">
        <pre><code>/* Style all skipped elements */
[data-a11y-skip="true"] {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Prevent hover effects on skipped elements */
[data-a11y-skip="true"]:hover {
  transform: none;
}</code></pre>
      </div>
    </section>
  </div>
</template>

<script>
import { skipDirective } from '../../../../src/index.js'

export default {
  name: 'SkipDirective',
  directives: {
    'a11y-skip': skipDirective
  },
  data() {
    return {
      showDisabled: false,
      buttonStatus: 'No button clicked yet',
      demoItems: [
        { id: 1, name: 'Item 1', disabled: false },
        { id: 2, name: 'Item 2', disabled: true },
        { id: 3, name: 'Item 3', disabled: false },
        { id: 4, name: 'Item 4', disabled: true },
        { id: 5, name: 'Item 5', disabled: false }
      ],
      selectedCardId: null,
      demoCards: [
        { id: 1, title: 'Card 1', description: 'Click to select' },
        { id: 2, title: 'Card 2', description: 'Click to select' },
        { id: 3, title: 'Card 3', description: 'Click to select' }
      ],
      visualItems: [
        { id: 1, name: 'Active Item 1', inactive: false },
        { id: 2, name: 'Inactive Item 2', inactive: true },
        { id: 3, name: 'Active Item 3', inactive: false }
      ]
    }
  },
  computed: {
    activeItemsCount() {
      return this.visualItems.filter(item => !item.inactive).length
    }
  },
  methods: {
    selectCard(id) {
      this.selectedCardId = this.selectedCardId === id ? null : id
    },
    handleButtonClick(item) {
      if (!item.disabled) {
        this.buttonStatus = `Clicked: ${item.name} (Active)`
      }
    },
    toggleItemActive(item) {
      item.inactive = !item.inactive
    }
  }
}
</script>

<style scoped>
.directive-page {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  color: #2c3e50;
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.subtitle {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 2rem;
}

section {
  margin-bottom: 3rem;
}

h2 {
  color: #2c3e50;
  font-size: 1.8rem;
  margin-bottom: 1rem;
  border-bottom: 2px solid #42b983;
  padding-bottom: 0.5rem;
}

h3 {
  color: #2c3e50;
  font-size: 1.3rem;
  margin-bottom: 0.75rem;
}

.code-example {
  background: #f8f9fa;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1.5rem;
  overflow-x: auto;
}

.code-example pre {
  margin: 0;
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
  line-height: 1.6;
}

code {
  background: #f8f9fa;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  font-size: 0.9em;
}

.example-block {
  background: white;
  border: 2px solid #e3f2fd;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.example-block h3 {
  color: #1976d2;
  margin-bottom: 1rem;
  font-size: 1.2rem;
}

.explanation {
  background: #e8f5e9;
  border-left: 4px solid #4caf50;
  padding: 1rem;
  margin-top: 1rem;
  font-size: 1rem;
}

.modifier-detailed {
  background: white;
  border: 2px solid #fff3cd;
  border-radius: 8px;
  padding: 2rem;
  margin-bottom: 2rem;
}

.modifier-detailed h3 {
  color: #ff9800;
  margin-bottom: 1rem;
  font-size: 1.4rem;
}

.modifier-description {
  font-size: 1.1rem;
  color: #555;
  margin-bottom: 1rem;
  line-height: 1.6;
}

.modifier-effects {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 1.5rem;
  margin-top: 1rem;
}

.modifier-effects ul {
  margin-top: 0.5rem;
  padding-left: 1.5rem;
}

.modifier-effects li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

.demo-section {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 2rem;
}

.demo-controls {
  margin-bottom: 1.5rem;
}

.demo-controls label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.demo-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
}

.demo-button {
  padding: 0.75rem 1.5rem;
  border: 2px solid #42b983;
  background: white;
  color: #2c3e50;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s;
}

.demo-button:hover {
  background: #42b983;
  color: white;
  transform: translateY(-2px);
}

.demo-button:focus {
  outline: 3px solid #42b983;
  outline-offset: 2px;
}

.item-disabled {
  opacity: 0.5;
  border-color: #ccc;
}

.demo-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
}

.demo-card {
  background: white;
  border: 2px solid #ddd;
  border-radius: 8px;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.3s;
}

.demo-card:hover {
  border-color: #42b983;
  transform: translateY(-2px);
}

.demo-card:focus {
  outline: 3px solid #42b983;
  outline-offset: 2px;
}

.card-selected {
  border-color: #42b983;
  background: #e8f5e9;
}

.selected-badge {
  display: inline-block;
  background: #42b983;
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.85rem;
  margin-top: 0.5rem;
}

.demo-visual {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1rem;
}

.visual-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  border: 2px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  transition: all 0.3s;
}

.visual-item:focus {
  outline: 3px solid #42b983;
  outline-offset: 2px;
}

.toggle-btn {
  padding: 0.5rem 1rem;
  border: 1px solid #42b983;
  background: white;
  color: #42b983;
  border-radius: 4px;
  cursor: pointer;
}

.toggle-btn:hover {
  background: #42b983;
  color: white;
}

.demo-hint {
  background: #fff3cd;
  border: 1px solid #ffc107;
  border-radius: 4px;
  padding: 1rem;
  margin-top: 1rem;
}

.demo-status {
  background: #e3f2fd;
  border: 2px solid #2196f3;
  border-radius: 8px;
  padding: 1.5rem;
  margin-top: 1rem;
}

.demo-status p {
  margin: 0.5rem 0;
  line-height: 1.6;
}

.demo-status strong {
  color: #1976d2;
}

.warning-note {
  background: #fff3cd;
  border-left: 4px solid #ff9800;
  padding: 0.75rem;
  margin-top: 1rem;
  font-weight: bold;
  color: #f57c00;
}

.features-list {
  list-style: none;
  padding: 0;
}

.features-list li {
  padding: 0.5rem 0;
  font-size: 1.1rem;
}

.use-cases-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.use-case {
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1.5rem;
}

.use-case h3 {
  color: #42b983;
  margin-bottom: 0.5rem;
}

.api-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
}

.api-table th,
.api-table td {
  padding: 0.75rem;
  text-align: left;
  border: 1px solid #ddd;
}

.api-table th {
  background: #f8f9fa;
  font-weight: bold;
}

.css-section {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 2rem;
}
</style>
