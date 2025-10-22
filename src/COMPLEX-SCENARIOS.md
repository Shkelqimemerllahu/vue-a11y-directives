# 🔥 Complex Accessibility Scenarios - Complete Guide

This document covers advanced, real-world scenarios with nested loops, disabled items, conditional rendering, and complex state management.

## 📋 Table of Contents

1. [Scenario 1: Dynamic Task List with Mixed States](#scenario-1-dynamic-task-list)
2. [Scenario 2: Nested Accordions with Conditional Access](#scenario-2-nested-accordions)
3. [Scenario 3: Editable Data Grid](#scenario-3-editable-data-grid)
4. [Scenario 4: Multi-Step Wizard with Conditional Steps](#scenario-4-multi-step-wizard)
5. [Scenario 5: Context Menu with Nested Options](#scenario-5-context-menu)
6. [Best Practices for Complex Scenarios](#best-practices)

---

## Scenario 1: Dynamic Task List with Mixed States

### Overview
A task list where items can be:
- ✅ Enabled (can interact)
- ⛔ Disabled (tab skips over)
- 🔒 Locked (cannot be modified)
- ✓ Completed
- Dynamically added/removed

### Key Accessibility Features
```vue
<input
  :id="`task-${task.id}`"
  v-model="task.completed"
  type="checkbox"
  :disabled="task.disabled || task.locked"
  v-a11y-aria="{
    label: `${task.name}, ${task.disabled ? 'disabled' : task.locked ? 'locked' : task.completed ? 'completed' : 'not completed'}`,
    disabled: task.disabled || task.locked,
    checked: task.completed
  }"
  @change="handleTaskChange(task)"
/>
```

### What This Solves
- **Problem**: Users with disabilities need to know why they can't interact with an item
- **Solution**: ARIA labels clearly state the item's state (disabled, locked, completed)
- **Keyboard**: Tab automatically skips disabled items
- **Screen Reader**: Announces full context: "Task 3, locked, completed, checkbox"

### When to Use
- Todo lists
- Checklist forms
- Permission-based task management
- Workflow steps

---

## Scenario 2: Nested Accordions with Conditional Access

### Overview
Multi-level navigation where:
- Categories can expand/collapse
- Subcategories require permissions
- Items can be disabled, out of stock, or selected
- Deep nesting (3+ levels)

### Key Accessibility Features

#### Level 1: Categories
```vue
<button
  @click="toggleCategory(catIndex)"
  v-a11y-keyboard="{ enter: true }"
  v-a11y-aria="{
    expanded: category.expanded,
    controls: `category-content-${category.id}`,
    disabled: category.disabled
  }"
  :disabled="category.disabled"
>
  <span>{{ category.expanded ? '▼' : '▶' }}</span>
  {{ category.name }}
  <span v-if="category.requiresAuth" class="badge">🔐 Auth Required</span>
</button>
```

#### Level 2: Subcategories with Permission Check
```vue
<button
  @click="toggleSubcategory(catIndex, subIndex)"
  v-a11y-keyboard="{ enter: true }"
  v-a11y-aria="{
    expanded: subcategory.expanded,
    controls: `subcategory-content-${subcategory.id}`,
    disabled: !hasPermission(subcategory)
  }"
  :disabled="!hasPermission(subcategory)"
>
  <span v-if="!hasPermission(subcategory)" class="badge">🚫 No Access</span>
</button>
```

#### Level 3: Items with Mixed States
```vue
<button
  @click="selectItem(item)"
  v-a11y-keyboard="{ enter: true }"
  :disabled="item.disabled || item.outOfStock"
  v-a11y-aria="{
    disabled: item.disabled || item.outOfStock,
    pressed: item.selected,
    label: `${item.name}, ${item.outOfStock ? 'out of stock' : item.disabled ? 'unavailable' : item.selected ? 'selected' : 'not selected'}`
  }"
>
  {{ item.name }}
  <span v-if="item.outOfStock" class="badge">Out of Stock</span>
  <span v-if="item.disabled" class="badge">Unavailable</span>
</button>
```

### What This Solves
- **Problem**: Complex hierarchies are hard to navigate with keyboard
- **Solution**: 
  - Arrow keys navigate within levels
  - Enter expands/collapses
  - Tab moves between sections
  - Clear ARIA states for each level

### Permission Logic Example
```javascript
hasPermission(subcategory) {
  if (!subcategory.requiresPermission) return true;
  return this.userPermissions.premium;
}
```

### When to Use
- E-commerce category navigation
- File/folder trees
- Menu systems
- Document hierarchies
- Settings panels

---

## Scenario 3: Editable Data Grid

### Overview
A complex table with:
- Inline editing
- Row-level locking
- Cell-by-cell validation
- Arrow key navigation
- Mixed disabled states
- Show/hide locked rows

### Key Accessibility Features

#### Grid Container
```vue
<div 
  class="data-grid-wrapper"
  v-a11y-keyboard="{ arrows: handleGridArrows }"
  role="grid"
  aria-label="User data grid"
>
```

#### Editable Cell with Validation
```vue
<input
  v-if="row.isEditing"
  v-model="row.name"
  v-a11y-focus="row.isEditing ? 100 : false"
  v-a11y-aria="{
    invalid: !isValidName(row.name),
    required: true,
    describedby: !isValidName(row.name) ? `name-error-${row.id}` : null
  }"
  :disabled="row.locked"
  @blur="validateRow(row)"
  class="grid-input"
/>
<span 
  v-if="row.isEditing && !isValidName(row.name)" 
  :id="`name-error-${row.id}`"
  class="error-text"
  role="alert"
>
  Name required
</span>
```

### Validation Logic
```javascript
validateRow(row) {
  row.hasError = !this.isValidName(row.name) || !this.isValidEmail(row.email);
}

isValidName(name) {
  return name && name.trim().length > 0;
}

isValidEmail(email) {
  return email && email.includes('@') && email.includes('.');
}
```

### Edit Mode Management
```javascript
startEdit(row) {
  if (!row.locked) {
    // Save original data for cancel
    this.originalRowData[row.id] = { ...row };
    row.isEditing = true;
    this.gridMessage = `Editing ${row.name}`;
  }
}

cancelEdit(row) {
  if (this.originalRowData[row.id]) {
    Object.assign(row, this.originalRowData[row.id]);
    delete this.originalRowData[row.id];
  }
  row.isEditing = false;
}
```

### What This Solves
- **Problem**: Tables are notoriously difficult for screen readers
- **Solution**:
  - `role="grid"` tells screen readers it's an interactive table
  - Cell validation announces errors immediately
  - Focus management when entering edit mode
  - Locked rows clearly indicated
  - Save disabled until validation passes

### When to Use
- Admin dashboards
- User management
- Inventory systems
- Spreadsheet-like interfaces
- CRM systems

---

## Scenario 4: Multi-Step Wizard with Conditional Steps

### Overview
A multi-step form where:
- Steps can be optional (skippable)
- Steps lock until previous completes
- Validation per step
- Conditional fields
- Progress indication

### Key Accessibility Features

#### Step Navigation
```vue
<button
  @click="goToStep(stepIndex)"
  :disabled="!canAccessStep(stepIndex)"
  v-a11y-aria="{
    label: `Step ${stepIndex + 1}: ${step.title}, ${getStepStatus(step, stepIndex)}`,
    disabled: !canAccessStep(stepIndex),
    current: currentStep === stepIndex ? 'step' : null
  }"
  v-a11y-keyboard="{ enter: true }"
>
  <span class="step-number">
    {{ step.completed ? '✓' : step.skipped ? '⊘' : stepIndex + 1 }}
  </span>
  <span class="step-title">{{ step.title }}</span>
  <span v-if="step.optional" class="badge">Optional</span>
</button>
```

#### Access Control Logic
```javascript
canAccessStep(stepIndex) {
  if (stepIndex === 0) return true; // First step always accessible
  
  // Check all previous steps
  for (let i = 0; i < stepIndex; i++) {
    const step = this.wizardSteps[i];
    // Can't proceed if previous required step not completed/skipped
    if (!step.completed && !step.optional && !step.skipped) {
      return false;
    }
  }
  return true;
}
```

#### Step Status
```javascript
getStepStatus(step, stepIndex) {
  if (step.completed) return 'completed';
  if (step.skipped) return 'skipped';
  if (!this.canAccessStep(stepIndex)) return 'locked';
  if (this.currentStep === stepIndex) return 'current';
  return 'not started';
}
```

#### Conditional Field Example
```vue
<label class="checkbox-label">
  <input 
    type="checkbox" 
    v-model="wizardData.hasPhone"
    @change="handlePhoneToggle"
  />
  Add phone number (optional)
</label>

<div v-if="wizardData.hasPhone">
  <label for="wizard-phone">Phone Number</label>
  <input
    id="wizard-phone"
    v-model="wizardData.phone"
    v-a11y-focus="100"
  />
</div>
```

### Step Content with Focus Trap
```vue
<div class="wizard-content" v-a11y-trap-focus="currentStep >= 0">
  <!-- Content here -->
</div>
```

### What This Solves
- **Problem**: Users lose context in multi-step forms
- **Solution**:
  - Clear visual and ARIA status for each step
  - Can't skip ahead until validated
  - Optional steps clearly marked
  - Focus trap keeps context within current step
  - Announcements when moving between steps

### When to Use
- Onboarding flows
- Checkout processes
- Application forms
- Setup wizards
- Survey forms

---

## Scenario 5: Context Menu with Nested Options

### Overview
A right-click menu with:
- Nested submenus
- Disabled options
- Keyboard navigation
- Dynamic positioning
- Action shortcuts

### Key Accessibility Features

#### Menu Trigger
```vue
<div 
  class="context-menu-trigger"
  @contextmenu.prevent="openContextMenu($event)"
  tabindex="0"
  v-a11y-keyboard="{ enter: () => openContextMenu({ clientX: 100, clientY: 100 }) }"
  role="button"
  aria-haspopup="menu"
>
  Right-click here or press Enter
</div>
```

#### Menu Container with Focus Trap
```vue
<div 
  v-if="contextMenuOpen"
  v-a11y-trap-focus
  v-a11y-keyboard="{ 
    escape: closeContextMenu,
    arrows: handleContextMenuArrows 
  }"
  :style="{ top: contextMenuY + 'px', left: contextMenuX + 'px' }"
  class="context-menu"
  role="menu"
>
```

#### Menu Items
```vue
<button
  @click="handleContextAction(item)"
  :disabled="item.disabled"
  v-a11y-keyboard="{ enter: true }"
  v-a11y-aria="{
    label: item.label + (item.disabled ? ' (unavailable)' : ''),
    disabled: item.disabled
  }"
  role="menuitem"
  tabindex="-1"
>
  <span class="menu-icon">{{ item.icon }}</span>
  {{ item.label }}
  <span v-if="item.shortcut" class="shortcut">{{ item.shortcut }}</span>
</button>
```

#### Submenu with Hover and Click
```vue
<button
  @click="toggleSubmenu(index)"
  @mouseenter="toggleSubmenu(index)"
  v-a11y-keyboard="{ enter: true }"
  v-a11y-aria="{
    haspopup: 'menu',
    expanded: item.submenuOpen,
    disabled: item.disabled
  }"
  role="menuitem"
>
  {{ item.label }}
  <span class="submenu-arrow">▶</span>
</button>

<div 
  v-show="item.submenuOpen"
  class="submenu"
  role="menu"
>
  <!-- Submenu items -->
</div>
```

#### Arrow Key Navigation
```javascript
handleContextMenuArrows(e) {
  const focusableItems = this.contextMenuRefs
    .map(ref => ref?.querySelector('button'))
    .filter(btn => btn && !btn.disabled);
  
  const currentIndex = focusableItems.findIndex(
    btn => btn === document.activeElement
  );
  
  let nextIndex;
  if (e.key === 'ArrowDown') {
    e.preventDefault();
    nextIndex = currentIndex === -1 
      ? 0 
      : (currentIndex + 1) % focusableItems.length;
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    nextIndex = currentIndex <= 0 
      ? focusableItems.length - 1 
      : currentIndex - 1;
  }
  
  if (nextIndex !== undefined) {
    focusableItems[nextIndex]?.focus();
  }
}
```

### What This Solves
- **Problem**: Context menus often keyboard-inaccessible
- **Solution**:
  - Can open with keyboard (Enter key)
  - Arrow keys navigate options
  - Escape closes menu
  - Submenus accessible
  - Disabled items skipped automatically
  - Shortcut keys displayed

### When to Use
- Right-click menus
- Action menus
- Dropdown menus
- Toolbar options
- File context menus

---

## Best Practices for Complex Scenarios

### 1. **Always Announce State Changes**
```vue
<div 
  v-if="actionMessage"
  v-a11y-announce="actionMessage"
  role="status"
>
  {{ actionMessage }}
</div>
```

### 2. **Use Conditional tabindex**
```vue
<!-- Only focusable when not disabled -->
<button :tabindex="item.disabled ? -1 : 0">
```

### 3. **Combine Multiple States in ARIA Labels**
```vue
v-a11y-aria="{
  label: `${item.name}, ${getFullStatus(item)}`,
  disabled: item.disabled || item.locked,
  pressed: item.selected,
  invalid: item.hasError
}"
```

### 4. **Focus Management in Dynamic Lists**
```javascript
// When adding items
addItem() {
  this.items.push(newItem);
  this.$nextTick(() => {
    // Focus the new item
    this.$refs[`item-${newItem.id}`]?.focus();
  });
}
```

### 5. **Handle Focus When Removing Items**
```javascript
deleteItem(index) {
  const nextFocusIndex = index > 0 ? index - 1 : 0;
  this.items.splice(index, 1);
  
  this.$nextTick(() => {
    if (this.items.length > 0) {
      this.$refs[`item-${nextFocusIndex}`]?.focus();
    }
  });
}
```

### 6. **Validation with Immediate Feedback**
```vue
<input
  v-model="value"
  @blur="validate"
  @input="clearErrorOnInput"
  v-a11y-aria="{
    invalid: hasError,
    describedby: hasError ? 'error-message' : 'hint-text'
  }"
/>
```

### 7. **Loading States**
```vue
<div 
  v-if="isLoading"
  v-a11y-announce="'Loading, please wait'"
  v-a11y-aria="{ busy: true, live: 'polite' }"
>
  <div class="spinner" role="status"></div>
</div>
```

### 8. **Nested Focus Traps**
```vue
<!-- Parent -->
<div v-a11y-trap-focus="parentOpen">
  <!-- Child -->
  <div v-a11y-trap-focus="childOpen">
    <!-- Each manages its own focus independently -->
  </div>
</div>
```

### 9. **Skip Navigation in Long Lists**
```vue
<a 
  href="#end-of-list"
  v-a11y-skip-link="'#end-of-list'"
  class="skip-link"
>
  Skip to end of list ({{ totalItems }} items)
</a>

<!-- Long list here -->

<div id="end-of-list" tabindex="-1">
  End of list
</div>
```

### 10. **Error Recovery**
```javascript
try {
  await performAction();
} catch (error) {
  this.errorMessage = {
    message: `Action failed: ${error.message}`,
    priority: 'assertive' // Interrupt screen reader
  };
}
```

---

## Testing Checklist for Complex Scenarios

### Keyboard Navigation
- [ ] Tab order is logical
- [ ] Shift+Tab goes backwards
- [ ] Arrow keys work in lists/menus
- [ ] Enter activates buttons/links
- [ ] Escape closes modals/menus
- [ ] Disabled items are skipped
- [ ] Focus visible at all times

### Screen Reader
- [ ] All states announced (disabled, locked, selected, etc.)
- [ ] Errors announced immediately
- [ ] Loading states announced
- [ ] List counts announced ("3 of 10")
- [ ] Context changes announced
- [ ] Required fields indicated
- [ ] Validation errors clear

### Mouse/Touch
- [ ] All keyboard actions work with mouse
- [ ] Hover states clear
- [ ] Click targets large enough (44x44px minimum)
- [ ] No keyboard traps for mouse users

### Edge Cases
- [ ] Empty lists handled gracefully
- [ ] All items disabled - what happens?
- [ ] Network errors - clear feedback
- [ ] Rapid interactions don't break state
- [ ] Browser back/forward works
- [ ] Page refresh maintains state (if needed)

---

## Performance Considerations

### 1. **Virtual Scrolling for Long Lists**
```javascript
// Use vue-virtual-scroller for 1000+ items
import { RecycleScroller } from 'vue-virtual-scroller';
```

### 2. **Debounce Announcements**
```javascript
announceChange: debounce(function(message) {
  this.announcement = message;
}, 300)
```

### 3. **Lazy Load Nested Content**
```vue
<component 
  :is="subcategory.expanded ? SubcategoryContent : 'div'"
  v-bind="subcategory"
/>
```

---

## Common Pitfalls to Avoid

### ❌ DON'T: Use v-show for Focus Traps
```vue
<!-- BAD: Focus trap still active when hidden -->
<div v-show="isOpen" v-a11y-trap-focus>
```

### ✅ DO: Use v-if
```vue
<!-- GOOD: Focus trap removed from DOM -->
<div v-if="isOpen" v-a11y-trap-focus>
```

### ❌ DON'T: Forget to Clear Announcements
```vue
<!-- BAD: Announcement persists -->
<div v-a11y-announce="message">
```

### ✅ DO: Clear After Short Delay
```javascript
setTimeout(() => this.message = null, 100);
```

### ❌ DON'T: Disable Without Explanation
```vue
<!-- BAD: User doesn't know why -->
<button :disabled="true">Submit</button>
```

### ✅ DO: Explain in ARIA Label
```vue
<!-- GOOD: Clear reason provided -->
<button 
  :disabled="isProcessing"
  v-a11y-aria="{
    disabled: isProcessing,
    label: isProcessing ? 'Processing, please wait' : 'Submit form'
  }"
>
```

---

## Conclusion

Complex scenarios require careful attention to:
1. **State Management** - Every state change needs ARIA updates
2. **Focus Management** - Always know where focus should go
3. **Keyboard Navigation** - Must match visual hierarchy
4. **Screen Reader Support** - Announce ALL context changes
5. **Error Recovery** - Clear paths when things go wrong

Use the `ComplexScenariosDemo.vue` component to see all these patterns in action!
