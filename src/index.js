/**
 * Vue Accessibility (a11y) Directives
 * A comprehensive collection of Vue 3 directives for web accessibility
 * 
 * @author Your Name
 * @version 1.0.0
 */

import focusDirective from './focus.directive';
import trapFocusDirective from './trap-focus.directive';
import keyboardDirective from './keyboard.directive';
import announceDirective from './announce.directive';
import skipLinkDirective from './skip-link.directive';
import skipDirective from './skip.directive';
import ariaDirective from './aria.directive';

// Export individual directives
export {
  focusDirective,
  trapFocusDirective,
  keyboardDirective,
  announceDirective,
  skipLinkDirective,
  skipDirective,
  ariaDirective
};

// Export helpers
export * from './helpers';

// Collection of all directives
export const a11yDirectives = {
  'a11y-focus': focusDirective,
  'a11y-trap-focus': trapFocusDirective,
  'a11y-keyboard': keyboardDirective,
  'a11y-announce': announceDirective,
  'a11y-skip-link': skipLinkDirective,
  'a11y-skip': skipDirective,
  'a11y-aria': ariaDirective
};

/**
 * Install all directives globally
 * @param {App} app - Vue app instance
 */
export function installA11yDirectives(app) {
  Object.entries(a11yDirectives).forEach(([name, directive]) => {
    app.directive(name, directive);
  });
}

/**
 * Default export for plugin-style installation
 */
export default {
  install: installA11yDirectives
};
