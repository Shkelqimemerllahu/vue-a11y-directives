<template>
  <div class="getting-started-page">
    <h1 class="page-title">Getting Started</h1>
    <p class="page-subtitle">
      Learn how to install and use Vue A11y Directives in your Vue 3 application.
    </p>

    <div class="section">
      <h2 class="section-title">Installation</h2>
      <p>Install the package using your preferred package manager:</p>
      
      <CodeExample :code="installCode" />
    </div>

    <div class="section">
      <h2 class="section-title">Global Registration</h2>
      <p>Register all directives globally in your main.js file:</p>
      
      <CodeExample :code="globalCode" />
      
      <div class="info-box">
        <strong>💡 Tip:</strong> Global registration makes all directives available throughout your application without additional imports.
      </div>
    </div>

    <div class="section">
      <h2 class="section-title">Individual Registration</h2>
      <p>You can also register directives individually for better tree-shaking:</p>
      
      <CodeExample :code="individualCode" />
    </div>

    <div class="section">
      <h2 class="section-title">Your First Directive</h2>
      <p>Let's start with a simple example using v-a11y-focus:</p>
      
      <CodeExample 
        title="Auto-focus Input"
        :code="firstExampleCode"
      >
        <template #demo>
          <input 
            v-a11y-focus="200"
            type="text"
            placeholder="This input will be focused!"
            class="demo-input"
          />
        </template>
      </CodeExample>
    </div>

    <div class="section">
      <h2 class="section-title">Next Steps</h2>
      <div class="next-steps">
        <router-link to="/directives/focus" class="next-step-card">
          <div class="card-icon">🎯</div>
          <h3>Explore Directives</h3>
          <p>Learn about all available directives and their options</p>
        </router-link>
        
        <router-link to="/examples" class="next-step-card">
          <div class="card-icon">🌍</div>
          <h3>View Examples</h3>
          <p>See real-world usage examples and patterns</p>
        </router-link>
        
        <router-link to="/complex-scenarios" class="next-step-card">
          <div class="card-icon">🔥</div>
          <h3>Complex Scenarios</h3>
          <p>Advanced patterns for complex applications</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import CodeExample from '@/components/CodeExample.vue';

export default {
  name: 'GettingStarted',
  components: {
    CodeExample
  },
  data() {
    return {
      installCode: `# npm
npm install vue-a11y-directives

# yarn
yarn add vue-a11y-directives

# pnpm
pnpm add vue-a11y-directives`,

      globalCode: `// main.js
import { createApp } from 'vue';
import { installA11yDirectives } from 'vue-a11y-directives';
import App from './App.vue';

const app = createApp(App);

// Register all directives globally
installA11yDirectives(app);

app.mount('#app');`,

      individualCode: `// Component.vue
import { vA11yFocus, vA11yKeyboard } from 'vue-a11y-directives';

export default {
  directives: {
    'a11y-focus': vA11yFocus,
    'a11y-keyboard': vA11yKeyboard
  }
}`,

      firstExampleCode: `<template>
  <input 
    v-a11y-focus="200"
    type="text"
    placeholder="Auto-focused input"
  />
</template>`
    };
  }
};
</script>

<style scoped>
.info-box {
  background: #e6f7ff;
  border-left: 4px solid #1890ff;
  padding: 1rem 1.5rem;
  border-radius: 4px;
  margin-top: 1.5rem;
}

.demo-input {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid var(--border);
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.2s;
}

.demo-input:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.next-steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.next-step-card {
  background: white;
  border: 2px solid var(--border);
  border-radius: 8px;
  padding: 2rem;
  text-decoration: none;
  color: var(--text);
  transition: all 0.3s;
}

.next-step-card:hover {
  border-color: var(--primary);
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.15);
}

.card-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.next-step-card h3 {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  color: var(--text);
}

.next-step-card p {
  color: var(--text-light);
  margin: 0;
}
</style>
