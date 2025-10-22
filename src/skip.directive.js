/**
 * v-a11y-skip
 * Skip elements from keyboard navigation and screen readers
 * 
 * Usage:
 *   v-a11y-skip                        // Always skip
 *   v-a11y-skip="true"                 // Skip when true
 *   v-a11y-skip="item.disabled"        // Skip based on condition
 *   v-a11y-skip="item.id === selectedId" // Skip when condition matches
 * 
 * Features:
 * - Removes from tab order (tabindex="-1")
 * - Hides from screen readers (aria-hidden="true")
 * - Adds visual indication (optional)
 * - Can be toggled dynamically
 */

export default {
  mounted(el, binding) {
    updateSkipState(el, binding);
  },

  updated(el, binding) {
    updateSkipState(el, binding);
  },

  unmounted(el) {
    // Clean up stored values
    delete el.__a11ySkipOriginalTabIndex;
    delete el.__a11ySkipOriginalAriaHidden;
    delete el.__a11ySkipChildrenState;
  }
};

function updateSkipState(el, binding) {
  // Determine if element should be skipped
  // If no value provided, default to true (always skip)
  const shouldSkip = binding.value === undefined ? true : !!binding.value;

  if (shouldSkip) {
    // Store original values on first skip
    if (el.__a11ySkipOriginalTabIndex === undefined) {
      el.__a11ySkipOriginalTabIndex = el.getAttribute('tabindex');
    }
    if (el.__a11ySkipOriginalAriaHidden === undefined) {
      el.__a11ySkipOriginalAriaHidden = el.getAttribute('aria-hidden');
    }

    // Apply skip attributes
    el.setAttribute('tabindex', '-1');
    el.setAttribute('aria-hidden', 'true');
    
    // Add data attribute for CSS targeting
    el.setAttribute('data-a11y-skip', 'true');
    
    // Disable all focusable children (buttons, links, inputs, etc.)
    const focusableElements = el.querySelectorAll(
      'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    if (!el.__a11ySkipChildrenState) {
      el.__a11ySkipChildrenState = [];
    }
    
    focusableElements.forEach((child, index) => {
      // Store original state if not already stored
      if (!el.__a11ySkipChildrenState[index]) {
        el.__a11ySkipChildrenState[index] = {
          tabIndex: child.getAttribute('tabindex'),
          disabled: child.disabled
        };
      }
      
      // Disable the element
      child.setAttribute('tabindex', '-1');
      if ('disabled' in child) {
        child.disabled = true;
      }
    });
    
    // Optional: Add pointer-events none to prevent interaction
    if (binding.modifiers.noInteraction) {
      el.style.pointerEvents = 'none';
    }
    
    // Optional: Add visual indication
    if (binding.modifiers.visual) {
      el.style.opacity = '0.5';
      el.style.filter = 'grayscale(100%)';
      el.style.pointerEvents = 'none'; // Also block interactions with visual modifier
    }
  } else {
    // Restore original state
    if (el.__a11ySkipOriginalTabIndex !== undefined) {
      if (el.__a11ySkipOriginalTabIndex === null) {
        el.removeAttribute('tabindex');
      } else {
        el.setAttribute('tabindex', el.__a11ySkipOriginalTabIndex);
      }
    } else {
      el.removeAttribute('tabindex');
    }

    if (el.__a11ySkipOriginalAriaHidden !== undefined) {
      if (el.__a11ySkipOriginalAriaHidden === null) {
        el.removeAttribute('aria-hidden');
      } else {
        el.setAttribute('aria-hidden', el.__a11ySkipOriginalAriaHidden);
      }
    } else {
      el.removeAttribute('aria-hidden');
    }

    el.removeAttribute('data-a11y-skip');
    
    // Restore focusable children
    const focusableElements = el.querySelectorAll(
      'a, button, input, select, textarea, [tabindex]'
    );
    
    if (el.__a11ySkipChildrenState) {
      focusableElements.forEach((child, index) => {
        const originalState = el.__a11ySkipChildrenState[index];
        if (originalState) {
          // Restore tabindex
          if (originalState.tabIndex === null) {
            child.removeAttribute('tabindex');
          } else {
            child.setAttribute('tabindex', originalState.tabIndex);
          }
          
          // Restore disabled state
          if ('disabled' in child) {
            child.disabled = originalState.disabled;
          }
        }
      });
    }
    
    // Remove optional modifiers
    if (binding.modifiers.noInteraction) {
      el.style.pointerEvents = '';
    }
    
    if (binding.modifiers.visual) {
      el.style.opacity = '';
      el.style.filter = '';
      el.style.pointerEvents = '';
    }
  }
}
