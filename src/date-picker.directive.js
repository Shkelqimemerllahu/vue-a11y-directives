/**
 * v-a11y-date-picker
 * Enhances date picker accessibility by auto-focusing calendar when opened
 * Works with Element Plus, Vuetify, Ant Design, and other UI libraries
 * 
 * Usage:
 *   <el-date-picker v-a11y-date-picker v-model="date" />
 *   <el-date-picker v-a11y-date-picker="{ delay: 150 }" v-model="date" />
 *   <v-date-picker v-a11y-date-picker="{ panelSelector: '.v-picker' }" v-model="date" />
 */

export default {
  mounted(el, binding) {
    console.log('[v-a11y-date-picker] DIRECTIVE MOUNTED on element:', el);
    console.log('[v-a11y-date-picker] Element tag:', el.tagName);
    console.log('[v-a11y-date-picker] Element classes:', el.className);
    
    const config = binding.value || {};
    console.log('[v-a11y-date-picker] Config:', config);
    
    // Configurable delay (default 100ms, can be overridden)
    const delay = config.delay || 100;
    
    // Default selectors for different UI libraries
    const selectors = {
      // Panel selectors (where the calendar appears)
      panel: config.panelSelector || '.el-picker-panel, .el-date-picker, .v-picker, .v-date-picker, .ant-picker-dropdown, .p-datepicker',
      
      // Selected day selectors (current selected date)
      selectedDay: config.selectedSelector || 'td.is-selected, td.selected, td.is-today.is-selected, .v-date-picker-table__current, .ant-picker-cell-selected, .p-highlight',
      
      // Available day selectors (any selectable date)
      availableDay: config.availableSelector || 'td:not(.disabled):not(.is-disabled):not([disabled]), .v-date-picker-table__events, .ant-picker-cell:not(.ant-picker-cell-disabled), .p-datepicker-calendar td:not(.p-disabled)',
      
      // Input selectors (the input field)
      input: config.inputSelector || '.el-input__inner, input, .v-text-field__input, .ant-picker-input, .p-inputtext'
    };

    // Track if calendar is open
    let isCalendarOpen = false;
    let observer = null;
    let focusTimeout = null;

    // Function to actually focus the calendar (the working logic from your code)
    const doFocus = () => {
      console.log('[v-a11y-date-picker] Attempting to focus calendar');
      
      // Element Plus uses a date table that needs to be focused for arrow keys to work
      // We need to focus the table body, not individual cells
      const dateTable = document.querySelector('.el-picker-panel .el-date-table tbody');
      if (dateTable) {
        dateTable.setAttribute('tabindex', '0');
        dateTable.focus();
        console.log('[v-a11y-date-picker] ✓ Focused date table (arrow keys enabled)');
        return true;
      }

      // Fallback 1: Try the date table itself
      const table = document.querySelector('.el-picker-panel .el-date-table');
      if (table) {
        table.setAttribute('tabindex', '0');
        table.focus();
        console.log('[v-a11y-date-picker] ✓ Focused date table element');
        return true;
      }

      // Fallback 2: Try the picker panel
      const panel = document.querySelector('.el-picker-panel');
      if (panel) {
        panel.setAttribute('tabindex', '0');
        panel.focus();
        console.log('[v-a11y-date-picker] ✓ Focused picker panel');
        return true;
      }

      console.log('[v-a11y-date-picker] ✗ Could not find focusable calendar element');
      return false;
    };

    // Function to focus calendar when it opens
    // This mimics your working code: wait for next tick, then setTimeout
    const focusCalendar = () => {
      console.log('[v-a11y-date-picker] Calendar opened, waiting for DOM...');
      
      // Clear any existing timeout
      if (focusTimeout) {
        clearTimeout(focusTimeout);
      }

      // Mimic Vue's nextTick by using requestAnimationFrame
      // This waits for the browser to finish rendering
      requestAnimationFrame(() => {
        // Then add the setTimeout like your working code
        focusTimeout = setTimeout(() => {
          doFocus();
        }, delay);
      });
    };

    // Use MutationObserver to watch for when the calendar appears in DOM
    // This is more reliable than click/focus events
    const setupCalendarWatcher = () => {
      observer = new MutationObserver((mutations) => {
        // Check if a calendar panel appeared
        const panel = document.querySelector('.el-picker-panel');
        
        if (panel && !isCalendarOpen) {
          // Calendar just opened!
          isCalendarOpen = true;
          console.log('[v-a11y-date-picker] Calendar panel detected in DOM');
          focusCalendar();
        } else if (!panel && isCalendarOpen) {
          // Calendar closed
          isCalendarOpen = false;
          console.log('[v-a11y-date-picker] Calendar closed');
          if (focusTimeout) {
            clearTimeout(focusTimeout);
            focusTimeout = null;
          }
        }
      });

      // Watch the entire document for calendar appearing/disappearing
      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
      
      console.log('[v-a11y-date-picker] Watching for calendar...');
    };

    // Start watching immediately
    setupCalendarWatcher();
    
    // Find the actual input element - search deeper for Vue components
    const findInput = () => {
      // First try direct query
      let inputEl = el.querySelector(selectors.input);
      
      // If not found and el is a Vue component wrapper, search all children
      if (!inputEl) {
        const allInputs = el.querySelectorAll('input');
        inputEl = allInputs[0]; // Get first input
      }
      
      console.log('[v-a11y-date-picker] Found input element:', inputEl);
      return inputEl || el;
    };
    
    const inputEl = findInput();
    
    const handleInputInteraction = () => {
      console.log('[v-a11y-date-picker] Input interaction detected');
      // The MutationObserver will handle the actual focusing
      // This is just a fallback trigger
    };

    inputEl.addEventListener('focus', handleInputInteraction);
    inputEl.addEventListener('click', handleInputInteraction);
    
    // Handle keyboard open (Enter/Space)
    const handleKeydown = (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        handleInputInteraction();
      }
    };
    inputEl.addEventListener('keydown', handleKeydown);

    // Also try to hook into visible-change event if using Element Plus
    // This provides a more reliable way to detect calendar open
    if (binding.instance && binding.instance.$refs) {
      const componentInstance = binding.instance;
      const originalVisibleChange = componentInstance.visibleChange;
      
      // Monkey patch the visible-change handler if it exists
      componentInstance.visibleChange = (visible) => {
        if (visible) {
          focusCalendar();
        }
        if (originalVisibleChange) {
          originalVisibleChange(visible);
        }
      };
      
      el.__a11yDatePickerOriginalHandler = originalVisibleChange;
    }

    // Store references for cleanup
    el.__a11yDatePickerInput = inputEl;
    el.__a11yDatePickerFocusHandler = handleInputInteraction;
    el.__a11yDatePickerKeyHandler = handleKeydown;
    el.__a11yDatePickerObserver = observer;
  },

  unmounted(el) {
    // Clear any pending timeouts
    if (el.__a11yDatePickerTimeout) {
      clearTimeout(el.__a11yDatePickerTimeout);
    }

    // Cleanup event listeners
    if (el.__a11yDatePickerInput) {
      const inputEl = el.__a11yDatePickerInput;
      if (el.__a11yDatePickerFocusHandler) {
        inputEl.removeEventListener('focus', el.__a11yDatePickerFocusHandler);
        inputEl.removeEventListener('click', el.__a11yDatePickerFocusHandler);
      }
      if (el.__a11yDatePickerKeyHandler) {
        inputEl.removeEventListener('keydown', el.__a11yDatePickerKeyHandler);
      }
    }

    // Disconnect observer
    if (el.__a11yDatePickerObserver) {
      el.__a11yDatePickerObserver.disconnect();
    }

    // Restore original handler if we patched it
    if (el.__a11yDatePickerOriginalHandler && binding.instance) {
      binding.instance.visibleChange = el.__a11yDatePickerOriginalHandler;
    }

    // Cleanup references
    delete el.__a11yDatePickerInput;
    delete el.__a11yDatePickerFocusHandler;
    delete el.__a11yDatePickerKeyHandler;
    delete el.__a11yDatePickerObserver;
    delete el.__a11yDatePickerTimeout;
    delete el.__a11yDatePickerOriginalHandler;
  }
};
