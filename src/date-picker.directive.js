/**
 * v-a11y-date-picker
 * Enhances date picker accessibility by auto-focusing calendar when opened
 * Works with Element Plus, Vuetify, and other UI libraries
 * 
 * Usage:
 *   <el-date-picker v-a11y-date-picker v-model="date" />
 *   <el-date-picker v-a11y-date-picker="{ selector: '.custom-calendar' }" v-model="date" />
 */

export default {
  mounted(el, binding) {
    const config = binding.value || {};
    
    // Default selectors for different UI libraries
    const selectors = {
      panel: config.panelSelector || '.el-picker-panel, .v-picker, .v-date-picker',
      selectedDay: config.selectedSelector || 'td.is-selected, td.selected, .v-date-picker-table__current',
      availableDay: config.availableSelector || 'td:not(.disabled):not(.is-disabled), .v-date-picker-table__events',
      input: config.inputSelector || '.el-input__inner, input'
    };

    // Track if calendar is open
    let isCalendarOpen = false;
    let observer = null;

    // Function to focus calendar when it opens
    const focusCalendar = () => {
      // Small delay to ensure calendar is fully rendered
      setTimeout(() => {
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
        }
      }, 100);
    };

    // Listen for input focus/click to detect when calendar opens
    const inputEl = el.querySelector(selectors.input) || el;
    
    const handleInputInteraction = () => {
      if (!isCalendarOpen) {
        isCalendarOpen = true;
        
        // Wait for calendar to appear in DOM
        setTimeout(() => {
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
              }
            });
            
            // Observe body for calendar removal
            observer.observe(document.body, {
              childList: true,
              subtree: true
            });
          }
        }, 150);
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

    // Store references for cleanup
    el.__a11yDatePickerInput = inputEl;
    el.__a11yDatePickerFocusHandler = handleInputInteraction;
    el.__a11yDatePickerKeyHandler = handleKeydown;
    el.__a11yDatePickerObserver = observer;
  },

  unmounted(el) {
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

    // Cleanup references
    delete el.__a11yDatePickerInput;
    delete el.__a11yDatePickerFocusHandler;
    delete el.__a11yDatePickerKeyHandler;
    delete el.__a11yDatePickerObserver;
  }
};
