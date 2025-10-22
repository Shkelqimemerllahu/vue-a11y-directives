/**
 * v-a11y-focus
 * Auto-focus directive with optional delay
 * Automatically makes non-focusable elements focusable
 * 
 * Usage:
 *   v-a11y-focus
 *   v-a11y-focus="200"  // with delay in ms
 *   v-a11y-focus="{ delay: 200, select: true }"  // focus and select text
 */

const FOCUSABLE_TAGS = ['BUTTON', 'A', 'INPUT', 'TEXTAREA', 'SELECT', 'IFRAME'];

export default {
  mounted(el, binding) {
    const config = typeof binding.value === 'object' ? binding.value : { delay: binding.value || 0 };
    const delay = config.delay || 0;
    const selectText = config.select || false;

    // Check if element is naturally focusable
    const isNaturallyFocusable = 
      FOCUSABLE_TAGS.includes(el.tagName) ||
      el.hasAttribute('tabindex') ||
      el.hasAttribute('contenteditable');

    // If not focusable, make it focusable by adding tabindex
    if (!isNaturallyFocusable) {
      el.setAttribute('tabindex', '0');
      el.__a11yFocusAddedTabindex = true; // Track that we added it
    }

    setTimeout(() => {
      if (el.focus) {
        el.focus();
        
        // Select text for input/textarea
        if (selectText && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA')) {
          el.select();
        }
      }
    }, delay);
  },

  unmounted(el) {
    // Clean up tabindex if we added it
    if (el.__a11yFocusAddedTabindex) {
      el.removeAttribute('tabindex');
      delete el.__a11yFocusAddedTabindex;
    }
  }
};
