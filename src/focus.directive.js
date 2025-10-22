/**
 * v-a11y-focus
 * Auto-focus directive with optional delay
 * 
 * Usage:
 *   v-a11y-focus
 *   v-a11y-focus="200"  // with delay in ms
 *   v-a11y-focus="{ delay: 200, select: true }"  // focus and select text
 */

export default {
  mounted(el, binding) {
    const config = typeof binding.value === 'object' ? binding.value : { delay: binding.value || 0 };
    const delay = config.delay || 0;
    const selectText = config.select || false;

    setTimeout(() => {
      if (el.focus) {
        el.focus();
        
        // Select text for input/textarea
        if (selectText && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA')) {
          el.select();
        }
      }
    }, delay);
  }
};
