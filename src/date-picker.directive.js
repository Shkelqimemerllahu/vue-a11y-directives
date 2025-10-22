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
      
      // Find the cell to focus
      let cellToFocus = null;
      let cellType = '';
      
      // Try to focus the selected day first (if a date is already selected)
      const selectedDay = document.querySelector('.el-picker-panel td.is-selected');
      if (selectedDay) {
        cellToFocus = selectedDay;
        cellType = 'selected day';
      }

      // Fallback 1: Focus today's date if visible
      if (!cellToFocus) {
        const today = document.querySelector('.el-picker-panel td.is-today');
        if (today) {
          cellToFocus = today;
          cellType = 'today';
        }
      }

      // Fallback 2: Focus the first available (non-disabled) day
      if (!cellToFocus) {
        const firstDay = document.querySelector('.el-picker-panel .el-date-table tbody td:not(.disabled):not(.is-disabled)');
        if (firstDay) {
          cellToFocus = firstDay;
          cellType = 'first available day';
        }
      }

      if (!cellToFocus) {
        console.log('[v-a11y-date-picker] ✗ Could not find any focusable day cell');
        return false;
      }

      // Make it focusable
      cellToFocus.setAttribute('tabindex', '0');
      
      // AGGRESSIVE FOCUS: Keep trying until it actually has focus
      // Element Plus is fighting us, so we fight back!
      let attempts = 0;
      const maxAttempts = 10;
      
      const forceFocus = () => {
        attempts++;
        cellToFocus.focus();
        
        // Check if focus actually worked
        if (document.activeElement === cellToFocus) {
          console.log(`[v-a11y-date-picker] ✓ Successfully focused ${cellType} after ${attempts} attempt(s)`);
          console.log('[v-a11y-date-picker] Active element:', document.activeElement);
          return true;
        }
        
        // If not focused yet and we haven't exceeded attempts, try again
        if (attempts < maxAttempts) {
          console.log(`[v-a11y-date-picker] Focus attempt ${attempts} failed, retrying...`);
          setTimeout(forceFocus, 10); // Try again in 10ms
        } else {
          console.log(`[v-a11y-date-picker] ✗ Failed to focus ${cellType} after ${maxAttempts} attempts`);
          console.log('[v-a11y-date-picker] Active element is:', document.activeElement);
        }
      };
      
      forceFocus();
      return true;
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

    // CRITICAL: Hook into Element Plus's visible-change event
    // This is the ONLY reliable way - it fires at the exact right moment
    // We need to add an event listener to the input's aria-expanded changes
    // or better yet, use MutationObserver on aria-expanded attribute
    
    const watchAriaExpanded = () => {
      const ariaObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'attributes' && mutation.attributeName === 'aria-expanded') {
            const isExpanded = inputEl.getAttribute('aria-expanded') === 'true';
            console.log('[v-a11y-date-picker] aria-expanded changed to:', isExpanded);
            
            if (isExpanded) {
              // Calendar is now open! This is the perfect timing
              focusCalendar();
            }
          }
        });
      });
      
      ariaObserver.observe(inputEl, {
        attributes: true,
        attributeFilter: ['aria-expanded']
      });
      
      console.log('[v-a11y-date-picker] Watching aria-expanded attribute on input');
      
      return ariaObserver;
    };
    
    const ariaObserver = watchAriaExpanded();
    el.__a11yDatePickerAriaObserver = ariaObserver;

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

    // Disconnect observers
    if (el.__a11yDatePickerObserver) {
      el.__a11yDatePickerObserver.disconnect();
    }
    
    if (el.__a11yDatePickerAriaObserver) {
      el.__a11yDatePickerAriaObserver.disconnect();
    }

    // Cleanup references
    delete el.__a11yDatePickerInput;
    delete el.__a11yDatePickerFocusHandler;
    delete el.__a11yDatePickerKeyHandler;
    delete el.__a11yDatePickerObserver;
    delete el.__a11yDatePickerAriaObserver;
    delete el.__a11yDatePickerTimeout;
  }
};
