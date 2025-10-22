import { announce } from './helpers';

/**
 * v-a11y-announce
 * Screen reader announcements
 * 
 * Usage:
 *   v-a11y-announce="'Item added to cart'"
 *   v-a11y-announce="{ message: 'Error occurred', priority: 'assertive' }"
 */

export default {
  mounted(el, binding) {
    if (!binding.value) return;
    
    const config = typeof binding.value === 'string' 
      ? { message: binding.value, priority: 'polite' }
      : binding.value;

    if (config && config.message) {
      announce(config.message, config.priority || 'polite');
    }
  },

  updated(el, binding) {
    // Only announce on value change
    if (binding.value !== binding.oldValue && binding.value) {
      const config = typeof binding.value === 'string' 
        ? { message: binding.value, priority: 'polite' }
        : binding.value;

      if (config && config.message) {
        announce(config.message, config.priority || 'polite');
      }
    }
  }
};
