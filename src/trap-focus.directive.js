import { getFocusableElements } from './helpers';

/**
 * v-a11y-trap-focus
 * Trap focus within an element (useful for modals, dialogs)
 * 
 * Usage:
 *   v-a11y-trap-focus
 *   v-a11y-trap-focus="{ autoFocus: true }"
 *   v-a11y-trap-focus="{ autoFocus: true, onEscape: closeModal }"
 */

export default {
  mounted(el, binding) {
    const config = binding.value || {};
    const autoFocus = config.autoFocus !== false; // default true
    const onEscape = config.onEscape || null; // callback for escape key
    
    // Save the element that had focus before
    const previousFocus = document.activeElement;
    el.__previousFocus = previousFocus;

    // Auto-focus first element if enabled
    if (autoFocus) {
      setTimeout(() => {
        const focusable = getFocusableElements(el);
        if (focusable.length > 0) {
          focusable[0].focus();
        }
      }, 100);
    }

    // Handle Tab key to trap focus and Escape to close
    const handleKeydown = (e) => {
      // Handle Escape key
      if (e.key === 'Escape' && onEscape) {
        e.preventDefault();
        e.stopPropagation();
        onEscape();
        return;
      }

      // Handle Tab key
      if (e.key !== 'Tab') return;

      const focusable = getFocusableElements(el);
      if (focusable.length === 0) return;

      const firstFocusable = focusable[0];
      const lastFocusable = focusable[focusable.length - 1];

      // Shift + Tab on first element -> go to last
      if (e.shiftKey && document.activeElement === firstFocusable) {
        e.preventDefault();
        lastFocusable.focus();
      }
      // Tab on last element -> go to first
      else if (!e.shiftKey && document.activeElement === lastFocusable) {
        e.preventDefault();
        firstFocusable.focus();
      }
    };

    el.addEventListener('keydown', handleKeydown);
    el.__handleKeydown = handleKeydown;
  },

  unmounted(el) {
    // Remove event listener
    if (el.__handleKeydown) {
      el.removeEventListener('keydown', el.__handleKeydown);
      delete el.__handleKeydown;
    }

    // Restore focus to previous element
    if (el.__previousFocus) {
      setTimeout(() => {
        // Check if element still exists in DOM and has focus method
        if (el.__previousFocus && 
            document.body.contains(el.__previousFocus) && 
            typeof el.__previousFocus.focus === 'function') {
          try {
            el.__previousFocus.focus();
          } catch (e) {
            // Silently fail if focus cannot be restored
            console.warn('Could not restore focus:', e);
          }
        }
      }, 0);
      delete el.__previousFocus;
    }
  }
};
