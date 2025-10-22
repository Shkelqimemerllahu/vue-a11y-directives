/**
 * v-a11y-keyboard
 * Enhanced keyboard navigation support
 * 
 * Usage:
 *   v-a11y-keyboard="{ enter: handleEnter, escape: handleEscape, arrowUp: handleUp }"
 *   v-a11y-keyboard="{ handlers: { 'ArrowLeft': handleLeft, 'Ctrl+s': handleSave } }"
 *   v-a11y-keyboard="{ arrows: handleArrows }"
 */

export default {
  mounted(el, binding) {
    const config = binding.value || {};
    console.log('Keyboard directive mounted with config:', config);
    
    const handleKeydown = (e) => {
      console.log('Key pressed:', e.key, 'Config:', config);
      
      // Check for direct key handlers first
      const keyMappings = {
        'Enter': 'enter',
        ' ': 'space',
        'Escape': 'escape',
        'ArrowUp': 'arrowUp',
        'ArrowDown': 'arrowDown',
        'ArrowLeft': 'arrowLeft',
        'ArrowRight': 'arrowRight',
        'Tab': 'tab',
        'Delete': 'delete',
        'Backspace': 'backspace'
      };
      
      // Handle modifier combinations
      let keyCombo = '';
      if (e.ctrlKey || e.metaKey) keyCombo += 'ctrl+';
      if (e.altKey) keyCombo += 'alt+';
      if (e.shiftKey) keyCombo += 'shift+';
      keyCombo += e.key.toLowerCase();
      
      // Check for direct key handlers
      const mappedKey = keyMappings[e.key];
      if (mappedKey && typeof config[mappedKey] === 'function') {
        e.preventDefault();
        config[mappedKey](e);
        return;
      }
      
      // Check for key combination handlers
      if (config[keyCombo] && typeof config[keyCombo] === 'function') {
        e.preventDefault();
        config[keyCombo](e);
        return;
      }
      
      // Check for raw key handlers (w, a, s, d, etc.)
      if (config[e.key] && typeof config[e.key] === 'function') {
        e.preventDefault();
        config[e.key](e);
        return;
      }
      
      // Handle arrow keys with general arrows handler
      if (config.arrows && ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        if (typeof config.arrows === 'function') {
          e.preventDefault();
          config.arrows(e);
          return;
        }
      }
      
      // Handle custom handlers object
      if (config.handlers) {
        if (config.handlers[e.key] && typeof config.handlers[e.key] === 'function') {
          e.preventDefault();
          config.handlers[e.key](e);
          return;
        }
        if (config.handlers[keyCombo] && typeof config.handlers[keyCombo] === 'function') {
          e.preventDefault();
          config.handlers[keyCombo](e);
          return;
        }
      }
      
      // Handle custom key handler (captures all keys)
      if (config.custom && typeof config.custom === 'function') {
        config.custom(e);
        return;
      }
      
      // Legacy: Enter key - trigger click if config.enter is true (not a function)
      if (config.enter === true && e.key === 'Enter' && !['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) {
        e.preventDefault();
        if (el.click) el.click();
      }
      
      // Legacy: Space key - trigger click for buttons/links
      if (config.space === true && e.key === ' ' && ['BUTTON', 'A'].includes(el.tagName)) {
        e.preventDefault();
        if (el.click) el.click();
      }
    };

    el.addEventListener('keydown', handleKeydown);
    el.__keyboardHandler = handleKeydown;
  },

  unmounted(el) {
    if (el.__keyboardHandler) {
      el.removeEventListener('keydown', el.__keyboardHandler);
      delete el.__keyboardHandler;
    }
  }
};
