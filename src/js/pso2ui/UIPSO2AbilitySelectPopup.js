/**
 * @callback InputTextChanged
 * @param {KeyboardEvent} ev Keyboard event argument.
 *
 * @callback Selecting
 * @param {MouseEvent} ev Click event argument.
 *
 * @callback FocusEventCallback
 * @param {FocusEvent} ev Focus event argument.
 *
 * @typedef UIPSO2AbilitySelectPopup_SelectionEventArgs
 * @property {SpecialAbilityData} ability The special ability that has been selected.
 * @property {string} level The level name of the special ability.
 *
 * @callback UIPSO2AbilitySelectPopup_SelectionCallback
 * @param {UIPSO2AbilitySelectPopup} sender The object dispatched the event.
 * @param {UIPSO2AbilitySelectPopup_SelectionEventArgs} eventArgs The object dispatched the event.
 *
 * @callback SuppressedBootstrapUIEvent
 * @this {[UIPSO2AbilitySelectPopup, HtmlElement]}
 * @param {Event} ev
 *
 * @callback onPopupGenericEventCallback
 * @param {UIPSO2AbilitySelectPopup} sender
 * @param {Event} ev
 *
 * @typedef UIPSO2AbilitySelectPopupCallbacksHub
 * @property {UIPSO2AbilitySelectPopup_SelectionCallback=} onSelection The callback which will be invoked when an ability selection occured.
 * @property {onPopupGenericEventCallback=} onPopupShowing The callback which will be invoked when the popup is initialized and is showing up (but before the showing animation ends).
 * @property {onPopupGenericEventCallback=} onPopupShown The callback which will be invoked when the popup is shown up (after the showing animation ends).
 *
 * @typedef RegisteredTriggerObject
 * @property {Function} eShowing
 * @property {Function} eShown
 * @property {Function} eHiding
 * @property {Function} eTriggering
 * @property {Function} eBlurring
 * @property {UIPSO2AbilitySelectPopupCallbacksHub} callbackHub
 * @property {boolean} isShowing
 * @property {Object} controller
 */

/**
 * Mark-up class to manage elements regarding <select> with pso2 ability options.
 */
class UIPSO2AbilitySelectPopup extends UIPSO2Element {
  /** @constant @readonly @type {UIPSO2AbilitySelectPopup} */
  static __instance__;
  /** @returns {UIPSO2AbilitySelectPopup} Returns a default instance of {@link UIPSO2AbilitySelectPopup}. */
  static get default() {
    return UIPSO2AbilitySelectPopup.__instance__
      ? UIPSO2AbilitySelectPopup.__instance__
      : (UIPSO2AbilitySelectPopup.__instance__ =
          new UIPSO2AbilitySelectPopup());
  }

  /** @readonly @private @this {HTMLElement} */
  static tryGetAttribute = function (qualifiedName) {
    return this.getAttribute(qualifiedName) || "";
  };

  /** @readonly @type {InputTextChanged} @this {UIPSO2AbilitySelectPopup} */
  static onInputTextChanged = function (ev) {
    if (this.processingInput) return;
    this.processingInput = true;

    const input = this.__input__,
      val = input.value.toLowerCase(),
      items = this.__optionElements__;
    if (val) {
      if (items.length !== 0) {
        for (const theA of items.values()) {
          if (theA.textContent.toLowerCase().includes(val)) {
            theA.classList.remove("d-none");
          } else {
            theA.classList.add("d-none");
          }
        }
      }
    } else {
      if (items.length !== 0) {
        for (const theA of items.values()) theA.classList.remove("d-none");
      }
    }
    this.processingInput = false;
  };

  /** @readonly @type {Selecting} @this {UIPSO2AbilitySelectPopup} */
  static onSelecting = function (ev) {
    if (this.processingSelecting) return;
    this.processingSelecting = true;
    this.selectedElement = ev.target;
    this.processingSelecting = false;
  };

  /** @readonly @this {[UIPSO2AbilitySelectPopup, HtmlElement]} @param {MouseEvent} ev */
  static onTriggering = function (ev) {
    const [sender, target] = this;
    for (const [
      element,
      triggerObj,
    ] of sender.__registeredTriggers__.entries()) {
      if (Object.is(target, element)) {
        if (!triggerObj.isShowing) {
          triggerObj.controller.show();
        } else {
          triggerObj.controller.hide();
        }
      } else if (triggerObj.isShowing) {
        triggerObj.controller.hide();
      }
    }
  };

  /** @private @readonly @type {FocusEventCallback} @this {UIPSO2AbilitySelectPopup} */
  static onFocusCheck = function (ev) {
    if (!this.element.matches(":focus-within")) {
      for (const triggerObj of this.__registeredTriggers__.values()) {
        if (triggerObj.isShowing) {
          triggerObj.controller.hide();
        }
      }
    } else {
      ev.preventDefault();
    }
  };

  /** @readonly @this {[UIPSO2AbilitySelectPopup, HtmlElement]} @param {Event} ev */
  static onShowing = function (ev) {
    const [sender, element] = this;
    const registeredObj = sender.__registeredTriggers__.get(element);
    if (registeredObj && !registeredObj.isShowing) {
      registeredObj.isShowing = true;
      sender.__currentHub__ = registeredObj.callbackHub;
      sender.__input__.addEventListener("keyup", sender.__onInputTextChanged__);
      sender.__input__.addEventListener(
        "blur",
        sender.__onInputTextChanged__,
        true
      );
      sender.__list__.addEventListener("click", sender.__onSelecting__, true);
      sender.__list__.addEventListener("focusout", sender.__onFocusCheck__);
      if (typeof registeredObj.callbackHub.onPopupShowing === "function") {
        registeredObj.callbackHub.onPopupShowing(sender, ev);
      }
    }
  };

  /** @readonly @this {[UIPSO2AbilitySelectPopup, HtmlElement]} @param {Event} ev */
  static onShown = function (ev) {
    const [sender, element] = this;
    const registeredObj = sender.__registeredTriggers__.get(element);
    if (
      registeredObj &&
      // Still check "showing" state because the user may....cancel showing by close the popup before this callback invoked.
      registeredObj.isShowing &&
      typeof registeredObj.callbackHub.onPopupShown === "function"
    ) {
      registeredObj.callbackHub.onPopupShown(sender, ev);
    }
  };

  /** @readonly @this {[UIPSO2AbilitySelectPopup, HtmlElement]} @param {Event} ev */
  static onHiding = function (ev) {
    const [sender, element] = this;
    const registeredObj = sender.__registeredTriggers__.get(element);
    if (registeredObj) {
      registeredObj.isShowing = false;
    }
    sender.__input__.removeEventListener(
      "keyup",
      sender.__onInputTextChanged__
    );
    sender.__input__.removeEventListener(
      "blur",
      sender.__onInputTextChanged__,
      true
    );
    sender.__list__.removeEventListener("click", sender.__onSelecting__, true);
    sender.__list__.removeEventListener("focusout", sender.__onFocusCheck__);
    sender.__currentHub__ = null;
  };

  /** @private @readonly @type {Map<HTMLElement, RegisteredTriggerObject>} */
  __registeredTriggers__;
  /** @private @readonly @type {HTMLInputElement} */
  __input__;
  /** @private @readonly @type {HTMLUListElement} */
  __list__;
  /** @private @readonly @type {NodeListOf<HTMLAnchorElement>} */
  __optionElements__;
  /** @private @readonly @type {InputTextChanged} */
  __onInputTextChanged__;
  /** @private @readonly @type {UIPSO2AbilitySelectPopup_SelectionCallback} */
  __onSelecting__;
  /** @private @readonly */
  __onFocusCheck__;
  /** @private @type {UIPSO2AbilitySelectPopupCallbacksHub} */
  __currentHub__;

  constructor() {
    const root = document.createElement("div"),
      inputGroup = document.createElement("div"),
      inputGroup_span = document.createElement("span"),
      input = document.createElement("input"),
      separator = document.createElement("hr"),
      list = document.createElement("div");

    inputGroup.classList.add("input-group", "input-group-sm");

    inputGroup_span.classList.add("input-group-text");
    inputGroup_span.textContent = "Filter";
    inputGroup.appendChild(inputGroup_span);
    input.classList.add("form-control");
    input.placeholder = "<Filter by name>";
    input.type = "text";
    inputGroup.appendChild(input);

    separator.classList.add("dropdown-divider");

    list.classList.add("list-group", "pso2-ability-list-select");

    root.appendChild(inputGroup);
    root.appendChild(separator);
    root.appendChild(list);

    for (const abilityInfo of AbilityTable.abilities) {
      for (const opt of UIPSO2AbilitySelectPopup.createOptions(abilityInfo)) {
        list.appendChild(opt);
      }
    }

    super(root);

    Object.defineProperties(this, {
      __input__: {
        configurable: false,
        enumerable: false,
        value: input,
        writable: false,
      },
      __list__: {
        configurable: false,
        enumerable: false,
        value: list,
        writable: false,
      },
      __onInputTextChanged__: {
        configurable: false,
        enumerable: false,
        value: UIPSO2AbilitySelectPopup.onInputTextChanged.bind(this),
        writable: false,
      },
      __onSelecting__: {
        configurable: false,
        enumerable: false,
        value: UIPSO2AbilitySelectPopup.onSelecting.bind(this),
        writable: false,
      },
      __onFocusCheck__: {
        configurable: false,
        enumerable: false,
        value: UIPSO2AbilitySelectPopup.onFocusCheck.bind(this),
        writable: false,
      },
      __optionElements__: {
        configurable: false,
        enumerable: false,
        value: list.childNodes,
        writable: false,
      },
      register: {
        configurable: false,
        enumerable: true,
        value: this.register.bind(this),
        writable: false,
      },
      unregister: {
        configurable: false,
        enumerable: true,
        value: this.unregister.bind(this),
        writable: false,
      },
      deselectItem: {
        configurable: false,
        enumerable: true,
        value: this.deselectItem.bind(this),
        writable: false,
      },
      __registeredTriggers__: {
        configurable: false,
        enumerable: false,
        value: new Map(),
        writable: false,
      },
    });
  }

  deselectItem() {
    for (const theA of this.__optionElements__.values()) {
      theA.classList.remove("active");
    }
  }

  setSelectedAbility(abilityName, abilityLevel) {
    if (
      typeof abilityName === "string" &&
      abilityName.length !== 0 &&
      typeof abilityLevel === "string" &&
      abilityLevel.length !== 0
    ) {
      const comparerName = abilityName.toLowerCase(),
        comparerLevel = abilityName.toLowerCase();
      let isFound = false;
      for (const theA of this.__optionElements__.values()) {
        if (
          theA.tryGetAttribute("pso2data-ability-id").toLowerCase() ===
            comparerName &&
          theA.tryGetAttribute("pso2data-ability-level").toLowerCase() ===
            comparerLevel
        ) {
          theA.classList.add("active");
          isFound = true;
        } else {
          theA.classList.remove("active");
        }
      }
      if (
        isFound &&
        this.__currentHub__ &&
        typeof this.__currentHub__.onSelection === "function"
      ) {
        this.__currentHub__.onSelection(this, this.selectedAbility);
      }
    }
  }

  /**
   * Associate an element to be with this popup instance.
   * @param {HTMLElement} element
   * @returns {UIPSO2AbilitySelectPopupCallbacksHub}
   */
  register(element) {
    if (this.__registeredTriggers__.has(element)) return;
    const controller = new bootstrap.Popover(element, {
        trigger: "manual",
        title: "Select special ability",
        html: true,
        boundary: document.body,
        content: this.element,
        customClass: "max-vh-100",
      }),
      propMetadata = {
        configurable: false,
        enumerable: true,
        value: null,
        writable: true,
      },
      /** @type {UIPSO2AbilitySelectPopupCallbacksHub} */
      callbackHub = Object.seal(
        ((obj) =>
          Object.defineProperties(obj, {
            onSelection: propMetadata,
            onPopupShowing: propMetadata,
            onPopupShown: propMetadata,
          }))({})
      ),
      wrapper = Object.freeze([this, element]),
      registerObj = Object.seal({
        isShowing: false,
        eShowing: UIPSO2AbilitySelectPopup.onShowing.bind(wrapper),
        eShown: UIPSO2AbilitySelectPopup.onShown.bind(wrapper),
        eHiding: UIPSO2AbilitySelectPopup.onHiding.bind(wrapper),
        eTrigger: UIPSO2AbilitySelectPopup.onTriggering.bind(wrapper),
        callbackHub: callbackHub,
        controller: controller,
      });

    this.__registeredTriggers__.set(element, registerObj);
    element.addEventListener("show.bs.popover", registerObj.eShowing);
    element.addEventListener("shown.bs.popover", registerObj.eShown);
    element.addEventListener("hide.bs.popover", registerObj.eHiding);
    element.addEventListener("click", registerObj.eTrigger);
    return callbackHub;
  }

  /**
   * Unassociate an element to be with this popup instance.
   * @param {HTMLElement} element
   */
  unregister(element) {
    /** @type {RegisteredTriggerObject=} */
    const registerObj = this.__registeredTriggers__.get(element);
    if (!registerObj) return;
    this.__registeredTriggers__.delete(element);
    element.removeEventListener("show.bs.popover", registerObj.eShowing);
    element.removeEventListener("shown.bs.popover", registerObj.eShown);
    element.removeEventListener("hide.bs.popover", registerObj.eHiding);
    element.removeEventListener("click", registerObj.eTrigger);
    const popoverController = registerObj.controller;
    if (popoverController && typeof popoverController.dispose === "function") {
      popoverController.dispose();
    }
  }

  /**
   * Gets or sets the current selected item.
   * @returns {object<string, object>} Returns the selected level object of the {@link SpecialAbilityData} object that is currently being selected.
   */
  get selectedItem() {
    if (this.__optionElements__.length === 0) return null;
    const element = this.__list__.querySelector("a.active");
    if (!element) return null;
    const id = element.getAttribute("pso2data-ability-id") || "";
    if (!id) return null;
    const level = element.getAttribute("pso2data-ability-level") || "";
    if (!level) return null;
    const objAbility = AbilityTable.getAbility(id);
    if (!objAbility) return null;
    return objAbility.level[level] || null;
  }

  /**
   * Gets or sets the current selected item.
   * @returns {Readonly<object>} Returns {@link SpecialAbilityData} object that is currently being selected.
   */
  get selectedAbility() {
    if (this.__optionElements__.length === 0) return null;
    const element = this.__list__.querySelector("a.active");
    if (!element) return null;
    const id = element.getAttribute("pso2data-ability-id") || "";
    if (!id) return null;
    const level = element.getAttribute("pso2data-ability-level") || "";
    if (!level) return null;
    const objAbility = AbilityTable.getAbility(id);
    if (!objAbility) return null;
    if (!objAbility.level[level]) return null;

    return Object.freeze({
      ability: objAbility,
      level: level,
    });
  }

  /**
   * Gets or sets the current selected item.
   * @param {string} value The name and the level of the ability.
   */
  set selectedItem(value) {
    if (typeof value === "string" && value.length !== 0) {
      const comparer = value.toLowerCase();
      let isFound = false;
      for (const theA of this.__optionElements__.values()) {
        let comparand = theA
          .getAttribute("pso2data-ability-name")
          .toLowerCase();
        if (comparand === comparer) {
          theA.classList.add("active");
          isFound = true;
        } else {
          comparand = theA.getAttribute("pso2data-ability-namejp");
          if (comparand) {
            comparand = comparand.toLowerCase();
          } else {
            continue;
          }
          if (comparand === comparer) {
            theA.classList.add("active");
            isFound = true;
          } else {
            theA.classList.remove("active");
          }
        }
      }
      if (
        isFound &&
        this.__currentHub__ &&
        typeof this.__currentHub__.onSelection === "function"
      ) {
        this.__currentHub__.onSelection(this, this.selectedAbility);
      }
    }
  }

  /**
   * Gets or sets the current selected element container which contains the ability option.
   * @returns {?HTMLAnchorElement} Returns {@link HTMLAnchorElement} if there is an selected item. Otherwise, null.
   */
  get selectedElement() {
    if (this.__optionElements__.length === 0) return null;
    return this.__list__.querySelector(".active");
  }

  /**
   * Gets or sets the current selected element container which contains the ability option.
   * @param {HTMLAnchorElement} value The element which is the option HtmlElement of the ability. Or the name of the ability.
   */
  set selectedElement(value) {
    if (value instanceof HTMLAnchorElement) {
      const selectedOne = value;
      let isFound = false;
      for (const theA of this.__optionElements__.values()) {
        if (Object.is(theA, selectedOne)) {
          theA.classList.add("active");
          isFound = true;
        } else {
          theA.classList.remove("active");
        }
      }
      if (
        isFound &&
        this.__currentHub__ &&
        typeof this.__currentHub__.onSelection === "function"
      ) {
        this.__currentHub__.onSelection(this, this.selectedAbility);
      }
    }
  }

  /**
   * Gets the option elements of this instance.
   * @returns {NodeListOf<HTMLAnchorElement>} Returns option elements which are the ability selections.
   */
  get optionElements() {
    return this.__optionElements__;
  }

  /**
   * Gets the input element of this instance.
   * @returns {HTMLInputElement} Returns input element which is the "filter by name" text input.
   */
  get inputElement() {
    return this.__input__;
  }

  /**
   * Gets the ability list element of this instance.
   * @returns {HTMLLIElement} Returns list element which is the ability list.
   */
  get itemsElement() {
    return this.__list__;
  }

  /**
   * @param {SpecialAbilityData} abilityInfo
   * @returns {Iterable<HTMLLIElement>} One or multiple instances of {@link HTMLLIElement} depending on how many level the special ablity has.
   */
  static *createOptions(abilityInfo) {
    const levelList = Object.getOwnPropertyNames(abilityInfo.level);

    for (const levelName of levelList) {
      const opt = document.createElement("a");
      const name = abilityInfo.name,
        namejp = abilityInfo.namejp,
        hasJpName = namejp && namejp !== name;
      opt.textContent = hasJpName
        ? `${name} ${levelName} (${namejp} ${levelName})`
        : `${name} ${levelName}`;
      opt.setAttribute("pso2data-ability-id", name);
      opt.setAttribute("pso2data-ability-level", levelName);
      opt.setAttribute("pso2data-ability-name", `${name} ${levelName}`);
      if (hasJpName) {
        opt.setAttribute("pso2data-ability-namejp", `${namejp} ${levelName}`);
      }
      opt.classList.add("list-group-item", "list-group-item-action");
      opt.href = "javascript:void(0);";
      opt.tabIndex = -1;
      yield opt;
    }
  }
}
