(() => {
  /** @type {SpecialAbilityData} */
  const abilityInfo = {
    name: "Ability",
    namejp: "アビリティ",
    level: {
      I: {
        [`${StatId.sAllDamage}`]: "2.5%",
        [`${StatId.sDamageVariance}`]: "2.5%",
        [`${StatId.sDamageResist}`]: "2.5%",
      },
      II: {
        [`${StatId.sAllDamage}`]: "2.5%",
        [`${StatId.sDamageVariance}`]: "2.5%",
        [`${StatId.sDamageResist}`]: "2.5%",
      },
      III: {
        [`${StatId.sAllDamage}`]: "2.5%",
        [`${StatId.sDamageVariance}`]: "2.5%",
        [`${StatId.sDamageResist}`]: "2.5%",
      },
      IV: {
        [`${StatId.sAllDamage}`]: "2.5%",
        [`${StatId.sDamageVariance}`]: "2.5%",
        [`${StatId.sDamageResist}`]: "2.5%",
      },
    },
  };
  AbilityTable.registerAbility(abilityInfo);
})();
