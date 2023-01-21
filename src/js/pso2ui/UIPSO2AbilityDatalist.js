/**
 * Mark-up class to manage elements regarding <select> with pso2 ability options.
 */
class UIPSO2AbilityDatalist extends UIPSO2Element {
  /** @constant @readonly @type {UIPSO2AbilityDatalist} */
  static __instance__;
  /** @returns {UIPSO2AbilityDatalist} Returns a default instance of {@link UIPSO2AbilityDatalist}. */
  static get default() {
    return UIPSO2AbilityDatalist.__instance__
      ? UIPSO2AbilityDatalist.__instance__
      : (UIPSO2AbilityDatalist.__instance__ = new UIPSO2AbilityDatalist());
  }

  /**
   *
   * @returns {string} Returns a unique ID for this {@link UIPSO2AbilityDatalist} class.
   */
  static generateID() {
    return "leapso2-datalist-" + Math.random().toString(16).slice(2);
  }

  constructor() {
    const element = document.createElement("datalist");
    element.id = UIPSO2AbilityDatalist.generateID();
    super(element);
    for (const abilityInfo of AbilityTable.abilities) {
      for (const opt of UIPSO2AbilityDatalist.createOptions(abilityInfo)) {
        element.appendChild(opt);
      }
    }
  }

  /**
   * Gets the ID string of this data list.
   * @returns {string} Returns the ID of this data list.
   */
  getId() {
    return this.element.id;
  }

  /**
   * @param {SpecialAbilityData} abilityInfo
   * @returns {Iterable<HTMLOptionElement>} One or multiple instances of {@link HTMLOptionElement} depending on how many level the special ablity has.
   */
  static *createOptions(abilityInfo) {
    const levelList = Object.getOwnPropertyNames(abilityInfo.level);

    for (const levelName of levelList) {
      const opt = document.createElement("option");
      const name = abilityInfo.name,
        namejp = abilityInfo.namejp;
      opt.textContent =
        namejp && namejp !== name
          ? `${name} ${levelName} (${namejp} ${levelName})`
          : `${name} ${levelName}`;
      opt.value = `${name} ${levelName}`;
      opt.setAttribute("pso2data-ability-id", name);
      yield opt;
    }
  }
}
