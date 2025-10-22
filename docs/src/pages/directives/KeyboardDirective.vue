<template>
  <div class="page">
    <h1>Keyboard Directive</h1>
    <p class="lead">Add custom keyboard shortcuts and navigation to your components - improve accessibility and power-user workflows.</p>

    <section class="section">
      <h2>Overview</h2>
      <p>The <code>v-a11y-keyboard</code> directive enables easy keyboard event handling with support for key combinations (Ctrl, Alt, Shift, Meta), custom handlers, and accessibility-friendly patterns. Perfect for shortcuts, navigation, and interactive widgets.</p>
    </section>

    <section class="section">
      <h2>Basic Keyboard Handler</h2>
      <CodeExample title="Simple Key Handler" :code="examples.basic">
        <template #demo>
          <div class="demo-box">
            <div 
              v-a11y-keyboard="{ enter: handleEnter }"
              tabindex="0" 
              class="kbd-box"
            >
              <p>Click here, then press Enter</p>
              <p v-if="enterCount > 0" class="result">Enter pressed {{ enterCount }} times!</p>
            </div>
          </div>
        </template>
      </CodeExample>
    </section>

    <section class="section">
      <h2>Arrow Key Navigation</h2>
      <CodeExample title="Arrow Navigation" :code="examples.arrows">
        <template #demo>
          <div class="demo-box">
            <div 
              v-a11y-keyboard="arrowHandlers"
              tabindex="0"
              class="navigation-grid"
            >
              <div class="nav-indicator" :style="{ top: position.y + 'px', left: position.x + 'px' }">●</div>
              <p class="nav-instruction">Focus and use arrow keys to move the dot</p>
            </div>
          </div>
        </template>
      </CodeExample>
    </section>

    <section class="section">
      <h2>Keyboard Shortcuts (Modifiers)</h2>
      <CodeExample title="Ctrl/Cmd + Key Combinations" :code="examples.modifiers">
        <template #demo>
          <div class="demo-box">
            <div 
              v-a11y-keyboard="shortcutHandlers"
              tabindex="0"
              class="shortcut-area"
            >
              <h4>Try these shortcuts:</h4>
              <ul class="shortcut-list">
                <li><kbd>Ctrl/Cmd</kbd> + <kbd>S</kbd> - Save</li>
                <li><kbd>Ctrl/Cmd</kbd> + <kbd>C</kbd> - Copy</li>
                <li><kbd>Ctrl/Cmd</kbd> + <kbd>V</kbd> - Paste</li>
                <li><kbd>Escape</kbd> - Cancel</li>
              </ul>
              <p v-if="lastAction" class="action-result">{{ lastAction }}</p>
            </div>
          </div>
        </template>
      </CodeExample>
    </section>

    <section class="section">
      <h2>List Navigation (Real-World)</h2>
      <CodeExample title="Accessible List with Keyboard Nav" :code="examples.list">
        <template #demo>
          <div class="demo-box">
            <div 
              v-a11y-keyboard="listHandlers"
              class="interactive-list"
              tabindex="0"
            >
              <h4>Keyboard-Navigable List</h4>
              <p class="hint">Use up/down arrows, Enter to select, Delete to remove</p>
              <div 
                v-for="(item, index) in items"
                :key="index"
                :class="['list-item', { active: activeIndex === index }]"
                @click="activeIndex = index"
              >
                <span>{{ item.icon }} {{ item.name }}</span>
                <span v-if="activeIndex === index" class="selected-badge">Selected</span>
              </div>
              <p v-if="items.length === 0" class="empty">All items removed!</p>
            </div>
          </div>
        </template>
      </CodeExample>
    </section>

    <section class="section">
      <h2>Custom Key Handler</h2>
      <CodeExample title="Advanced Custom Logic" :code="examples.custom">
        <template #demo>
          <div class="demo-box">
            <div 
              v-a11y-keyboard="customHandler"
              tabindex="0"
              class="custom-area"
            >
              <h4>Type to filter (alphanumeric only):</h4>
              <p class="typed-text">{{ typedText || 'Start typing...' }}</p>
              <p class="hint">Press Backspace to clear, Escape to reset</p>
            </div>
          </div>
        </template>
      </CodeExample>
    </section>

    <section class="section">
      <h2>Game Controls</h2>
      <CodeExample title="WASD Movement" :code="examples.game">
        <template #demo>
          <div class="demo-box">
            <div 
              v-a11y-keyboard="gameHandlers"
              tabindex="0"
              class="game-area"
            >
              <div class="game-player" :style="{ top: player.y + 'px', left: player.x + 'px' }">
                Player
              </div>
              <p class="game-instruction">Focus and use WASD or Arrow keys to move</p>
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
            <tr><td><code>enter</code></td><td>Function</td><td>Handler for Enter key</td></tr>
            <tr><td><code>space</code></td><td>Function</td><td>Handler for Space key</td></tr>
            <tr><td><code>escape</code></td><td>Function</td><td>Handler for Escape key</td></tr>
            <tr><td><code>arrowUp/Down/Left/Right</code></td><td>Function</td><td>Arrow key handlers</td></tr>
            <tr><td><code>"ctrl+key"</code></td><td>Function</td><td>Modifier combinations (ctrl, alt, shift, meta)</td></tr>
            <tr><td><code>custom</code></td><td>Function</td><td>Receives KeyboardEvent for custom logic</td></tr>
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
            <strong>Provide visual feedback:</strong>
            <p>Always show users which element has focus and what shortcuts are available.</p>
          </div>
        </div>
        <div class="practice-item">
          <span class="practice-icon">✓</span>
          <div>
            <strong>Use standard shortcuts:</strong>
            <p>Follow platform conventions (Ctrl+S for save, Escape to close, etc.).</p>
          </div>
        </div>
        <div class="practice-item">
          <span class="practice-icon">✓</span>
          <div>
            <strong>Do not override browser shortcuts:</strong>
            <p>Avoid conflicting with critical browser functions.</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import CodeExample from '../../components/CodeExample.vue'
export default {
  name: 'KeyboardDirective',
  components: { CodeExample },
  data() {
    return {
      enterCount: 0,
      position: { x: 100, y: 50 },
      lastAction: '',
      activeIndex: 0,
      items: [
        { icon: '📄', name: 'Document 1' },
        { icon: '📁', name: 'Folder' },
        { icon: '🖼️', name: 'Image.png' },
        { icon: '🎵', name: 'Music.mp3' }
      ],
      typedText: '',
      player: { x: 100, y: 50 },
      examples: {
        basic: `<div v-a11y-keyboard="{ enter: handleEnter }" tabindex="0">
  Press Enter
</div>`,
        arrows: `<div v-a11y-keyboard="{ arrowUp, arrowDown, arrowLeft, arrowRight }">
  Use arrows to navigate
</div>`,
        modifiers: `<div v-a11y-keyboard="{ 
  'ctrl+s': save, 
  'ctrl+c': copy 
}">
  Keyboard shortcuts
</div>`,
        list: `<div v-a11y-keyboard="{ arrowUp, arrowDown, enter, delete }">
  <div v-for="item in items">{{ item }}</div>
</div>`,
        custom: `<div v-a11y-keyboard="{ custom: handleAllKeys }">
  Custom key handler
</div>`,
        game: `<div v-a11y-keyboard="{ w, a, s, d, arrowUp, arrowDown }">
  Game controls
</div>`
      }
    }
  },
  computed: {
    arrowHandlers() {
      return {
        arrowUp: () => { this.position.y = Math.max(0, this.position.y - 10) },
        arrowDown: () => { this.position.y = Math.min(80, this.position.y + 10) },
        arrowLeft: () => { this.position.x = Math.max(0, this.position.x - 10) },
        arrowRight: () => { this.position.x = Math.min(250, this.position.x + 10) }
      }
    },
    shortcutHandlers() {
      return {
        'ctrl+s': (e) => { e.preventDefault(); this.lastAction = 'Saved!' },
        'meta+s': (e) => { e.preventDefault(); this.lastAction = 'Saved!' },
        'ctrl+c': () => { this.lastAction = 'Copied!' },
        'meta+c': () => { this.lastAction = 'Copied!' },
        'ctrl+v': () => { this.lastAction = 'Pasted!' },
        'meta+v': () => { this.lastAction = 'Pasted!' },
        escape: () => { this.lastAction = 'Cancelled' }
      }
    },
    listHandlers() {
      return {
        arrowUp: (e) => { e.preventDefault(); this.activeIndex = Math.max(0, this.activeIndex - 1) },
        arrowDown: (e) => { e.preventDefault(); this.activeIndex = Math.min(this.items.length - 1, this.activeIndex + 1) },
        enter: () => { alert(`Selected: ${this.items[this.activeIndex].name}`) },
        delete: () => { if (this.items.length > 0) { this.items.splice(this.activeIndex, 1); this.activeIndex = Math.max(0, this.activeIndex - 1) } }
      }
    },
    customHandler() {
      return {
        custom: (e) => {
          if (/^[a-zA-Z0-9]$/.test(e.key)) {
            this.typedText += e.key
          } else if (e.key === 'Backspace') {
            this.typedText = this.typedText.slice(0, -1)
          } else if (e.key === 'Escape') {
            this.typedText = ''
          }
        }
      }
    },
    gameHandlers() {
      const move = (dx, dy) => {
        this.player.x = Math.max(0, Math.min(250, this.player.x + dx))
        this.player.y = Math.max(0, Math.min(150, this.player.y + dy))
      }
      return {
        w: () => move(0, -10), a: () => move(-10, 0), s: () => move(0, 10), d: () => move(10, 0),
        arrowUp: () => move(0, -10), arrowLeft: () => move(-10, 0), arrowDown: () => move(0, 10), arrowRight: () => move(10, 0)
      }
    }
  },
  methods: {
    handleEnter() { this.enterCount++ }
  }
}
</script>

<style scoped>
.kbd-box, .shortcut-area, .navigation-grid, .custom-area, .interactive-list, .game-area {
  border: 2px solid #667eea;
  border-radius: 8px;
  padding: 20px;
  outline: none;
  position: relative;
}
.kbd-box:focus, .shortcut-area:focus, .navigation-grid:focus, .custom-area:focus, .interactive-list:focus, .game-area:focus {
  border-color: #5a67d8;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.3);
}
.result, .action-result { margin-top: 15px; padding: 10px; background: #c3dafe; border-radius: 4px; color: #2c5282; font-weight: 500; }
.navigation-grid, .game-area { height: 200px; background: #edf2f7; }
.nav-indicator, .game-player { position: absolute; font-size: 24px; transition: all 0.1s; }
.nav-instruction, .game-instruction { position: absolute; bottom: 10px; left: 50%; transform: translateX(-50%); margin: 0; font-size: 12px; color: #718096; }
kbd { background: #edf2f7; border: 1px solid #cbd5e0; border-radius: 3px; padding: 2px 6px; font-size: 12px; font-family: monospace; }
.shortcut-list { list-style: none; padding: 0; }
.shortcut-list li { padding: 8px 0; }
.list-item { padding: 12px; border-bottom: 1px solid #e2e8f0; cursor: pointer; display: flex; justify-content: space-between; align-items: center; }
.list-item.active { background: #edf2f7; border-left: 3px solid #667eea; }
.list-item:hover { background: #f7fafc; }
.selected-badge { background: #667eea; color: white; padding: 2px 8px; border-radius: 4px; font-size: 11px; }
.typed-text { font-size: 24px; font-family: monospace; min-height: 40px; padding: 10px; background: #edf2f7; border-radius: 4px; }
.hint { font-size: 12px; color: #718096; margin-top: 10px; }
.empty { text-align: center; color: #a0aec0; padding: 20px; }
</style>
