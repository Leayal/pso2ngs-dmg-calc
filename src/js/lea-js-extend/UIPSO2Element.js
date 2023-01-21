/**
 * Abstract mark-up class.
 * @abstract
 */
class UIPSO2Element {
  /**
   * @protected
   * @readonly
   * @type {HTMLElement}
   */
  element;

  /**
   * Sets the {@link HTMLElement} to be the base of this mark-up instance.
   * @param {HTMLElement} element
   */
  constructor(element) {
    Object.defineProperty(this, "element", {
      configurable: false,
      enumerable: true,
      value: element,
      writable: false,
    });
  }

  /**
   * Appends this markup element to the DOM tree of the specific element.
   * @param {(HTMLElement|jQuery)} element The DOM element to append to.
   */
  appendTo(element) {
    if (element instanceof HTMLElement) {
      element.appendChild(this.element);
    } else if (element instanceof jQuery) {
      element.append(this.element);
    } else {
      throw new TypeError(
        "The 'element' must be either HTMLElement or jQuery object"
      );
    }
  }
}
