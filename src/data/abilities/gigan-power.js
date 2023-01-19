(function (table) {
  /**
   * @type {SpecialAbilityData}
   */
  const abilityInfo = Object.freeze({
    nameen: "Gigantix Power",
    namejp: "Gigantix Power",
    level: {
      I: {
        HP: 5,
        StrikeDamage: "1.5%",
      },
      II: {
        HP: 10,
        StrikeDamage: "2%",
      },
      III: {
        HP: 15,
        StrikeDamage: "2.5%",
      },
      IV: {
        HP: 20,
        StrikeDamage: "3%",
      },
    },
  });

  // DO NOT MODIFY ANYTHING BEYOND THIS POINT.
  // If you do, at your own risk of breaking changes.
  const propMetadata = {
    configurable: false,
    enumerable: true,
    value: abilityInfo,
    writable: false,
  };
  /**
   * @type {Object.<string, SpecialAbilityData>}
   */
  const prop = {};
  prop[`${abilityInfo.nameen.toLowerCase()}`] = propMetadata;
  prop[`${abilityInfo.namejp.toLowerCase()}`] = propMetadata;
  Object.defineProperties(table, prop);
})(tbAbilities);
