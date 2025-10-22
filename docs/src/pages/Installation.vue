<template>
  <div class="page">
    <h1>Installation</h1>
    <p class="lead">Multiple ways to install and use Vue A11y Directives in your project</p>

    <section class="section">
      <h2>Package Managers</h2>
      
      <h3>NPM</h3>
      <CodeExample title="Install via NPM" :code="'npm install vue-a11y-directives'" language="bash" />
      
      <h3>Yarn</h3>
      <CodeExample title="Install via Yarn" :code="'yarn add vue-a11y-directives'" language="bash" />
      
      <h3>PNPM</h3>
      <CodeExample title="Install via PNPM" :code="'pnpm add vue-a11y-directives'" language="bash" />
    </section>

    <section class="section">
      <h2>Global Registration (Recommended)</h2>
      <p>Register all directives globally in your main.js or main.ts file:</p>
      
      <CodeExample title="main.js" :code="examples.global" />
      
      <div class="info-box">
        <strong>💡 Benefits:</strong> All directives are available throughout your application without additional imports. Perfect for most applications.
      </div>
    </section>

    <section class="section">
      <h2>Individual Registration</h2>
      <p>For better tree-shaking, register only the directives you need:</p>
      
      <h3>Import Individual Directives</h3>
      <CodeExample title="Component.vue" :code="examples.individual" />
      
      <h3>Register Globally (Selective)</h3>
      <CodeExample title="main.js" :code="examples.selective" />
    </section>

    <section class="section">
      <h2>TypeScript Support</h2>
      <p>Vue A11y Directives includes TypeScript declarations. For better type inference:</p>
      
      <CodeExample title="env.d.ts or shims-vue.d.ts" :code="examples.typescript" />
    </section>

    <section class="section">
      <h2>Nuxt 3 Integration</h2>
      <p>To use with Nuxt 3, create a plugin:</p>
      
      <CodeExample title="plugins/a11y-directives.js" :code="examples.nuxt" />
    </section>

    <section class="section">
      <h2>Configuration Options</h2>
      <p>You can pass configuration options when installing:</p>
      
      <CodeExample title="With Options" :code="examples.config" />
      
      <div class="api-table">
        <table>
          <thead>
            <tr>
              <th>Option</th>
              <th>Type</th>
              <th>Default</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>prefix</code></td>
              <td>String</td>
              <td><code>'a11y'</code></td>
              <td>Prefix for directive names</td>
            </tr>
            <tr>
              <td><code>debug</code></td>
              <td>Boolean</td>
              <td><code>false</code></td>
              <td>Enable debug mode with console warnings</td>
            </tr>
            <tr>
              <td><code>directives</code></td>
              <td>Array</td>
              <td><code>null</code></td>
              <td>Array of specific directives to register</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="section">
      <h2>Requirements</h2>
      <ul>
        <li><strong>Vue 3.x:</strong> This package requires Vue 3.0 or higher</li>
        <li><strong>Modern Browsers:</strong> Supports all modern browsers with ES6+ support</li>
        <li><strong>Build Tools:</strong> Works with Vite, Webpack, Rollup, etc.</li>
      </ul>
    </section>

    <section class="section">
      <h2>Next Steps</h2>
      <p>Once installed, you can start using the directives in your components. Check out:</p>
      <ul>
        <li><router-link to="/getting-started">Getting Started Guide</router-link> - Quick introduction with examples</li>
        <li><router-link to="/directives/focus">Focus Directive</router-link> - Manage focus automatically</li>
        <li><router-link to="/directives/trap-focus">Trap Focus Directive</router-link> - Keep focus within containers</li>
        <li><router-link to="/examples">Examples</router-link> - Real-world usage examples</li>
      </ul>
    </section>
  </div>
</template>

<script>
import CodeExample from '../components/CodeExample.vue'

export default {
  name: 'Installation',
  components: {
    CodeExample
  },
  data() {
    return {
      examples: {
        global: `import { createApp } from 'vue'
import { installA11yDirectives } from 'vue-a11y-directives'
import App from './App.vue'

const app = createApp(App)

// Register all directives globally
installA11yDirectives(app)

app.mount('#app')`,
        individual: `<script>
import { vA11yFocus, vA11yTrapFocus } from 'vue-a11y-directives'

export default {
  directives: {
    'a11y-focus': vA11yFocus,
    'a11y-trap-focus': vA11yTrapFocus
  }
}
<\/script>

<template>
  <div>
    <input v-a11y-focus type="text" />
    <div v-a11y-trap-focus>
      <-rf “$HOME/Library/Application Focus trapped content -->
    </div>
  </div>
</template>`,
        selective: `import { createApp } from 'vue'
import { 
  vA11yFocus, 
  vA11yTrapFocus, 
  vA11yKeyboard 
} from 'vue-a11y-directives'
import App from './App.vue'

const app = createApp(App)

// Register only specific directives
app.directive('a11y-focus', vA11yFocus)
app.directive('a11y-trap-focus', vA11yTrapFocus)
app.directive('a11y-keyboard', vA11yKeyboard)

app.mount('#app')`,
        typescript: `declare module 'vue-a11y-directives' {
  import { Plugin } from 'vue'
  export const installA11yDirectives: Plugin
  export const vA11yFocus: any
  export const vA11yTrapFocus: any
  export const vA11yKeyboard: any
  export const vA11yAnnounce: any
  export const vA11yAria: any
  export const vA11ySkipLink: any
}`,
        nuxt: `export default defineNuxtPlugin((nuxtApp) => {
  const { installA11yDirectives } = await import('vue-a11y-directives')
  
  nuxtApp.vueApp.use(installA11yDirectives)
})`,
        config: `import { installA11yDirectives } from 'vue-a11y-directives'

app.use(installA11yDirectives, {
  prefix: 'a11y',
  debug: process.env.NODE_ENV === 'development',
  directives: ['focus', 'trap-focus', 'keyboard']
})`
      }
    }
  }
}
</script>
