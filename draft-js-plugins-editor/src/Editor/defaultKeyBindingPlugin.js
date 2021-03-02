import { getDefaultKeyBinding } from '@wix/draft-js';

/**
 * Handle default key bindings.
 *
 * @param {Event} event
 * @return {String} defaultCommand
 */
export function keyBindingFn(event) {
  return getDefaultKeyBinding(event);
}
