/**
 * @typedef SpecialAbilityData
 * @property {string} name
 * - The name of the special ability. Should be in english.
 * - In case there is only known JP name, set this field with the JP name and omit the 'namejp' field.
 * @property {string=} namejp
 * - The name of the special ability in Japanese. Should be set when there is known English name.
 * - In case there is only known JP name, omit this field and set 'name' field with the JP name.
 * @property {object.<string, object>} level The object defining the stats of each level.
 *
 * @typedef AbilityAddedEventArgs
 * @property {SpecialAbilityData} ability The special ability that has been added.
 *
 * @callback AbilityAddedCallback
 * @param {AbilityTable} sender The object dispatched the event.
 * @param {LeaEventCallback} eventArgs The object dispatched the event.
 */

/**
 * Table contains special abilities.
 */
class AbilityTable {
  /**
   * @readonly
   * @type {ILeaEventHandler<AbilityAddedEventArgs>}
   */
  static eAbilityAdded = new LeaEventHandler(AbilityTable);

  /** @type {Array<SpecialAbilityData>} */
  static abilities = [];
  /** @private @type {object<string, SpecialAbilityData>} */
  static __abilitiesMap__ = {};

  /**
   * Gets {@link SpecialAbilityData} from the ability name.
   * @param {string} abilityName The special ability name. The name can be either English or Japanese.
   * @returns {?SpecialAbilityData} Returns {@link SpecialAbilityData} if there is a matching with the given name. Otherwise, null.
   */
  static getAbility(abilityName) {
    if (typeof abilityName !== "string" || abilityName.length === 0)
      return null;
    const name = abilityName.toLowerCase();
    return AbilityTable.__abilitiesMap__[name] || null;
  }

  /**
   * Adds a new special ability to the table.
   * @param {SpecialAbilityData} abilityInfo The object contains information about the special ability to add.
   */
  static registerAbility(abilityInfo) {
    const name = abilityInfo.name.toLowerCase();
    if (AbilityTable.__abilitiesMap__.hasOwnProperty(name)) return;

    const nameJp = abilityInfo.namejp?.toLowerCase() || "";

    // Parse and convert literal stat names into stat IDs.
    if (typeof abilityInfo.level === "object") {
      const level = abilityInfo.level;
      for (const levelName in level) {
        for (const stat in level[levelName]) {
          if (isNaN(stat)) {
            level[levelName][StatId.getId(stat)] = level[levelName][stat];
            delete level[levelName][stat];
          }
        }
      }
    }

    const sealedInfo = Object.freeze(abilityInfo);
    AbilityTable.abilities.push(sealedInfo);

    const propMetadata = {
      configurable: false,
      enumerable: true,
      value: sealedInfo,
      writable: false,
    };
    const prop = {};
    prop[name] = propMetadata;
    // In case there is JP name for the ability. Add it as well.
    if (nameJp && nameJp !== name) {
      prop[nameJp] = propMetadata;
    }
    Object.defineProperties(AbilityTable.__abilitiesMap__, prop);

    if (AbilityTable.eAbilityAdded instanceof LeaEventHandler) {
      AbilityTable.eAbilityAdded.invoke(sealedInfo);
    }
  }
}
((at) => {
  const makeReadonly = function (target, propName, visible, fallbackFactory) {
    const bindObj = target[propName] ? target[propName] : fallbackFactory();
    const desc = Object.getOwnPropertyDescriptor(target, propName);
    if (!desc || (desc.configurable && desc.writable)) {
      Object.defineProperty(target, propName, {
        configurable: false,
        enumerable: visible || desc.enumerable,
        value: bindObj,
        writable: false,
      });
    }
  };

  makeReadonly(at, "registerAbility");
  makeReadonly(at, "getAbility");
  makeReadonly(at, "eAbilityAdded");
  makeReadonly(at, "abilities");
  makeReadonly(at, "__abilitiesMap__", false);
})(AbilityTable);
