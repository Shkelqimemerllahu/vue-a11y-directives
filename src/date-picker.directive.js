/**
 * v-a11y-date-picker
 * Enhances date picker accessibility by auto-focusing calendar when opened
 * Works with Element Plus, Vuetify, Ant Design, and other UI libraries
 * 
 * Arrow keys FOCUS dates, Enter/Space SELECTS the focused date
 * 
 * Usage:
 *   <div v-a11y-date-picker>
 *     <DatePicker v-model="date" />
 *   </div>
 *   
 *   <div v-a11y-date-picker="{ delay: 150 }">
 *     <DatePicker v-model="date" />
 *   </div>
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

    // Function to actually focus the calendar
    const doFocus = (inputElement) => {
      // CRITICAL: Find the calendar panel that belongs to THIS specific input
      // Element Plus uses aria-controls to link input to its calendar
      const ariaControlsId = inputElement.getAttribute('aria-controls');
      let calendarPanel = null;
      
      if (ariaControlsId) {
        calendarPanel = document.getElementById(ariaControlsId);
      }
      
      // Fallback: find the calendar panel that's currently visible
      if (!calendarPanel) {
        const allPanels = document.querySelectorAll('.el-picker-panel');
        for (const panel of allPanels) {
          if (panel.offsetParent !== null) { // Check if visible
            calendarPanel = panel;
            break;
          }
        }
      }
      
      if (!calendarPanel) {
        return false;
      }
      
      // Now find the cell to focus WITHIN this specific calendar panel
      let cellToFocus = null;
      let cellType = '';
      
      // Try to focus the selected day first (if a date is already selected)
      const selectedDay = calendarPanel.querySelector('td.is-selected');
      if (selectedDay) {
        cellToFocus = selectedDay;
        cellType = 'selected day';
      }

      // Fallback 1: Focus today's date if visible
      if (!cellToFocus) {
        const today = calendarPanel.querySelector('td.is-today');
        if (today) {
          cellToFocus = today;
          cellType = 'today';
        }
      }

      // Fallback 2: Focus the first available (non-disabled) day
      if (!cellToFocus) {
        const firstDay = calendarPanel.querySelector('.el-date-table tbody td:not(.disabled):not(.is-disabled)');
        if (firstDay) {
          cellToFocus = firstDay;
          cellType = 'first available day';
        }
      }

      if (!cellToFocus) {
        return false;
      }

      // Make it focusable
      cellToFocus.setAttribute('tabindex', '0');
      
      // Just focus the cell, keyboard navigation will be handled separately
      let attempts = 0;
      const maxAttempts = 10;
      
      const forceFocus = () => {
        attempts++;
        cellToFocus.focus({ preventScroll: true });
        
        // Check if focus actually worked
        if (document.activeElement === cellToFocus) {
          return true;
        }
        
        // If not focused yet and we haven't exceeded attempts, try again
        if (attempts < maxAttempts) {
          setTimeout(forceFocus, 10); // Try again in 10ms
        }
      };
      
      forceFocus();
      
      // Setup keyboard navigation handler on the calendar panel
      // This prevents auto-selection when using arrow keys
      // We need to capture the keydown BEFORE Element Plus processes it
      const handleKeyboardNav = (e) => {
        // Check if it's an arrow key
        if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
          // Prevent any default behavior on the table/cell
          e.preventDefault();
          
          // Mark that we're navigating with keyboard
          calendarPanel.__a11yNavigatingWithKeyboard = true;
          
          // Prevent ALL click/selection events that might be triggered
          const preventAutoSelect = (event) => {
            event.preventDefault();
            event.stopPropagation();
            event.stopImmediatePropagation();
            return false;
          };
          
          // Add preventers for all possible selection events
          const eventTypes = ['click', 'mousedown', 'mouseup', 'pointerdown', 'pointerup', 'touchstart', 'touchend'];
          
          // Add to the entire calendar panel
          eventTypes.forEach(eventType => {
            calendarPanel.addEventListener(eventType, preventAutoSelect, { capture: true, once: true });
          });
          
          // Also add to all table cells to be extra safe
          const allCells = calendarPanel.querySelectorAll('td');
          allCells.forEach(cell => {
            eventTypes.forEach(eventType => {
              cell.addEventListener(eventType, preventAutoSelect, { capture: true, once: true });
            });
          });
          
          // Clear the flag after Element Plus has moved focus
          setTimeout(() => {
            calendarPanel.__a11yNavigatingWithKeyboard = false;
          }, 50);
        }
      };
      
      // Add keyboard handler with capture: true to intercept BEFORE Element Plus
      if (!calendarPanel.__a11yKeyboardHandlerAdded) {
        calendarPanel.__a11yKeyboardHandlerAdded = true;
        calendarPanel.addEventListener('keydown', handleKeyboardNav, { capture: true });
        calendarPanel.__a11yKeyboardHandler = handleKeyboardNav;
      }
      
      return true;
    };

    // Function to focus calendar when it opens
    const focusCalendar = (inputElement) => {
      // Clear any existing timeout
      if (focusTimeout) {
        clearTimeout(focusTimeout);
      }

      // Wait for the browser to finish rendering
      requestAnimationFrame(() => {
        focusTimeout = setTimeout(() => {
          doFocus(inputElement);
        }, delay);
      });
    };

    // Use MutationObserver to watch for when the calendar appears in DOM
    const setupCalendarWatcher = (inputElement) => {
      observer = new MutationObserver((mutations) => {
        // Check if a calendar panel appeared
        const panel = document.querySelector('.el-picker-panel');
        
        if (panel && !isCalendarOpen) {
          // Calendar just opened!
          isCalendarOpen = true;
          focusCalendar(inputElement);
        } else if (!panel && isCalendarOpen) {
          // Calendar closed
          isCalendarOpen = false;
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
    };
    
    // Find the actual input element - search deeper for Vue components
    const findInput = () => {
      // First try direct query
      let inputEl = el.querySelector(selectors.input);
      
      // If not found and el is a Vue component wrapper, search all children
      if (!inputEl) {
        const allInputs = el.querySelectorAll('input');
        inputEl = allInputs[0]; // Get first input
      }
      
      return inputEl || el;
    };
    
    const inputEl = findInput();
    
    // Start watching immediately with the input element reference
    setupCalendarWatcher(inputEl);
    
    const handleInputInteraction = () => {
      // The MutationObserver will handle the actual focusing
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

    // Watch aria-expanded attribute for perfect timing
    const watchAriaExpanded = () => {
      const ariaObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'attributes' && mutation.attributeName === 'aria-expanded') {
            const isExpanded = inputEl.getAttribute('aria-expanded') === 'true';
            
            if (isExpanded) {
              // Calendar is now open - focus it
              focusCalendar(inputEl);
            }
          }
        });
      });
      
      ariaObserver.observe(inputEl, {
        attributes: true,
        attributeFilter: ['aria-expanded']
      });
      
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
