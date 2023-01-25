/**
 * Shared string instance?
 * As well as easier to edit later.
 */
const STRINGPLACEHOLDER_UIPSO2AbilitySelect = "<No Special Ability>";

/**
 * Mark-up class to manage elements regarding <select> with pso2 ability options.
 */
class UIPSO2AbilitySelect extends UIPSO2Element {
  /** @private @readonly @type {UIPSO2AbilitySelectPopup} */
  __datalist__;
  /** @private @readonly @type {HTMLInputElement} */
  __input__;

  /** @private @readonly @type {onPopupGenericEventCallback} @this {UIPSO2AbilitySelect}  */
  static onDropdownShowing = function (sender, ev) {
    const list = sender,
      val = this.__input__.value;
    list.inputElement.value = "";
    if (val) {
      list.selectedItem = val;
    } else {
      list.deselectItem();
      list.itemsElement.firstElementChild?.focus({
        preventScroll: false,
      });
    }
  };

  /** @private @readonly @type {onPopupGenericEventCallback} @this {UIPSO2AbilitySelect}  */
  static onDropdownShown = function (sender, ev) {
    const selectedelement = sender.selectedElement;
    if (selectedelement) {
      /*
        selectedelement.offsetParent.scrollTo({
          top: selectedelement.scrollTop,
        });
        */
      selectedelement.focus({
        preventScroll: false,
      });
    } else {
      sender.itemsElement.firstElementChild?.focus({
        preventScroll: false,
      });
    }
  };

  /** @private @readonly @this {UIPSO2AbilitySelect} @type {UIPSO2AbilitySelectPopup_SelectionCallback} */
  static onDropdownSelection = function (sender, args) {
    this.__input__.value = `${args.ability.name} ${args.level}`;
  };

  /**
   * Creates a new selector and associates the newly created selector to a datalist.
   * @param {UIPSO2AbilitySelectPopup=} datalist The datalist for this input markup. If not specified, use {@link UIPSO2AbilitySelectPopup}.default.
   */
  constructor(datalist) {
    if (datalist === undefined) datalist = UIPSO2AbilitySelectPopup.default;
    if (!(datalist instanceof UIPSO2AbilitySelectPopup)) {
      throw new TypeError(
        "'datalist' must be an instance of UIPSO2AbilitySelectPopup"
      );
    }

    const root = document.createElement("div"),
      input = document.createElement("input"),
      btn = document.createElement("button");

    root.classList.add("input-group");

    input.type = "text";
    input.readOnly = true;
    input.placeholder = STRINGPLACEHOLDER_UIPSO2AbilitySelect;
    root.appendChild(input);

    btn.classList.add("btn", "btn-outline-secondary", "dropdown-toggle");
    root.appendChild(btn);

    super(root);

    const callbackHub = datalist.register(btn);
    callbackHub.onPopupShowing =
      UIPSO2AbilitySelect.onDropdownShowing.bind(this);
    callbackHub.onPopupShown = UIPSO2AbilitySelect.onDropdownShown.bind(this);
    callbackHub.onSelection =
      UIPSO2AbilitySelect.onDropdownSelection.bind(this);

    // btn.addEventListener("click", UIPSO2AbilitySelect.onDropdownTrigger.bind(this));

    Object.defineProperties(this, {
      __input__: {
        configurable: false,
        enumerable: false,
        value: input,
        writable: false,
      },
      __datalist__: {
        configurable: false,
        enumerable: false,
        value: datalist,
        writable: false,
      },
    });
  }
}
