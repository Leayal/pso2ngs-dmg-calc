(function (table) {
  /**
   * @struct
   */
  const abilityInfo = Object.freeze({
    nameen: "Ability",
    namejp: "Ability",
    level: {
      I: {
        AllDamage: "2.5%",
        DamageVariance: "2.5%",
        DamageResist: "2.5%",
      },
      II: {
        AllDamage: "2.5%",
        DamageVariance: "2.5%",
        DamageResist: "2.5%",
      },
      III: {
        AllDamage: "2.5%",
        DamageVariance: "2.5%",
        DamageResist: "2.5%",
      },
      IV: {
        AllDamage: "2.5%",
        DamageVariance: "2.5%",
        DamageResist: "2.5%",
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
  const prop = {};
  prop[`${abilityInfo.nameen.toLowerCase()}`] = propMetadata;
  prop[`${abilityInfo.namejp.toLowerCase()}`] = propMetadata;
  Object.defineProperties(table, prop);
})(tbAbilities);
