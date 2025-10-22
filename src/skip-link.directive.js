/**
 * v-a11y-skip-link
 * Create skip navigation links
 * 
 * Usage:
 *   v-a11y-skip-link="'#main-content'"
 */

export default {
  mounted(el, binding) {
    const targetSelector = binding.value;

    const handleClick = (e) => {
      e.preventDefault();
      const target = document.querySelector(targetSelector);
      
      if (target) {
        // Make target focusable if it's not
        if (!target.hasAttribute('tabindex')) {
          target.setAttribute('tabindex', '-1');
        }
        
        target.focus();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

    el.addEventListener('click', handleClick);
    el.__skipLinkHandler = handleClick;
    
    // Add appropriate ARIA attributes
    el.setAttribute('role', 'link');
    if (targetSelector) {
      el.setAttribute('aria-label', `Skip to ${targetSelector.replace('#', '')}`);
    }
  },

  unmounted(el) {
    if (el.__skipLinkHandler) {
      el.removeEventListener('click', el.__skipLinkHandler);
      delete el.__skipLinkHandler;
    }
  }
};
