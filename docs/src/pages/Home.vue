<template>
  <div class="home-page">
    <div class="hero">
      <h1 class="hero-title">
        <span class="hero-icon">♿</span>
        Vue A11y Directives
      </h1>
      <p class="hero-subtitle">
        Build accessible Vue 3 applications with ease. A comprehensive set of directives for WCAG 2.1 compliance.
      </p>
      <div class="hero-actions">
        <router-link to="/getting-started" class="btn btn-primary btn-lg">
          Get Started →
        </router-link>
        <a href="https://github.com/yourusername/vue-a11y-directives" class="btn btn-secondary btn-lg" target="_blank">
          View on GitHub
        </a>
      </div>
    </div>

    <div class="features">
      <div class="feature-card">
        <div class="feature-icon">🎯</div>
        <h3>Focus Management</h3>
        <p>Automatic focus handling, focus trapping for modals, and accessible navigation patterns.</p>
      </div>

      <div class="feature-card">
        <div class="feature-icon">⌨️</div>
        <h3>Keyboard Support</h3>
        <p>Full keyboard navigation with Enter, Escape, Arrow keys, and custom key handlers.</p>
      </div>

      <div class="feature-card">
        <div class="feature-icon">♿</div>
        <h3>ARIA Attributes</h3>
        <p>Easy ARIA attribute management for dynamic states, roles, and properties.</p>
      </div>

      <div class="feature-card">
        <div class="feature-icon">📢</div>
        <h3>Screen Readers</h3>
        <p>Polite and assertive announcements for screen reader users with live regions.</p>
      </div>

      <div class="feature-card">
        <div class="feature-icon">⏭️</div>
        <h3>Skip Links</h3>
        <p>Skip navigation links for keyboard users to jump to main content quickly.</p>
      </div>

      <div class="feature-card">
        <div class="feature-icon">�</div>
        <h3>Date Pickers</h3>
        <p>Auto-focus date picker calendars for immediate keyboard navigation with arrow keys.</p>
      </div>

      <div class="feature-card">
        <div class="feature-icon">�📦</div>
        <h3>Zero Dependencies</h3>
        <p>Lightweight, tree-shakeable, and built specifically for Vue 3.</p>
      </div>
    </div>

    <div class="quick-example">
      <h2 class="section-title">Quick Example</h2>
      <div class="code-demo">
        <pre><code>{{ exampleCode }}</code></pre>
      </div>
    </div>

    <div class="stats">
      <div class="stat">
        <div class="stat-number">8</div>
        <div class="stat-label">Directives</div>
      </div>
      <div class="stat">
        <div class="stat-number">Zero</div>
        <div class="stat-label">Dependencies</div>
      </div>
      <div class="stat">
        <div class="stat-number">WCAG 2.1</div>
        <div class="stat-label">Compliant</div>
      </div>
      <div class="stat">
        <div class="stat-number">Vue 3</div>
        <div class="stat-label">Optimized</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      exampleCode: `// Install directives
import { installA11yDirectives } from 'vue-a11y-directives';
installA11yDirectives(app);

// Use in your components
<template>
  <!-- Auto-focus -->
  <input v-a11y-focus="200" />
  
  <!-- Keyboard navigation -->
  <div v-a11y-keyboard="{ enter: true }" @click="handleClick">
    Press Enter
  </div>
  
  <!-- Screen reader announcements -->
  <button v-a11y-announce="'Item added'">Add</button>
  
  <!-- ARIA attributes -->
  <button v-a11y-aria="{ expanded: isOpen }">Menu</button>
</template>`
    };
  }
};
</script>

<style scoped>
.home-page {
  padding: 2rem 0;
}

.hero {
  text-align: center;
  padding: 4rem 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  color: white;
  margin-bottom: 4rem;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.hero-icon {
  font-size: 4rem;
}

.hero-subtitle {
  font-size: 1.5rem;
  margin-bottom: 2rem;
  opacity: 0.95;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  display: inline-block;
  padding: 0.75rem 2rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.2s;
  border: 2px solid transparent;
}

.btn-lg {
  padding: 1rem 2.5rem;
  font-size: 1.125rem;
}

.btn-primary {
  background: white;
  color: var(--primary);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

.btn-secondary {
  background: transparent;
  color: white;
  border-color: white;
}

.btn-secondary:hover {
  background: white;
  color: var(--primary);
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
}

.feature-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  border: 2px solid var(--border);
  transition: all 0.3s;
}

.feature-card:hover {
  border-color: var(--primary);
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.15);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.feature-card h3 {
  font-size: 1.25rem;
  margin-bottom: 0.75rem;
  color: var(--text);
}

.feature-card p {
  color: var(--text-light);
  line-height: 1.6;
}

.quick-example {
  margin-bottom: 4rem;
}

.code-demo {
  background: var(--code-bg);
  border-radius: 8px;
  padding: 1.5rem;
  overflow-x: auto;
}

.code-demo pre {
  margin: 0;
}

.code-demo code {
  color: #e2e8f0;
  font-size: 0.9rem;
  line-height: 1.6;
  white-space: pre;
}

.stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  padding: 3rem;
  background: var(--bg-alt);
  border-radius: 12px;
}

.stat {
  text-align: center;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--primary);
  margin-bottom: 0.5rem;
}

.stat-label {
  color: var(--text-light);
  font-weight: 500;
}
</style>
