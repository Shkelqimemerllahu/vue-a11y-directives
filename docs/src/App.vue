<template>
  <div class="app">
    <!-- Header -->
    <header class="header">
      <div class="container">
        <div class="header-content">
          <router-link to="/" class="logo">
            <span class="logo-icon">♿</span>
            <span class="logo-text">Vue A11y Directives</span>
          </router-link>
          
          <nav class="nav">
            <router-link to="/getting-started" class="nav-link">Getting Started</router-link>
            <router-link to="/directives/focus" class="nav-link">Directives</router-link>
            <router-link to="/examples" class="nav-link">Examples</router-link>
            <a href="https://github.com/shkelqimemerllahu/vue-a11y-directives" class="nav-link" target="_blank">
              GitHub
            </a>
          </nav>
        </div>
      </div>
    </header>

    <!-- Main Layout -->
    <div class="main-layout">
      <!-- Sidebar -->
      <aside class="sidebar">
        <nav class="sidebar-nav">
          <div class="nav-section">
            <h3 class="nav-section-title">Introduction</h3>
            <router-link to="/" class="nav-item">Overview</router-link>
            <router-link to="/getting-started" class="nav-item">Getting Started</router-link>
            <router-link to="/installation" class="nav-item">Installation</router-link>
          </div>

          <div class="nav-section">
            <h3 class="nav-section-title">Directives</h3>
            <router-link to="/directives/focus" class="nav-item">v-a11y-focus</router-link>
            <router-link to="/directives/trap-focus" class="nav-item">v-a11y-trap-focus</router-link>
            <router-link to="/directives/keyboard" class="nav-item">v-a11y-keyboard</router-link>
            <router-link to="/directives/announce" class="nav-item">v-a11y-announce</router-link>
            <router-link to="/directives/aria" class="nav-item">v-a11y-aria</router-link>
            <router-link to="/directives/skip-link" class="nav-item">v-a11y-skip-link</router-link>
            <router-link to="/directives/skip" class="nav-item">v-a11y-skip</router-link>
            <router-link to="/directives/date-picker" class="nav-item">v-a11y-date-picker</router-link>
          </div>

          <div class="nav-section">
            <h3 class="nav-section-title">Advanced</h3>
            <router-link to="/examples" class="nav-item">Real-World Examples</router-link>
            <router-link to="/complex-scenarios" class="nav-item">Complex Scenarios</router-link>
            <router-link to="/scenarios-documentation" class="nav-item">📚 Scenarios Documentation</router-link>
          </div>
        </nav>
      </aside>

      <!-- Content -->
      <main class="content">
        <router-view />
      </main>
    </div>

    <!-- Footer -->
    <footer class="footer">
      <div class="container">
        <p>Made with ❤️ for the Vue.js community • MIT License</p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App'
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  --primary: #667eea;
  --primary-dark: #5568d3;
  --secondary: #764ba2;
  --text: #2d3748;
  --text-light: #718096;
  --bg: #ffffff;
  --bg-alt: #f7fafc;
  --border: #e2e8f0;
  --code-bg: #2d3748;
  --success: #48bb78;
  --warning: #ed8936;
  --error: #f56565;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  color: var(--text);
  background: var(--bg);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

code {
  font-family: 'Fira Code', monospace;
}

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Header */
.header {
  background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
  color: white;
  padding: 1rem 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  color: white;
  font-weight: 700;
  font-size: 1.25rem;
  transition: opacity 0.2s;
}

.logo:hover {
  opacity: 0.9;
}

.logo-icon {
  font-size: 2rem;
}

.nav {
  display: flex;
  gap: 2rem;
}

.nav-link {
  color: white;
  text-decoration: none;
  font-weight: 500;
  transition: opacity 0.2s;
  padding: 0.5rem 0;
}

.nav-link:hover {
  opacity: 0.8;
}

/* Main Layout */
.main-layout {
  flex: 1;
  display: flex;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
}

/* Sidebar */
.sidebar {
  width: 280px;
  background: var(--bg-alt);
  border-right: 1px solid var(--border);
  padding: 2rem 0;
  position: sticky;
  top: 70px;
  height: calc(100vh - 70px);
  overflow-y: auto;
}

.sidebar-nav {
  padding: 0 1.5rem;
}

.nav-section {
  margin-bottom: 2rem;
}

.nav-section-title {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--text-light);
  letter-spacing: 0.05em;
  margin-bottom: 0.75rem;
}

.nav-item {
  display: block;
  padding: 0.5rem 0.75rem;
  color: var(--text);
  text-decoration: none;
  border-radius: 6px;
  margin-bottom: 0.25rem;
  transition: all 0.2s;
  font-size: 0.95rem;
}

.nav-item:hover {
  background: white;
  color: var(--primary);
}

.nav-item.router-link-active {
  background: var(--primary);
  color: white;
  font-weight: 600;
}

/* Content */
.content {
  flex: 1;
  padding: 3rem;
  max-width: 900px;
}

/* Footer */
.footer {
  background: var(--bg-alt);
  border-top: 1px solid var(--border);
  padding: 2rem 0;
  text-align: center;
  color: var(--text-light);
  font-size: 0.875rem;
}

/* Responsive */
@media (max-width: 768px) {
  .sidebar {
    display: none;
  }

  .content {
    padding: 2rem 1rem;
  }

  .nav {
    display: none;
  }
}

/* Utility Classes */
.page-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 1rem;
}

.page-subtitle {
  font-size: 1.25rem;
  color: var(--text-light);
  margin-bottom: 2rem;
}

.section {
  margin-bottom: 3rem;
}

.section-title {
  font-size: 1.75rem;
  font-weight: 600;
  color: var(--text);
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid var(--border);
}
</style>
