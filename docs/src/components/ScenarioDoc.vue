<template>
  <section class="scenario-doc">
    <div class="scenario-header">
      <h2>{{ title }}</h2>
      <p class="scenario-description">{{ description }}</p>
    </div>

    <div class="scenario-features">
      <h3>Features</h3>
      <ul>
        <li v-for="(feature, index) in features" :key="index">{{ feature }}</li>
      </ul>
    </div>

    <div v-if="keyboardShortcuts && keyboardShortcuts.length" class="keyboard-shortcuts">
      <h3>⌨️ Keyboard Shortcuts</h3>
      <table class="shortcuts-table">
        <thead>
          <tr>
            <th>Keys</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(shortcut, index) in keyboardShortcuts" :key="index">
            <td>
              <kbd v-for="(key, ki) in shortcut.keys" :key="ki">{{ key }}</kbd>
            </td>
            <td>{{ shortcut.action }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="scenario-directives">
      <h3>Accessibility Directives Used</h3>
      <div class="directive-tags">
        <span v-for="(directive, index) in directives" :key="index" class="directive-tag">
          {{ directive }}
        </span>
      </div>
    </div>

    <div class="scenario-demo">
      <h3>Live Demo</h3>
      <div class="demo-container">
        <slot name="demo"></slot>
      </div>
    </div>

    <div class="scenario-code">
      <h3>📋 Implementation Code</h3>
      
      <div class="code-section">
        <h4>Template</h4>
        <div class="code-header">
          <button @click="copyCode('template')" class="copy-btn" :class="{ copied: copiedSection === 'template' }">
            {{ copiedSection === 'template' ? '✓ Copied!' : '📋 Copy' }}
          </button>
        </div>
        <pre><code ref="templateCode">{{ templateCode }}</code></pre>
      </div>

      <div v-if="scriptCode" class="code-section">
        <h4>Script (Simple Data Only)</h4>
        <div class="code-header">
          <button @click="copyCode('script')" class="copy-btn" :class="{ copied: copiedSection === 'script' }">
            {{ copiedSection === 'script' ? '✓ Copied!' : '📋 Copy' }}
          </button>
        </div>
        <pre><code ref="scriptCode">{{ scriptCode }}</code></pre>
      </div>
    </div>

    <div v-if="notes && notes.length" class="scenario-notes">
      <h3>💡 Implementation Notes</h3>
      <ul>
        <li v-for="(note, index) in notes" :key="index" v-html="note"></li>
      </ul>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ScenarioDoc',
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    features: {
      type: Array,
      required: true
    },
    keyboardShortcuts: {
      type: Array,
      default: () => []
    },
    directives: {
      type: Array,
      required: true
    },
    templateCode: {
      type: String,
      required: true
    },
    scriptCode: {
      type: String,
      default: ''
    },
    notes: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      copiedSection: null
    }
  },
  methods: {
    async copyCode(section) {
      const codeMap = {
        template: this.templateCode,
        script: this.scriptCode
      }
      
      try {
        await navigator.clipboard.writeText(codeMap[section])
        this.copiedSection = section
        setTimeout(() => {
          this.copiedSection = null
        }, 2000)
      } catch (err) {
        console.error('Failed to copy:', err)
      }
    }
  }
}
</script>

<style scoped>
.scenario-doc {
  margin-bottom: 4rem;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.scenario-header h2 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.scenario-description {
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 2rem;
}

.scenario-features,
.keyboard-shortcuts,
.scenario-directives,
.scenario-notes {
  margin-bottom: 2rem;
}

.scenario-features h3,
.keyboard-shortcuts h3,
.scenario-directives h3,
.scenario-demo h3,
.scenario-code h3,
.scenario-notes h3 {
  color: #2c3e50;
  margin-bottom: 1rem;
  font-size: 1.3rem;
}

.scenario-features ul,
.scenario-notes ul {
  list-style: none;
  padding: 0;
}

.scenario-features li,
.scenario-notes li {
  padding: 0.5rem 0;
  padding-left: 1.5rem;
  position: relative;
}

.scenario-features li:before {
  content: "✓";
  position: absolute;
  left: 0;
  color: #28a745;
  font-weight: bold;
}

.scenario-notes li:before {
  content: "•";
  position: absolute;
  left: 0;
  color: #007bff;
  font-weight: bold;
}

.shortcuts-table {
  width: 100%;
  border-collapse: collapse;
  background: #f8f9fa;
  border-radius: 4px;
  overflow: hidden;
}

.shortcuts-table th,
.shortcuts-table td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid #dee2e6;
}

.shortcuts-table th {
  background: #e9ecef;
  font-weight: 600;
  color: #2c3e50;
}

.shortcuts-table tbody tr:last-child td {
  border-bottom: none;
}

.shortcuts-table kbd {
  background: white;
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 2px 6px;
  margin: 0 2px;
  font-family: monospace;
  font-size: 0.9em;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.directive-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.directive-tag {
  background: #e3f2fd;
  color: #1976d2;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-family: monospace;
  font-size: 0.9rem;
  font-weight: 500;
}

.demo-container {
  border: 2px solid #e9ecef;
  border-radius: 8px;
  padding: 2rem;
  background: #f8f9fa;
  min-height: 200px;
}

.code-section {
  margin-bottom: 1.5rem;
}

.code-section h4 {
  color: #495057;
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
}

.code-header {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 0.5rem;
}

.copy-btn {
  background: #007bff;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s;
}

.copy-btn:hover {
  background: #0056b3;
}

.copy-btn.copied {
  background: #28a745;
}

pre {
  background: #282c34;
  color: #abb2bf;
  padding: 1.5rem;
  border-radius: 6px;
  overflow-x: auto;
  margin: 0;
}

code {
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.9rem;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .scenario-doc {
    padding: 1rem;
  }

  .demo-container {
    padding: 1rem;
  }

  pre {
    padding: 1rem;
    font-size: 0.85rem;
  }
}
</style>
