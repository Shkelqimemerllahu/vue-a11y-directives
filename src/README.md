# 🎯 Vue 3 Accessibility (a11y) Directives - Complete Documentation

A comprehensive collection of Vue 3 directives for building accessible web applications. This package provides declarative, easy-to-use directives that handle all common accessibility scenarios.

## 📋 Table of Contents

1. [Installation](#installation)
2. [Quick Start](#quick-start)
3. [Directives Overview](#directives-overview)
4. [Detailed Usage - All Scenarios](#detailed-usage---all-scenarios)
   - [v-a11y-focus](#1-v-a11y-focus)
   - [v-a11y-trap-focus](#2-v-a11y-trap-focus)
   - [v-a11y-keyboard](#3-v-a11y-keyboard)
   - [v-a11y-announce](#4-v-a11y-announce)
   - [v-a11y-aria](#5-v-a11y-aria)
   - [v-a11y-skip-link](#6-v-a11y-skip-link)
   - [v-a11y-date-picker](#7-v-a11y-date-picker)
5. [Real-World Examples](#real-world-examples)
6. [Helper Functions](#helper-functions)
7. [Best Practices](#best-practices)
8. [Browser Support](#browser-support)

---

## 🚀 Installation

### In Your Vue 3 Project

```javascript
// main.js
import { installA11yDirectives } from './directives/a11y';

const app = createApp(App);
installA11yDirectives(app);
app.mount('#app');
```

### Individual Import (Tree-shakable)

```javascript
import { focusDirective, trapFocusDirective } from './directives/a11y';

app.directive('a11y-focus', focusDirective);
app.directive('a11y-trap-focus', trapFocusDirective);
```

---

## ⚡ Quick Start

```vue
<template>
  <!-- Auto-focus input -->
  <input v-a11y-focus type="text" />
  
  <!-- Modal with focus trap -->
  <div v-a11y-trap-focus role="dialog">
    <h2>Modal Title</h2>
    <button @click="close">Close</button>
  </div>
  
  <!-- Keyboard support -->
  <div v-a11y-keyboard="{ enter: true, escape: handleEscape }">
    Press Enter or Escape
  </div>
  
  <!-- Date picker with auto-focus calendar -->
  <div v-a11y-date-picker>
    <DatePicker v-model="date" />
  </div>
</template>
```

---

## 📚 Directives Overview

| Directive | Purpose | Use Cases |
|-----------|---------|-----------|
| `v-a11y-focus` | Auto-focus elements | Form inputs, modals, dynamic content |
| `v-a11y-trap-focus` | Trap focus within container | Modals, dialogs, dropdowns |
| `v-a11y-keyboard` | Enhanced keyboard navigation | Custom components, menus, actions |
| `v-a11y-announce` | Screen reader announcements | Status updates, errors, notifications |
| `v-a11y-aria` | Dynamic ARIA attributes | All interactive elements |
| `v-a11y-skip-link` | Skip navigation links | Main navigation, sidebars |
| `v-a11y-date-picker` | Auto-focus date picker calendars | Element Plus, Vuetify, Ant Design date pickers |

---

## 📖 Detailed Usage - All Scenarios

### 1. v-a11y-focus

Auto-focus elements when they appear in the DOM.

#### **Scenario 1.1: Basic Auto-Focus**
```vue
<template>
  <!-- Focus immediately -->
  <input v-a11y-focus type="text" placeholder="I'm auto-focused!" />
</template>
```

**Use Case:** First input in a form, search box when page loads

---

#### **Scenario 1.2: Delayed Focus**
```vue
<template>
  <!-- Focus after 200ms delay -->
  <input v-a11y-focus="200" type="text" placeholder="Focused with delay" />
</template>
```

**Use Case:** When animations need to complete first, avoid FOUC (Flash of Unstyled Content)

---

#### **Scenario 1.3: Focus with Text Selection**
```vue
<template>
  <!-- Focus and select all text -->
  <input 
    v-a11y-focus="{ delay: 100, select: true }" 
    type="text" 
    value="This text will be selected"
  />
</template>
```

**Use Case:** Edit mode in forms, quick text replacement, rename inputs

---

#### **Scenario 1.4: Conditional Focus**
```vue
<template>
  <!-- Focus only when condition is true -->
  <input 
    v-if="showInput"
    v-a11y-focus="{ delay: 150 }" 
    type="text" 
  />
  
  <button @click="showInput = true">Show Input</button>
</template>

<script>
export default {
  data() {
    return { showInput: false };
  }
};
</script>
```

**Use Case:** Dynamic forms, progressive disclosure, add/edit modes

---

#### **Scenario 1.5: Focus in Lists (Loop)**
```vue
<template>
  <div v-for="(item, index) in items" :key="item.id">
    <input 
      v-a11y-focus="index === focusIndex ? 100 : false"
      :value="item.name" 
      @focus="focusIndex = index"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      focusIndex: 0,
      items: [
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' }
      ]
    };
  }
};
</script>
```

**Use Case:** List editing, todo apps, form arrays

---

### 2. v-a11y-trap-focus

Trap keyboard focus within a container (essential for modals and dialogs).

#### **Scenario 2.1: Basic Modal Focus Trap**
```vue
<template>
  <div v-if="showModal" class="modal-overlay">
    <div 
      v-a11y-trap-focus
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <h2 id="modal-title">Confirm Action</h2>
      <p>Are you sure?</p>
      <button @click="confirm">Yes</button>
      <button @click="cancel">No</button>
    </div>
  </div>
</template>
```

**Use Case:** Confirmation dialogs, alerts, any modal

**Keyboard Behavior:**
- Tab cycles through focusable elements
- Shift+Tab goes backwards
- Focus never leaves the modal
- Auto-focuses first element

---

#### **Scenario 2.2: Focus Trap Without Auto-Focus**
```vue
<template>
  <div v-a11y-trap-focus="{ autoFocus: false }" role="dialog">
    <!-- Focus stays on the element that opened this -->
    <h2>Modal Title</h2>
    <button>Action</button>
  </div>
</template>
```

**Use Case:** When you want to manually control which element gets focused

---

#### **Scenario 2.3: Nested Modals**
```vue
<template>
  <!-- Parent Modal -->
  <div v-if="showParentModal" class="modal">
    <div v-a11y-trap-focus role="dialog">
      <h2>Parent Modal</h2>
      <button @click="showChildModal = true">Open Nested</button>
      
      <!-- Child Modal -->
      <div v-if="showChildModal" class="modal nested">
        <div v-a11y-trap-focus role="dialog">
          <h2>Nested Modal</h2>
          <button @click="showChildModal = false">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>
```

**Use Case:** Complex workflows, wizard steps with confirmations

**Behavior:** Each trap is independent; closing child returns focus to parent

---

#### **Scenario 2.4: Dropdown with Focus Trap**
```vue
<template>
  <div class="dropdown">
    <button 
      @click="isOpen = !isOpen"
      :aria-expanded="isOpen"
      aria-haspopup="listbox"
    >
      Select Option
    </button>
    
    <ul 
      v-if="isOpen"
      v-a11y-trap-focus
      role="listbox"
    >
      <li role="option" tabindex="0" @click="select('Option 1')">Option 1</li>
      <li role="option" tabindex="0" @click="select('Option 2')">Option 2</li>
      <li role="option" tabindex="0" @click="select('Option 3')">Option 3</li>
    </ul>
  </div>
</template>
```

**Use Case:** Custom dropdowns, select menus, comboboxes

---

#### **Scenario 2.5: Sidebar/Drawer with Trap**
```vue
<template>
  <aside 
    v-if="sidebarOpen"
    v-a11y-trap-focus
    class="sidebar"
  >
    <nav>
      <a href="#home">Home</a>
      <a href="#about">About</a>
      <a href="#contact">Contact</a>
    </nav>
    <button @click="sidebarOpen = false">Close</button>
  </aside>
</template>
```

**Use Case:** Mobile menus, navigation drawers, side panels

---

### 3. v-a11y-keyboard

Enhanced keyboard navigation for interactive elements.

#### **Scenario 3.1: Enter Key to Trigger Action**
```vue
<template>
  <!-- Div that acts like a button -->
  <div 
    v-a11y-keyboard="{ enter: true }"
    @click="handleClick"
    tabindex="0"
    role="button"
    class="clickable-card"
  >
    Press Enter to activate
  </div>
</template>

<script>
export default {
  methods: {
    handleClick() {
      console.log('Activated!');
    }
  }
};
</script>
```

**Use Case:** Custom buttons, cards, tiles, any clickable non-button element

---

#### **Scenario 3.2: Escape Key to Close**
```vue
<template>
  <div 
    v-a11y-keyboard="{ escape: handleClose }"
    class="modal"
  >
    <h2>Press Escape to close</h2>
    <button @click="handleClose">Or click here</button>
  </div>
</template>

<script>
export default {
  methods: {
    handleClose() {
      this.$emit('close');
    }
  }
};
</script>
```

**Use Case:** Modals, tooltips, popovers, dropdown menus

---

#### **Scenario 3.3: Arrow Key Navigation (Menu)**
```vue
<template>
  <div 
    v-a11y-keyboard="{ arrows: handleArrows }"
    role="menu"
    class="menu"
  >
    <div 
      v-for="(item, index) in menuItems"
      :key="index"
      :ref="el => menuRefs[index] = el"
      role="menuitem"
      tabindex="-1"
      @click="selectItem(item)"
    >
      {{ item }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuItems: ['File', 'Edit', 'View', 'Help'],
      menuRefs: []
    };
  },
  methods: {
    handleArrows(e) {
      const currentIndex = this.menuRefs.findIndex(
        el => el === document.activeElement
      );
      
      let nextIndex;
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        nextIndex = (currentIndex + 1) % this.menuItems.length;
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        nextIndex = currentIndex <= 0 
          ? this.menuItems.length - 1 
          : currentIndex - 1;
      }
      
      if (nextIndex !== undefined) {
        this.menuRefs[nextIndex]?.focus();
      }
    },
    selectItem(item) {
      console.log('Selected:', item);
    }
  }
};
</script>
```

**Use Case:** Dropdown menus, context menus, vertical navigation lists

---

#### **Scenario 3.4: Custom Keyboard Shortcuts**
```vue
<template>
  <textarea
    v-a11y-keyboard="{
      handlers: {
        's': handleSave,
        'k': handleSearch,
        'b': handleBold
      }
    }"
    @keydown="checkModifiers"
    placeholder="Try Ctrl+S, Ctrl+K, Ctrl+B"
  ></textarea>
</template>

<script>
export default {
  methods: {
    checkModifiers(e) {
      // Custom handlers get called, check for modifiers here
    },
    handleSave(e) {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        console.log('💾 Saved!');
      }
    },
    handleSearch(e) {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        console.log('🔍 Search opened!');
      }
    },
    handleBold(e) {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        console.log('𝐁 Text bolded!');
      }
    }
  }
};
</script>
```

**Use Case:** Text editors, IDE-like interfaces, power user features

---

#### **Scenario 3.5: Space Bar for Toggle**
```vue
<template>
  <div
    v-a11y-keyboard="{ space: true }"
    @click="toggleState"
    role="switch"
    :aria-checked="isOn"
    tabindex="0"
    class="toggle-switch"
  >
    {{ isOn ? 'ON' : 'OFF' }}
  </div>
</template>

<script>
export default {
  data() {
    return { isOn: false };
  },
  methods: {
    toggleState() {
      this.isOn = !this.isOn;
    }
  }
};
</script>
```

**Use Case:** Custom switches, checkboxes, toggle buttons

---

### 4. v-a11y-announce

Screen reader announcements for dynamic content changes.

#### **Scenario 4.1: Polite Announcement (Non-Urgent)**
```vue
<template>
  <button 
    v-a11y-announce="announcementMessage"
    @click="addToCart"
  >
    Add to Cart ({{ cartCount }})
  </button>
</template>

<script>
export default {
  data() {
    return {
      cartCount: 0,
      announcementMessage: null
    };
  },
  methods: {
    addToCart() {
      this.cartCount++;
      this.announcementMessage = `Item added. Cart now has ${this.cartCount} items`;
      
      // Clear after announcement
      setTimeout(() => {
        this.announcementMessage = null;
      }, 100);
    }
  }
};
</script>
```

**Use Case:** Adding items, status updates, progress indicators

**Priority:** `polite` - Won't interrupt current screen reader speech

---

#### **Scenario 4.2: Assertive Announcement (Urgent)**
```vue
<template>
  <div>
    <button @click="triggerError">Cause Error</button>
    
    <div 
      v-if="errorMessage"
      v-a11y-announce="{ message: errorMessage, priority: 'assertive' }"
      class="error-banner"
    >
      {{ errorMessage }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return { errorMessage: null };
  },
  methods: {
    triggerError() {
      this.errorMessage = 'Critical error: Action failed!';
      
      setTimeout(() => {
        this.errorMessage = null;
      }, 5000);
    }
  }
};
</script>
```

**Use Case:** Errors, warnings, critical alerts

**Priority:** `assertive` - Interrupts current screen reader speech

---

#### **Scenario 4.3: Loading State Announcement**
```vue
<template>
  <div>
    <button @click="loadData" :disabled="isLoading">
      Load Data
    </button>
    
    <div v-if="isLoading" v-a11y-announce="'Loading data, please wait'">
      <div class="spinner"></div>
    </div>
    
    <div v-if="dataLoaded" v-a11y-announce="'Data loaded successfully'">
      ✅ Data ready!
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
      dataLoaded: false
    };
  },
  methods: {
    async loadData() {
      this.isLoading = true;
      this.dataLoaded = false;
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      this.isLoading = false;
      this.dataLoaded = true;
      
      setTimeout(() => {
        this.dataLoaded = false;
      }, 3000);
    }
  }
};
</script>
```

**Use Case:** Async operations, data fetching, form submissions

---

#### **Scenario 4.4: Form Validation Announcement**
```vue
<template>
  <form @submit.prevent="handleSubmit">
    <input v-model="email" type="email" />
    <button type="submit">Submit</button>
    
    <div 
      v-if="validationError"
      v-a11y-announce="{ message: validationError, priority: 'assertive' }"
      class="error"
    >
      {{ validationError }}
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      validationError: null
    };
  },
  methods: {
    handleSubmit() {
      if (!this.email.includes('@')) {
        this.validationError = 'Invalid email address';
      } else {
        this.validationError = null;
        // Submit form
      }
    }
  }
};
</script>
```

**Use Case:** Form validation, inline errors, field-specific messages

---

#### **Scenario 4.5: Dynamic List Updates**
```vue
<template>
  <div>
    <button @click="addItem">Add Item</button>
    <button @click="removeItem" :disabled="items.length === 0">Remove Item</button>
    
    <div v-a11y-announce="listUpdateMessage">
      <ul>
        <li v-for="item in items" :key="item.id">{{ item.name }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [],
      listUpdateMessage: null
    };
  },
  methods: {
    addItem() {
      const id = Date.now();
      this.items.push({ id, name: `Item ${this.items.length + 1}` });
      this.listUpdateMessage = `Item added. Total: ${this.items.length}`;
      setTimeout(() => this.listUpdateMessage = null, 100);
    },
    removeItem() {
      this.items.pop();
      this.listUpdateMessage = `Item removed. Total: ${this.items.length}`;
      setTimeout(() => this.listUpdateMessage = null, 100);
    }
  }
};
</script>
```

**Use Case:** Todo lists, shopping carts, dynamic content

---

### 5. v-a11y-aria

Easy management of ARIA attributes with reactive updates.

#### **Scenario 5.1: Expandable Section**
```vue
<template>
  <div>
    <button
      v-a11y-aria="{
        label: 'Toggle details',
        expanded: isExpanded,
        controls: 'details-panel'
      }"
      @click="isExpanded = !isExpanded"
    >
      {{ isExpanded ? '▼' : '▶' }} Details
    </button>
    
    <div v-show="isExpanded" id="details-panel">
      <p>Here are the details...</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return { isExpanded: false };
  }
};
</script>
```

**Use Case:** Accordions, collapsible sections, disclosure widgets

---

#### **Scenario 5.2: Form Input with Validation**
```vue
<template>
  <div>
    <label for="username">Username:</label>
    <input
      id="username"
      v-model="username"
      v-a11y-aria="{
        required: true,
        invalid: isInvalid,
        describedby: 'username-hint'
      }"
      @blur="validate"
    />
    <span id="username-hint" :class="{ error: isInvalid }">
      {{ isInvalid ? 'Must be at least 3 characters' : 'Min 3 characters' }}
    </span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      isInvalid: false
    };
  },
  methods: {
    validate() {
      this.isInvalid = this.username.length > 0 && this.username.length < 3;
    }
  }
};
</script>
```

**Use Case:** Form validation, inline error messages

---

#### **Scenario 5.3: Toggle Button**
```vue
<template>
  <button
    v-a11y-aria="{
      pressed: isBold,
      label: 'Toggle bold formatting'
    }"
    @click="isBold = !isBold"
    class="formatting-button"
    :class="{ active: isBold }"
  >
    <strong>B</strong>
  </button>
</template>

<script>
export default {
  data() {
    return { isBold: false };
  }
};
</script>
```

**Use Case:** Toolbar buttons, formatting controls, toggle states

---

#### **Scenario 5.4: Disabled State**
```vue
<template>
  <button
    v-a11y-aria="{
      disabled: isProcessing,
      label: isProcessing ? 'Processing, please wait' : 'Submit form'
    }"
    :disabled="isProcessing"
    @click="submit"
  >
    {{ isProcessing ? 'Processing...' : 'Submit' }}
  </button>
</template>

<script>
export default {
  data() {
    return { isProcessing: false };
  },
  methods: {
    async submit() {
      this.isProcessing = true;
      await new Promise(resolve => setTimeout(resolve, 2000));
      this.isProcessing = false;
    }
  }
};
</script>
```

**Use Case:** Async actions, form submissions, disabled states

---

#### **Scenario 5.5: Dropdown Menu**
```vue
<template>
  <div>
    <button
      v-a11y-aria="{
        haspopup: 'menu',
        expanded: menuOpen,
        controls: 'menu-items'
      }"
      @click="menuOpen = !menuOpen"
    >
      Menu ▼
    </button>
    
    <ul 
      v-show="menuOpen"
      id="menu-items"
      role="menu"
    >
      <li role="menuitem" tabindex="0">Option 1</li>
      <li role="menuitem" tabindex="0">Option 2</li>
      <li role="menuitem" tabindex="0">Option 3</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return { menuOpen: false };
  }
};
</script>
```

**Use Case:** Dropdown menus, context menus, select components

---

### 6. v-a11y-skip-link

Create accessible skip navigation links.

#### **Scenario 6.1: Skip to Main Content**
```vue
<template>
  <div>
    <!-- Skip link (usually visually hidden until focused) -->
    <a 
      href="#main-content"
      v-a11y-skip-link="'#main-content'"
      class="skip-link"
    >
      Skip to main content
    </a>
    
    <!-- Navigation -->
    <nav>
      <a href="#">Link 1</a>
      <a href="#">Link 2</a>
      <a href="#">Link 3</a>
      <!-- Many more links -->
    </nav>
    
    <!-- Main content -->
    <main id="main-content" tabindex="-1">
      <h1>Main Content</h1>
      <p>Content starts here...</p>
    </main>
  </div>
</template>

<style>
.skip-link {
  position: absolute;
  left: -9999px;
}

.skip-link:focus {
  position: static;
  left: auto;
}
</style>
```

**Use Case:** Main site navigation, long header navigation

---

#### **Scenario 6.2: Multiple Skip Links**
```vue
<template>
  <div>
    <div class="skip-links">
      <a href="#main" v-a11y-skip-link="'#main'">Skip to main</a>
      <a href="#sidebar" v-a11y-skip-link="'#sidebar'">Skip to sidebar</a>
      <a href="#footer" v-a11y-skip-link="'#footer'">Skip to footer</a>
    </div>
    
    <main id="main" tabindex="-1">Main content</main>
    <aside id="sidebar" tabindex="-1">Sidebar</aside>
    <footer id="footer" tabindex="-1">Footer</footer>
  </div>
</template>
```

**Use Case:** Complex layouts, dashboards, multi-section pages

---

### 7. v-a11y-date-picker

Auto-focus date picker calendars for immediate keyboard navigation. Works with Element Plus, Vuetify, Ant Design, and other UI libraries.

#### **Scenario 7.1: Basic Date Picker**
```vue
<template>
  <!-- Wrap your date picker component in a container with the directive -->
  <div v-a11y-date-picker style="position: relative">
    <label>Select Date</label>
    <YourDatePicker v-model="selectedDate" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
const selectedDate = ref('');
</script>
```

**Use Case:** Form inputs, booking systems, scheduling apps

**What it does:**
- Automatically focuses the calendar table when opened
- Enables immediate arrow key navigation (↑↓←→) to FOCUS dates
- User presses Enter or Space to SELECT the focused date
- Focuses selected date, today, or first available day
- Works with multiple date pickers on the same page

---

#### **Scenario 7.2: Custom Delay Configuration**
```vue
<template>
  <div v-a11y-date-picker="{ delay: 150 }">
    <YourDatePicker v-model="date" />
  </div>
</template>
```

**Use Case:** Slow animations, custom transitions

**Note:** Adjust delay if calendar takes longer to render

---

#### **Scenario 7.3: Multiple Date Pickers**
```vue
<template>
  <div class="date-range">
    <!-- Start date -->
    <div v-a11y-date-picker style="position: relative">
      <label>Start Date</label>
      <DatePicker v-model="startDate" />
    </div>
    
    <!-- End date -->
    <div v-a11y-date-picker style="position: relative">
      <label>End Date</label>
      <DatePicker v-model="endDate" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const startDate = ref('');
const endDate = ref('');
</script>
```

**Use Case:** Date ranges, booking systems, report filters

**Important Notes:**
- Apply directive to a **wrapper element**, not directly on the date picker component
- Each directive instance works independently
- Supports teleported and non-teleported calendars
- Arrow keys FOCUS dates, Enter/Space SELECTS the focused date

---

#### **Scenario 7.4: Custom Selectors for Different Libraries**
```vue
<template>
  <!-- For UI libraries with different DOM structures -->
  <div v-a11y-date-picker="{ 
    panelSelector: '.your-calendar-panel',
    selectedSelector: 'td.selected',
    availableSelector: 'td:not(.disabled)'
  }">
    <CustomDatePicker v-model="date" />
  </div>
</template>
```

**Use Case:** Custom date pickers, non-standard UI libraries

**Configuration Options:**
- `delay`: Time to wait before focusing (default: 100ms)
- `panelSelector`: CSS selector for calendar panel
- `selectedSelector`: CSS selector for selected date cell
- `availableSelector`: CSS selector for available date cells
- `inputSelector`: CSS selector for date picker input field

---

## 🌍 Real-World Examples

### Example 1: Accessible Modal Dialog (Complete)

```vue
<template>
  <div>
    <button @click="openModal">Open Modal</button>
    
    <div v-if="isOpen" class="modal-overlay">
      <div
        v-a11y-trap-focus
        v-a11y-keyboard="{ escape: closeModal }"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        class="modal"
      >
        <h2 id="modal-title" tabindex="-1">Delete Confirmation</h2>
        
        <p>Are you sure you want to delete this item?</p>
        
        <div class="modal-actions">
          <button 
            @click="handleDelete"
            :disabled="isDeleting"
            v-a11y-aria="{
              disabled: isDeleting,
              label: isDeleting ? 'Deleting...' : 'Confirm delete'
            }"
          >
            {{ isDeleting ? 'Deleting...' : 'Delete' }}
          </button>
          
          <button 
            @click="closeModal"
            :disabled="isDeleting"
          >
            Cancel
          </button>
        </div>
        
        <div 
          v-if="deleteError"
          v-a11y-announce="{ message: deleteError, priority: 'assertive' }"
          role="alert"
          class="error"
        >
          {{ deleteError }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
      isDeleting: false,
      deleteError: null
    };
  },
  methods: {
    openModal() {
      this.isOpen = true;
    },
    closeModal() {
      if (!this.isDeleting) {
        this.isOpen = false;
        this.deleteError = null;
      }
    },
    async handleDelete() {
      this.isDeleting = true;
      this.deleteError = null;
      
      try {
        // Simulate API call
        await new Promise((resolve, reject) => {
          setTimeout(() => {
            Math.random() > 0.5 ? resolve() : reject(new Error('Delete failed'));
          }, 1500);
        });
        
        this.closeModal();
        // Show success message
      } catch (error) {
        this.deleteError = error.message;
      } finally {
        this.isDeleting = false;
      }
    }
  }
};
</script>
```

---

### Example 2: Accessible Form with Validation

```vue
<template>
  <form @submit.prevent="handleSubmit">
    <div class="form-group">
      <label for="name">Name *</label>
      <input
        id="name"
        v-model="formData.name"
        v-a11y-focus="isFirstField"
        v-a11y-aria="{
          required: true,
          invalid: !!errors.name,
          describedby: errors.name ? 'name-error' : null
        }"
        @blur="validateField('name')"
      />
      <span 
        v-if="errors.name" 
        id="name-error" 
        role="alert"
        class="error"
        v-a11y-announce="{ message: errors.name, priority: 'assertive' }"
      >
        {{ errors.name }}
      </span>
    </div>
    
    <div class="form-group">
      <label for="email">Email *</label>
      <input
        id="email"
        v-model="formData.email"
        type="email"
        v-a11y-aria="{
          required: true,
          invalid: !!errors.email,
          describedby: errors.email ? 'email-error' : null
        }"
        @blur="validateField('email')"
      />
      <span 
        v-if="errors.email" 
        id="email-error" 
        role="alert"
        class="error"
      >
        {{ errors.email }}
      </span>
    </div>
    
    <button 
      type="submit"
      :disabled="isSubmitting"
      v-a11y-aria="{
        disabled: isSubmitting,
        label: isSubmitting ? 'Submitting form' : 'Submit form'
      }"
    >
      {{ isSubmitting ? 'Submitting...' : 'Submit' }}
    </button>
    
    <div 
      v-if="successMessage"
      v-a11y-announce="successMessage"
      role="status"
      class="success"
    >
      {{ successMessage }}
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      formData: { name: '', email: '' },
      errors: {},
      isSubmitting: false,
      successMessage: null,
      isFirstField: true
    };
  },
  methods: {
    validateField(field) {
      if (field === 'name' && !this.formData.name) {
        this.errors.name = 'Name is required';
      } else if (field === 'email' && !this.formData.email.includes('@')) {
        this.errors.email = 'Valid email is required';
      } else {
        delete this.errors[field];
      }
    },
    async handleSubmit() {
      // Validate all fields
      this.validateField('name');
      this.validateField('email');
      
      if (Object.keys(this.errors).length === 0) {
        this.isSubmitting = true;
        
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1500));
          this.successMessage = 'Form submitted successfully!';
          this.formData = { name: '', email: '' };
          
          setTimeout(() => {
            this.successMessage = null;
          }, 3000);
        } catch (error) {
          this.errors.submit = 'Submission failed';
        } finally {
          this.isSubmitting = false;
        }
      }
    }
  }
};
</script>
```

---

### Example 3: Accessible Dropdown/Select

```vue
<template>
  <div class="custom-select">
    <button
      @click="toggleDropdown"
      v-a11y-aria="{
        haspopup: 'listbox',
        expanded: isOpen,
        controls: 'option-list',
        label: `Select country, currently selected: ${selectedOption || 'none'}`
      }"
      class="select-button"
    >
      {{ selectedOption || 'Select Country' }} ▼
    </button>
    
    <ul
      v-show="isOpen"
      v-a11y-trap-focus
      v-a11y-keyboard="{ 
        escape: closeDropdown,
        arrows: handleArrowKeys 
      }"
      id="option-list"
      role="listbox"
      class="options-list"
    >
      <li
        v-for="(option, index) in options"
        :key="option"
        :ref="el => optionRefs[index] = el"
        role="option"
        :aria-selected="selectedOption === option"
        tabindex="0"
        @click="selectOption(option)"
        v-a11y-keyboard="{ enter: true }"
        class="option"
      >
        {{ option }}
      </li>
    </ul>
    
    <div 
      v-if="selectionMessage"
      v-a11y-announce="selectionMessage"
    ></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
      selectedOption: null,
      options: ['USA', 'Canada', 'UK', 'Germany', 'France'],
      optionRefs: [],
      selectionMessage: null
    };
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen;
    },
    closeDropdown() {
      this.isOpen = false;
    },
    selectOption(option) {
      this.selectedOption = option;
      this.selectionMessage = `${option} selected`;
      this.closeDropdown();
      
      setTimeout(() => {
        this.selectionMessage = null;
      }, 100);
    },
    handleArrowKeys(e) {
      const currentIndex = this.optionRefs.findIndex(
        el => el === document.activeElement
      );
      
      let nextIndex;
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % this.options.length;
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        nextIndex = currentIndex <= 0 ? this.options.length - 1 : currentIndex - 1;
      }
      
      if (nextIndex !== undefined) {
        this.optionRefs[nextIndex]?.focus();
      }
    }
  }
};
</script>
```

---

## 🛠️ Helper Functions

All helper functions are exported and can be used directly:

```javascript
import { 
  getFocusableElements,
  announce,
  setAriaAttributes,
  saveFocus,
  restoreFocus
} from './directives/a11y';

// Get all focusable elements in a container
const focusable = getFocusableElements(containerElement);

// Make an announcement
announce('Operation completed', 'polite');
announce('Error occurred!', 'assertive');

// Set ARIA attributes
setAriaAttributes(element, {
  'aria-label': 'Close button',
  'aria-expanded': 'true',
  'aria-controls': 'menu-1'
});

// Save and restore focus
const previousFocus = saveFocus();
// ... do something ...
restoreFocus(previousFocus);
```

---

## ✅ Best Practices

### DO:
- ✅ Always provide visible focus indicators
- ✅ Use semantic HTML first (button, input, etc.)
- ✅ Test with keyboard only (no mouse)
- ✅ Test with screen readers (NVDA, JAWS, VoiceOver)
- ✅ Combine directives when needed
- ✅ Use appropriate ARIA roles
- ✅ Keep announcements concise

### DON'T:
- ❌ Remove default focus styles without replacement
- ❌ Use directives on non-interactive elements without role
- ❌ Over-announce (avoid announcement fatigue)
- ❌ Trap focus without escape mechanism
- ❌ Forget to test with real screen readers
- ❌ Use `tabindex` values > 0
- ❌ Announce every tiny change

---

## 🌐 Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

### Screen Reader Support
- ✅ NVDA (Windows)
- ✅ JAWS (Windows)
- ✅ VoiceOver (macOS/iOS)
- ✅ TalkBack (Android)

---

## 🎓 Testing Your Implementation

### Keyboard Testing Checklist

```
[ ] Can navigate entire page with Tab key
[ ] Shift+Tab goes backwards
[ ] Enter activates buttons/links
[ ] Escape closes modals/dropdowns
[ ] Arrow keys work in menus/lists
[ ] Focus is always visible
[ ] Focus trap works in modals
[ ] Skip links are accessible
```

### Screen Reader Testing

```
[ ] All interactive elements are announced
[ ] Form labels are associated correctly
[ ] Error messages are announced
[ ] Loading states are announced
[ ] Button states (pressed, expanded) are announced
[ ] Required fields are indicated
[ ] Invalid fields are announced
```

---

## 📝 NPM Package Structure (For Publishing)

```
vue-a11y-directives/
├── package.json
├── README.md
├── LICENSE
├── src/
│   ├── index.js
│   ├── helpers.js
│   ├── directives/
│   │   ├── focus.directive.js
│   │   ├── trap-focus.directive.js
│   │   ├── keyboard.directive.js
│   │   ├── announce.directive.js
│   │   ├── aria.directive.js
│   │   └── skip-link.directive.js
├── dist/
│   ├── vue-a11y-directives.esm.js
│   ├── vue-a11y-directives.umd.js
│   └── vue-a11y-directives.d.ts
└── examples/
    └── demo.vue
```

---

## 🤝 Contributing

When adding new scenarios:
1. Follow existing patterns
2. Add JSDoc comments
3. Update this README
4. Test with screen readers
5. Ensure keyboard accessibility

---

## 📄 License

MIT License - Use freely in your projects!

---

## 🙋 Support

For issues or questions:
- Check the demo component for live examples
- Review this documentation
- Test with browser dev tools
- Test with screen readers

---

**Made with ♿ for a more accessible web**
