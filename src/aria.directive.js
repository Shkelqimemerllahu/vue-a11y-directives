import { setAriaAttributes } from './helpers';

/**
 * v-a11y-aria
 * Easy way to set multiple ARIA attributes
 * 
 * Usage:
 *   v-a11y-aria="{ label: 'Close dialog', expanded: true, controls: 'menu-1' }"
 */

export default {
  mounted(el, binding) {
    const attributes = binding.value || {};
    
    // Convert shorthand to full ARIA attributes
    const ariaMap = {
      label: 'aria-label',
      labelledby: 'aria-labelledby',
      describedby: 'aria-describedby',
      expanded: 'aria-expanded',
      pressed: 'aria-pressed',
      selected: 'aria-selected',
      checked: 'aria-checked',
      disabled: 'aria-disabled',
      hidden: 'aria-hidden',
      invalid: 'aria-invalid',
      required: 'aria-required',
      live: 'aria-live',
      atomic: 'aria-atomic',
      busy: 'aria-busy',
      controls: 'aria-controls',
      owns: 'aria-owns',
      haspopup: 'aria-haspopup',
      level: 'aria-level',
      modal: 'aria-modal',
      multiselectable: 'aria-multiselectable',
      orientation: 'aria-orientation',
      placeholder: 'aria-placeholder',
      readonly: 'aria-readonly',
      relevant: 'aria-relevant',
      valuemax: 'aria-valuemax',
      valuemin: 'aria-valuemin',
      valuenow: 'aria-valuenow',
      valuetext: 'aria-valuetext'
    };

    const ariaAttributes = {};
    Object.entries(attributes).forEach(([key, value]) => {
      const ariaKey = ariaMap[key] || key;
      ariaAttributes[ariaKey] = value;
    });

    setAriaAttributes(el, ariaAttributes);
    el.__ariaAttributes = Object.keys(ariaAttributes);
  },

  updated(el, binding) {
    if (JSON.stringify(binding.value) !== JSON.stringify(binding.oldValue)) {
      // Remove old attributes
      if (el.__ariaAttributes) {
        el.__ariaAttributes.forEach(attr => el.removeAttribute(attr));
      }

      // Set new attributes
      const attributes = binding.value || {};
      const ariaMap = {
        label: 'aria-label',
        labelledby: 'aria-labelledby',
        describedby: 'aria-describedby',
        expanded: 'aria-expanded',
        pressed: 'aria-pressed',
        selected: 'aria-selected',
        checked: 'aria-checked',
        disabled: 'aria-disabled',
        hidden: 'aria-hidden',
        invalid: 'aria-invalid',
        required: 'aria-required',
        live: 'aria-live',
        atomic: 'aria-atomic',
        busy: 'aria-busy',
        controls: 'aria-controls',
        owns: 'aria-owns',
        haspopup: 'aria-haspopup',
        level: 'aria-level',
        modal: 'aria-modal'
      };

      const ariaAttributes = {};
      Object.entries(attributes).forEach(([key, value]) => {
        const ariaKey = ariaMap[key] || key;
        ariaAttributes[ariaKey] = value;
      });

      setAriaAttributes(el, ariaAttributes);
      el.__ariaAttributes = Object.keys(ariaAttributes);
    }
  },

  unmounted(el) {
    if (el.__ariaAttributes) {
      el.__ariaAttributes.forEach(attr => el.removeAttribute(attr));
      delete el.__ariaAttributes;
    }
  }
};
