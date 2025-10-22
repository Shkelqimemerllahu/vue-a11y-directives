<template>
  <div class="page">
    <h1>Skip Link Directive</h1>
    <p class="lead">Enable keyboard users to skip repetitive content and navigate directly to main sections - essential for accessibility compliance.</p>

    <section class="section">
      <h2>Overview</h2>
      <p>The <code>v-a11y-skip-link</code> directive creates accessible skip navigation links that allow keyboard users to bypass repetitive content like headers, navigation menus, and sidebars. Required for WCAG 2.1 Level A compliance.</p>
    </section>

    <section class="section">
      <h2>Basic Skip to Main Content</h2>
      <CodeExample title="Simple Skip Link" :code="examples.basic">
        <template #demo>
          <div class="demo-box">
            <div class="demo-page">
              <a v-a11y-skip-link="'#demo-main-content'" href="#demo-main-content" class="skip-link">
                Skip to main content
              </a>
              
              <header class="demo-header">
                <nav>
                  <a href="#">Home</a>
                  <a href="#">About</a>
                  <a href="#">Services</a>
                  <a href="#">Contact</a>
                </nav>
              </header>
              
              <main id="demo-main-content" tabindex="-1" class="demo-main">
                <h2>Main Content</h2>
                <p>This is the main content area. The skip link above allows keyboard users to jump directly here, bypassing the navigation.</p>
                <button class="btn-primary">Action Button</button>
              </main>
            </div>
          </div>
        </template>
      </CodeExample>
    </section>

    <section class="section">
      <h2>Multiple Skip Links</h2>
      <CodeExample title="Skip to Different Sections" :code="examples.multiple">
        <template #demo>
          <div class="demo-box">
            <div class="demo-page-complex">
              <div class="skip-links-group">
                <a v-a11y-skip-link="'#content-area'" href="#content-area" class="skip-link">Skip to content</a>
                <a v-a11y-skip-link="'#sidebar-area'" href="#sidebar-area" class="skip-link">Skip to sidebar</a>
                <a v-a11y-skip-link="'#footer-area'" href="#footer-area" class="skip-link">Skip to footer</a>
              </div>
              
              <header class="demo-header-complex">
                <div class="logo">Logo</div>
                <nav class="nav-complex">
                  <a href="#">Products</a>
                  <a href="#">Solutions</a>
                  <a href="#">Resources</a>
                  <a href="#">Pricing</a>
                  <a href="#">Support</a>
                </nav>
              </header>
              
              <div class="demo-layout">
                <aside id="sidebar-area" tabindex="-1" class="demo-sidebar">
                  <h3>Sidebar</h3>
                  <ul>
                    <li>Filter 1</li>
                    <li>Filter 2</li>
                    <li>Filter 3</li>
                  </ul>
                </aside>
                
                <main id="content-area" tabindex="-1" class="demo-content">
                  <h2>Article Title</h2>
                  <p>Main content goes here. Users can skip directly to this section.</p>
                </main>
              </div>
              
              <footer id="footer-area" tabindex="-1" class="demo-footer">
                <p>Footer content • Privacy • Terms</p>
              </footer>
            </div>
          </div>
        </template>
      </CodeExample>
    </section>

    <section class="section">
      <h2>Skip Past Forms</h2>
      <CodeExample title="Skip Long Forms" :code="examples.form">
        <template #demo>
          <div class="demo-box">
            <div class="form-container">
              <a v-a11y-skip-link="'#form-submit'" href="#form-submit" class="skip-link">
                Skip to submit button
              </a>
              
              <form class="long-form">
                <h3>Registration Form</h3>
                
                <label>First Name: <input type="text" /></label>
                <label>Last Name: <input type="text" /></label>
                <label>Email: <input type="email" /></label>
                <label>Phone: <input type="tel" /></label>
                <label>Address: <input type="text" /></label>
                <label>City: <input type="text" /></label>
                <label>Zip: <input type="text" /></label>
                <label>Country: <select><option>USA</option></select></label>
                
                <div id="form-submit">
                  <button type="submit" class="btn-primary">Submit Registration</button>
                </div>
              </form>
            </div>
          </div>
        </template>
      </CodeExample>
    </section>

    <section class="section">
      <h2>Skip Repetitive Lists</h2>
      <CodeExample title="Skip Search Results Navigation" :code="examples.list">
        <template #demo>
          <div class="demo-box">
            <div class="search-results-page">
              <a v-a11y-skip-link="'#results'" href="#results" class="skip-link">
                Skip to results
              </a>
              
              <div class="filters-panel">
                <h3>Filters</h3>
                <label><input type="checkbox" /> Option 1</label>
                <label><input type="checkbox" /> Option 2</label>
                <label><input type="checkbox" /> Option 3</label>
                <label><input type="checkbox" /> Option 4</label>
                <label><input type="checkbox" /> Option 5</label>
                <button class="btn-secondary">Apply Filters</button>
              </div>
              
              <div id="results" tabindex="-1" class="results-area">
                <h3>Search Results ({{ searchResults.length }})</h3>
                <div v-for="result in searchResults" :key="result.id" class="result-item">
                  <h4>{{ result.title }}</h4>
                  <p>{{ result.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </template>
      </CodeExample>
    </section>

    <section class="section">
      <h2>Dynamic Skip Links</h2>
      <CodeExample title="Conditional Skip Links" :code="examples.dynamic">
        <template #demo>
          <div class="demo-box">
            <div class="dynamic-page">
              <a v-if="showBanner" v-a11y-skip-link="'#content'" href="#content" class="skip-link">
                Skip banner
              </a>
              
              <div v-if="showBanner" class="promo-banner">
                <strong>🎉 Special Offer!</strong> Get 50% off today only!
                <button @click="showBanner = false" class="close-banner">×</button>
              </div>
              
              <main id="content" tabindex="-1" class="content">
                <h2>Page Content</h2>
                <p>Main content area. {{ showBanner ? 'Banner is visible above' : 'No banner currently' }}</p>
                <button v-if="!showBanner" @click="showBanner = true" class="btn-secondary">
                  Show Banner Again
                </button>
              </main>
            </div>
          </div>
        </template>
      </CodeExample>
    </section>

    <section class="section">
      <h2>Complete Page Example</h2>
      <CodeExample title="Full Page Layout with Skip Links" :code="examples.complete">
        <template #demo>
          <div class="demo-box">
            <div class="complete-page">
              <div class="skip-links-container">
                <a v-a11y-skip-link="'#main'" href="#main" class="skip-link">Skip to main content</a>
                <a v-a11y-skip-link="'#nav'" href="#nav" class="skip-link">Skip to navigation</a>
                <a v-a11y-skip-link="'#search'" href="#search" class="skip-link">Skip to search</a>
              </div>
              
              <header class="page-header">
                <h1>Website Title</h1>
              </header>
              
              <nav id="nav" tabindex="-1" class="page-nav">
                <a href="#">Link 1</a>
                <a href="#">Link 2</a>
                <a href="#">Link 3</a>
              </nav>
              
              <div id="search" tabindex="-1" class="search-bar">
                <input type="search" placeholder="Search..." />
                <button>🔍</button>
              </div>
              
              <main id="main" tabindex="-1" class="page-main">
                <article>
                  <h2>Article Heading</h2>
                  <p>This is the main content that users want to access quickly.</p>
                  <button class="btn-primary">Read More</button>
                </article>
              </main>
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
            <tr><td><code>target</code></td><td>String</td><td>CSS selector or ID of target element</td></tr>
            <tr><td><code>visible</code></td><td>Boolean</td><td>Show skip link always or only on focus (default: focus only)</td></tr>
            <tr><td><code>text</code></td><td>String</td><td>Custom text for the skip link</td></tr>
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
            <strong>Place at the very top:</strong>
            <p>Skip links should be the first focusable element on the page.</p>
          </div>
        </div>
        <div class="practice-item">
          <span class="practice-icon">✓</span>
          <div>
            <strong>Make them visible on focus:</strong>
            <p>Skip links can be hidden but must become visible when focused.</p>
          </div>
        </div>
        <div class="practice-item">
          <span class="practice-icon">✓</span>
          <div>
            <strong>Use clear labels:</strong>
            <p>"Skip to main content" is clearer than just "Skip navigation".</p>
          </div>
        </div>
        <div class="practice-item">
          <span class="practice-icon">✓</span>
          <div>
            <strong>Add tabindex="-1" to targets:</strong>
            <p>Ensures focus moves to non-focusable elements like main or section tags.</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import CodeExample from '../../components/CodeExample.vue'
export default {
  name: 'SkipLinkDirective',
  components: { CodeExample },
  data() {
    return {
      showBanner: true,
      searchResults: [
        { id: 1, title: 'Result 1', description: 'Description for result 1' },
        { id: 2, title: 'Result 2', description: 'Description for result 2' },
        { id: 3, title: 'Result 3', description: 'Description for result 3' }
      ],
      examples: {
        basic: '<a v-a11y-skip-link="\'#main-content\'" href="#main-content" class="skip-link">\\n  Skip to main content\\n</a>\\n\\n<main id="main-content" tabindex="-1">\\n  <!-- Main content -->\\n</main>',
        multiple: '<div class="skip-links">\\n  <a v-a11y-skip-link="\'#content\'" href="#content">Skip to content</a>\\n  <a v-a11y-skip-link="\'#nav\'" href="#nav">Skip to navigation</a>\\n  <a v-a11y-skip-link="\'#footer\'" href="#footer">Skip to footer</a>\\n</div>',
        form: '<a v-a11y-skip-link="\'#submit\'" href="#submit">\\n  Skip to submit\\n</a>\\n<form>\\n  <!-- Many form fields -->\\n  <div id="submit">\\n    <button>Submit</button>\\n  </div>\\n</form>',
        list: '<a v-a11y-skip-link="\'#results\'" href="#results">\\n  Skip to results\\n</a>\\n<div class="filters">...</div>\\n<div id="results" tabindex="-1">\\n  <!-- Results -->\\n</div>',
        dynamic: '<a v-if="showSection" v-a11y-skip-link="\'#section\'">\\n  Skip section\\n</a>',
        complete: '<div class="skip-links">\\n  <a v-a11y-skip-link="\'#main\'">Skip to main</a>\\n  <a v-a11y-skip-link="\'#nav\'">Skip to nav</a>\\n</div>\\n<header>...</header>\\n<nav id="nav" tabindex="-1">...</nav>\\n<main id="main" tabindex="-1">...</main>'
      }
    }
  }
}
</script>

<style scoped>
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: #667eea;
  color: white;
  padding: 8px 16px;
  text-decoration: none;
  border-radius: 0 0 4px 0;
  z-index: 1000;
}
.skip-link:focus {
  top: 0;
}
.skip-links-group, .skip-links-container {
  position: relative;
}
.demo-page, .demo-page-complex, .form-container, .search-results-page, .dynamic-page, .complete-page {
  border: 2px dashed #cbd5e0;
  border-radius: 8px;
  padding: 20px;
  position: relative;
  background: white;
}
.demo-header, .demo-header-complex, .page-header {
  background: #4a5568;
  color: white;
  padding: 15px;
  border-radius: 4px;
  margin-bottom: 15px;
}
.demo-header nav, .nav-complex, .page-nav {
  display: flex;
  gap: 15px;
  margin-top: 10px;
}
.demo-header nav a, .nav-complex a, .page-nav a {
  color: white;
  text-decoration: none;
}
.demo-main, .demo-content, .content, .page-main {
  padding: 20px;
  background: #f7fafc;
  border-radius: 4px;
  min-height: 150px;
}
.demo-main:focus, .demo-content:focus, .content:focus, .page-main:focus, .results-area:focus {
  outline: 3px solid #667eea;
  outline-offset: 2px;
}
.demo-layout {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 15px;
  margin-bottom: 15px;
}
.demo-sidebar {
  background: #edf2f7;
  padding: 15px;
  border-radius: 4px;
}
.demo-footer, .page-header {
  background: #2d3748;
  color: white;
  padding: 15px;
  text-align: center;
  border-radius: 4px;
}
.long-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 15px;
}
.long-form label {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.long-form input, .long-form select {
  padding: 8px;
  border: 1px solid #cbd5e0;
  border-radius: 4px;
}
.filters-panel {
  background: #edf2f7;
  padding: 15px;
  border-radius: 4px;
  margin-bottom: 15px;
}
.filters-panel label {
  display: block;
  margin: 8px 0;
}
.results-area {
  padding: 15px;
  background: #f7fafc;
  border-radius: 4px;
}
.result-item {
  padding: 15px;
  border-bottom: 1px solid #e2e8f0;
}
.result-item h4 {
  margin: 0 0 8px 0;
  color: #2d3748;
}
.promo-banner {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 15px;
  border-radius: 4px;
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.close-banner {
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
}
.search-bar {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
  padding: 10px;
  background: #f7fafc;
  border-radius: 4px;
}
.search-bar input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #cbd5e0;
  border-radius: 4px;
}
</style>
