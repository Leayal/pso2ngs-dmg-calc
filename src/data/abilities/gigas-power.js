(() => {
  /**
   * For more information, look at {@link SpecialAbilityData}, {@link AbilityTable} and {@link StatId}.
   * @type {SpecialAbilityData}
   */
  const abilityInfo = {
    name: "Gigas Power",
    namejp: "ギガス・パワー",
    level: {
      // Using exact stat ID to declare. This has the least chance getting misinterpreted.
      I: {
        // Flat numeric number will be "literal number"
        [`${StatId.sHP}`]: 5,
        // Percentile number MUST be either a string with "%" symbol. E.g: "1.5"%
        // Or a flat fraction number. E.g: 1.5 percent will be => 0.015.
        // Strongly recommended using string as it's much clearer and has least chance to be misinterpreted.
        [`${StatId.sStrikeDamage}`]: "1.5%",
      },
      // Using literal stat name to declare. registerData will try to find the ID from literal name.
      // This is the recommended way. As it's less typing and nice looking.
      II: {
        sHP: 10,
        sStrikeDamage: "2%",
      },
      III: {
        sHP: 15,
        sStrikeDamage: "2.5%",
      },
      IV: {
        sHP: 20,
        sStrikeDamage: "3%",
      },
    },
  };
  // DO NOT CHANGE THIS LINE.
  // This is to register the ability into the table.
  AbilityTable.registerAbility(abilityInfo);
})();
