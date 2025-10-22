# Vue A11y Directives

A comprehensive collection of Vue 3 directives for building accessible web applications with WCAG compliance.

## 🚀 Features

- **8 Powerful Directives** for complete accessibility control
- **Zero Dependencies** - Lightweight and performant
- **TypeScript Support** - Full type definitions included
- **WCAG Compliant** - Follow web accessibility standards
- **Easy to Use** - Simple directive-based API
- **Well Documented** - Comprehensive documentation and examples

## 📦 Installation

```bash
npm install vue-a11y-directives
```

## 🎯 Quick Start

```javascript
import { createApp } from 'vue'
import App from './App.vue'
import { installA11yDirectives } from 'vue-a11y-directives'

const app = createApp(App)

// Install all directives globally
installA11yDirectives(app)

app.mount('#app')
```

Or import individual directives:

```javascript
import { focusDirective, keyboardDirective, ariaDirective } from 'vue-a11y-directives'

export default {
  directives: {
    'a11y-focus': focusDirective,
    'a11y-keyboard': keyboardDirective,
    'a11y-aria': ariaDirective
  }
}
```

## 📚 Available Directives

### 1. `v-a11y-focus`
Auto-focus elements with conditional logic.

```vue
<input v-a11y-focus />
<input v-a11y-focus="200" />  <!-- with 200ms delay -->
```

### 2. `v-a11y-keyboard`
Enhanced keyboard navigation support.

```vue
<div v-a11y-keyboard="{ 
  arrowDown: () => next(), 
  arrowUp: () => prev(),
  enter: () => select()
}">
```

### 3. `v-a11y-aria`
Dynamic ARIA attributes management.

```vue
<button v-a11y-aria="{ 
  label: 'Close dialog',
  expanded: isOpen,
  controls: 'menu-id'
}">
```

### 4. `v-a11y-announce`
Screen reader announcements.

```vue
<div v-a11y-announce="statusMessage"></div>
```

### 5. `v-a11y-trap-focus`
Trap focus within modals/dialogs with Escape key support.

```vue
<div v-a11y-trap-focus="{ onEscape: closeModal, autoFocus: false }">
  <!-- Focus stays within this container -->
</div>
```

### 6. `v-a11y-skip-link`
Skip navigation links for keyboard users.

```vue
<a v-a11y-skip-link href="#main-content">Skip to main content</a>
```

### 7. `v-a11y-skip`
Skip elements from keyboard navigation.

```vue
<!-- Always skip -->
<div v-a11y-skip>Hidden content</div>

<!-- Conditional skip -->
<button v-a11y-skip="item.disabled">Button</button>

<!-- With visual indication -->
<div v-a11y-skip.visual="item.inactive">Grayed out</div>

<!-- Block all interactions -->
<div v-a11y-skip.noInteraction="isProcessing">Processing...</div>
```

### 8. `v-a11y-date-picker`
Enhance date picker accessibility with auto-focus and keyboard navigation.

```vue
<template>
  <!-- Apply to wrapper div, not the component itself -->
  <div v-a11y-date-picker style="position: relative">
    <!-- Your date picker component -->
    <DatePickerComponent v-model="date" />
  </div>
</template>
```

**Features:**
- Auto-focuses calendar when opened
- Arrow keys navigate without auto-selecting
- Enter/Space to select date
- Works with Element Plus, Vuetify, Ant Design Vue, PrimeVue

**Example with Element Plus:**
```vue
<template>
  <div v-a11y-date-picker style="position: relative">
    <el-date-picker 
      v-model="date" 
      :teleported="false"
      placeholder="Select date"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
const date = ref('');
</script>
```

## 🎨 Real-World Examples

### Accessible Navigation Menu

```vue
<template>
  <nav>
    <div v-a11y-announce="announcement"></div>
    <ul v-a11y-keyboard="keyboardHandlers" tabindex="0">
      <li v-for="item in menuItems" :key="item.id">
        <button 
          v-a11y-aria="{ 
            expanded: item.isOpen,
            controls: `menu-${item.id}`
          }"
          @click="toggle(item)"
        >
          {{ item.label }}
        </button>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      announcement: '',
      menuItems: ['Home', 'Products', 'About', 'Contact'],
      currentIndex: 0
    }
  },
  computed: {
    keyboardHandlers() {
      return {
        arrowDown: () => this.navigateNext(),
        arrowUp: () => this.navigatePrev(),
        enter: () => this.selectItem()
      }
    }
  },
  methods: {
    navigateNext() {
      this.currentIndex = (this.currentIndex + 1) % this.menuItems.length;
    },
    navigatePrev() {
      this.currentIndex = this.currentIndex === 0 
        ? this.menuItems.length - 1 
        : this.currentIndex - 1;
    },
    selectItem() {
      console.log('Selected:', this.menuItems[this.currentIndex]);
    }
  }
}
</script>
```

### Accessible Modal Dialog

```vue
<template>
  <div v-if="isOpen" v-a11y-trap-focus="isOpen" class="modal">
    <div v-a11y-announce="modalAnnouncement"></div>
    <h2 v-a11y-focus>Modal Title</h2>
    <button 
      v-a11y-aria="{ label: 'Close modal' }"
      @click="close"
    >
      ×
    </button>
  </div>
</template>
```

## 📖 Documentation

For complete documentation, examples, and interactive demos, visit:
- [GitHub Repository](https://github.com/shkelqimemerllahu/vue-a11y-directives)
- [Live Documentation](https://vue-a11y-directives.netlify.app) (coming soon)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT © [Shkelqim Emerllahu](https://github.com/shkelqimemerllahu)

## 🌟 Show Your Support

Give a ⭐️ if this project helped you!

## 📞 Support

- Create an [issue](https://github.com/shkelqimemerllahu/vue-a11y-directives/issues)
- Follow me on [GitHub](https://github.com/shkelqimemerllahu)
