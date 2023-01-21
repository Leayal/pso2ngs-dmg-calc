/**
 * Shared string instance?
 * As well as easier to edit later.
 */
const STRINGPLACEHOLDER_UIPSO2AbilitySelect = "<Select Special Ability>";

/**
 * Mark-up class to manage elements regarding <select> with pso2 ability options.
 */
class UIPSO2AbilitySelect extends UIPSO2Element {
  /** @private @readonly @type {UIPSO2AbilityDatalist} */
  __datalist__;

  /**
   * Creates a new selector and associates the newly created selector to a datalist.
   * @param {UIPSO2AbilityDatalist=} datalist The datalist for this input markup. If not specified, use {@link UIPSO2AbilityDatalist}.default.
   */
  constructor(datalist) {
    if (datalist === undefined) datalist = UIPSO2AbilityDatalist.default;
    if (!(datalist instanceof UIPSO2AbilityDatalist)) {
      throw new TypeError(
        "'datalist' must be an instance of UIPSO2AbilityDatalist"
      );
    }
    const element = document.createElement("input");
    element.type = "text";
    element.setAttribute("list", datalist.getId());
    element.placeholder = STRINGPLACEHOLDER_UIPSO2AbilitySelect;
    super(element);
    Object.defineProperty(this, "__datalist__", {
      configurable: false,
      enumerable: false,
      value: datalist,
      writable: false,
    });
  }

  /**
   * Appends this markup element to the DOM tree of the specific element.
   * @param {(HTMLElement|jQuery)} element The DOM element to append to.
   * @override
   */
  appendTo(element) {
    if (!this.__datalist__.element.parentNode) {
      this.__datalist__.appendTo(element);
    }
    super.appendTo(element);
  }
}
