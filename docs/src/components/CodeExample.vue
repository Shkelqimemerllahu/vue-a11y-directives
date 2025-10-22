<template>
  <div class="code-example">
    <div class="example-header">
      <h4 v-if="title" class="example-title">{{ title }}</h4>
      <button @click="copyCode" class="copy-btn">
        {{ copied ? '✓ Copied!' : '📋 Copy' }}
      </button>
    </div>
    <div class="code-block">
      <pre><code>{{ code }}</code></pre>
    </div>
    <div v-if="$slots.demo" class="demo-block">
      <div class="demo-header">Live Demo</div>
      <div class="demo-content">
        <slot name="demo"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CodeExample',
  props: {
    title: String,
    code: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      copied: false
    };
  },
  methods: {
    async copyCode() {
      try {
        await navigator.clipboard.writeText(this.code);
        this.copied = true;
        setTimeout(() => {
          this.copied = false;
        }, 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  }
};
</script>

<style scoped>
.code-example {
  margin-bottom: 2rem;
  border: 2px solid var(--border);
  border-radius: 8px;
  overflow: hidden;
}

.example-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  background: var(--bg-alt);
  border-bottom: 1px solid var(--border);
}

.example-title {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  color: var(--text);
}

.copy-btn {
  padding: 0.5rem 1rem;
  background: white;
  border: 1px solid var(--border);
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.875rem;
  transition: all 0.2s;
}

.copy-btn:hover {
  border-color: var(--primary);
  color: var(--primary);
}

.code-block {
  background: var(--code-bg);
  padding: 1.5rem;
  overflow-x: auto;
}

.code-block pre {
  margin: 0;
}

.code-block code {
  color: #e2e8f0;
  font-size: 0.9rem;
  line-height: 1.6;
  white-space: pre;
}

.demo-block {
  border-top: 1px solid var(--border);
}

.demo-header {
  padding: 0.75rem 1.5rem;
  background: var(--bg-alt);
  font-weight: 600;
  font-size: 0.875rem;
  color: var(--text-light);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.demo-content {
  padding: 2rem 1.5rem;
  background: white;
}
</style>
