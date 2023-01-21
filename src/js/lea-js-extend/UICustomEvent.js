/**
 * @callback LeaEventCallback
 * @param {object} sender The object dispatched the event.
 * @param {object} eventArgs The object containing parameters of the dispatched the event.
 */

/**
 * A custom event handler to deal with.
 */
class LeaEventHandler {
  /** @private @type {Set<LeaEventCallback>} */
  __eventcallback__;
  /** @private */
  __sender__;

  /**
   * Creates a new event handler instance.
   * @param {any} senderObj The event sender to bind.
   */
  constructor(senderObj) {
    Object.defineProperty(this, "__sender__", {
      configurable: false,
      enumerable: false,
      value: senderObj,
      writable: false,
    });
  }

  /**
   * Registers an event listener. In case the callback was already registered before, do nothing, meaning no callback duplication possible.
   * @param {LeaEventCallback} callback The callback which will be invoked when the event is dispatched.
   */
  register(callback) {
    // Lazy init.
    /** @type {Set<LeaEventCallback>} */
    const callbackList =
      this.__eventcallback__ instanceof Set
        ? this.__eventcallback__
        : (this.__eventcallback__ = new Set());
    callbackList.add(callback);
  }

  /**
   * Unregisters an event listener. In case the callback hasn't been registered before, do nothing, meaning no-op.
   * @param {LeaEventCallback} callback The callback which will be unregistered.
   * @returns {boolean} Returns true if the callback is found and is unregistered. Otherwise, false.
   */
  unregister(callback) {
    if (!(this.__eventcallback__ instanceof Set)) return false;
    return this.__eventcallback__.delete(callback);
  }

  /**
   * Unregisters all event listeners. In case there are no callbacks registered before, do nothing, meaning no-op.
   */
  unregisterAll() {
    if (!(this.__eventcallback__ instanceof Set)) return;
    this.__eventcallback__.clear();
  }

  /**
   * Dispatch the event with the 'eventArgs' object to all the registered event handlers. If there's no event handlers registered, do nothing, meaning no-op.
   * @param {object} eventArgs The event arguments to be passed to the registered handlers.
   * @returns {boolean} Returns true if there are any event handlers which are dispatched. Otherwise, false.
   */
  invoke(eventArgs) {
    if (
      !(this.__eventcallback__ instanceof Set) ||
      this.__eventcallback__.size === 0
    )
      return false;
    for (const handler of this.__eventcallback__.values()) {
      handler.call(this.__sender__, this.__sender__, eventArgs);
    }
    return true;
  }
}
