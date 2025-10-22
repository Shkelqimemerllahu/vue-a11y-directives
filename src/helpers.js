/**
 * Accessibility Helper Functions
 * Reusable utilities for a11y directives
 */

/**
 * Get all focusable elements within a container
 * @param {HTMLElement} element - Container element
 * @returns {HTMLElement[]} Array of focusable elements
 */
export function getFocusableElements(element) {
  if (!element) return [];

  const focusableSelectors = [
    'a[href]',
    'button:not([disabled])',
    'textarea:not([disabled])',
    'input:not([disabled]):not([type="hidden"])',
    'select:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
    '[contenteditable="true"]',
    'audio[controls]',
    'video[controls]'
  ];

  const elements = Array.from(element.querySelectorAll(focusableSelectors.join(', ')));
  
  return elements.filter(el => {
    // Check if element is visible
    const style = window.getComputedStyle(el);
    return (
      el.offsetWidth > 0 &&
      el.offsetHeight > 0 &&
      style.visibility !== 'hidden' &&
      style.display !== 'none'
    );
  });
}

/**
 * Set ARIA attributes on an element
 * @param {HTMLElement} element
 * @param {Object} attributes - Key-value pairs of ARIA attributes
 */
export function setAriaAttributes(element, attributes) {
  Object.entries(attributes).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      element.setAttribute(key, value);
    }
  });
}

/**
 * Remove ARIA attributes from an element
 * @param {HTMLElement} element
 * @param {string[]} attributes - Array of attribute names
 */
export function removeAriaAttributes(element, attributes) {
  attributes.forEach(attr => {
    element.removeAttribute(attr);
  });
}

/**
 * Create a live region for screen reader announcements
 * @param {string} message - Message to announce
 * @param {string} priority - 'polite' or 'assertive'
 */
export function announce(message, priority = 'polite') {
  const liveRegion = document.createElement('div');
  liveRegion.setAttribute('role', 'status');
  liveRegion.setAttribute('aria-live', priority);
  liveRegion.setAttribute('aria-atomic', 'true');
  liveRegion.style.position = 'absolute';
  liveRegion.style.left = '-10000px';
  liveRegion.style.width = '1px';
  liveRegion.style.height = '1px';
  liveRegion.style.overflow = 'hidden';

  document.body.appendChild(liveRegion);

  // Small delay to ensure screen reader picks it up
  setTimeout(() => {
    liveRegion.textContent = message;
  }, 100);

  // Clean up after announcement
  setTimeout(() => {
    document.body.removeChild(liveRegion);
  }, 3000);
}

/**
 * Get first focusable element
 * @param {HTMLElement} element
 * @returns {HTMLElement|null}
 */
export function getFirstFocusable(element) {
  const focusable = getFocusableElements(element);
  return focusable.length > 0 ? focusable[0] : null;
}

/**
 * Get last focusable element
 * @param {HTMLElement} element
 * @returns {HTMLElement|null}
 */
export function getLastFocusable(element) {
  const focusable = getFocusableElements(element);
  return focusable.length > 0 ? focusable[focusable.length - 1] : null;
}

/**
 * Check if element contains the active element
 * @param {HTMLElement} element
 * @returns {boolean}
 */
export function containsActiveElement(element) {
  return element.contains(document.activeElement);
}

/**
 * Save the currently focused element
 * @returns {HTMLElement|null}
 */
export function saveFocus() {
  return document.activeElement;
}

/**
 * Restore focus to a previously saved element
 * @param {HTMLElement} element
 */
export function restoreFocus(element) {
  if (element && element.focus) {
    element.focus();
  }
}

/**
 * Generate a unique ID
 * @param {string} prefix
 * @returns {string}
 */
export function generateId(prefix = 'a11y') {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
}
