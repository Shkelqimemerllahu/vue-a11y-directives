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
    const config = binding.value || {};
    
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

    // Function to focus calendar when it opens
    const focusCalendar = () => {
      // Clear any existing timeout
      if (focusTimeout) {
        clearTimeout(focusTimeout);
      }

      // Use multiple checks with increasing delays to handle different rendering speeds
      const attemptFocus = (attempt = 0) => {
        const maxAttempts = 5;
        const currentDelay = delay + (attempt * 50); // Increase delay with each attempt

        focusTimeout = setTimeout(() => {
          // Check if panel exists and is visible
          const panel = document.querySelector(selectors.panel);
          if (!panel || panel.offsetParent === null) {
            if (attempt < maxAttempts) {
              attemptFocus(attempt + 1);
            }
            return;
          }

          // Try to focus the selected day first
          const selectedDay = document.querySelector(`${selectors.panel} ${selectors.selectedDay}`);
          if (selectedDay) {
            selectedDay.setAttribute('tabindex', '0');
            selectedDay.focus();
            return;
          }

          // Fallback: focus the first available day
          const firstDay = document.querySelector(`${selectors.panel} ${selectors.availableDay}`);
          if (firstDay) {
            firstDay.setAttribute('tabindex', '0');
            firstDay.focus();
            return;
          }

          // If still no success and we have attempts left, try again
          if (attempt < maxAttempts) {
            attemptFocus(attempt + 1);
          }
        }, currentDelay);
      };

      attemptFocus();
    };

    // Listen for input focus/click to detect when calendar opens
    const inputEl = el.querySelector(selectors.input) || el;
    
    const handleInputInteraction = () => {
      if (!isCalendarOpen) {
        isCalendarOpen = true;
        
        // Wait for calendar to appear in DOM
        const interactionTimeout = setTimeout(() => {
          const panel = document.querySelector(selectors.panel);
          if (panel && panel.offsetParent !== null) {
            focusCalendar();
            
            // Watch for calendar close
            observer = new MutationObserver((mutations) => {
              const panelStillExists = document.querySelector(selectors.panel);
              if (!panelStillExists || panelStillExists.offsetParent === null) {
                isCalendarOpen = false;
                if (observer) {
                  observer.disconnect();
                  observer = null;
                }
                // Clear timeout reference when closed
                if (el.__a11yDatePickerTimeout) {
                  clearTimeout(el.__a11yDatePickerTimeout);
                  delete el.__a11yDatePickerTimeout;
                }
              }
            });
            
            // Observe body for calendar removal
            observer.observe(document.body, {
              childList: true,
              subtree: true
            });
          }
        }, 150);
        
        // Store timeout reference for cleanup
        el.__a11yDatePickerTimeout = interactionTimeout;
      }
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
