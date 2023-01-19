/**
 * Represents a piece of equipment in PSO2 NGS game.
 */
class Equipment {
  /**
   * Creates a new {@link Equipment} instance.
   */
  constructor() {
    let _affixes = {};

    Object.defineProperty(this, "affixes", {
      configurable: false,
      enumerable: true,
      get: () => Object.freeze(Object.values(_affixes)),
    });

    this.addAbility = function (ability, replace) {
      if (!(ability instanceof SpecialAbility))
        throw new TypeError(
          "'ability' must be an instance of SpecialAbility class."
        );
      if (typeof replace !== "boolean") replace = !!replace;

      if (replace) {
        _affixes[ability.category] = ability;
      } else {
        const checkKey = Object.hasOwnProperty.bind(_affixes);
        if (checkKey(ability.category))
          throw new OverlappedAbilityError(ability);
        else _affixes[ability.category] = ability;
      }
    };

    this.removeAbility = function (ability) {
      if (!(ability instanceof SpecialAbility)) return;
      const checkKey = Object.hasOwnProperty.bind(_affixes);
      if (
        checkKey(ability.category) &&
        _affixes[ability.category].name === ability.name
      ) {
        delete _affixes[ability.category];
      }
    };

    this.removeAllAbilities = function () {
      _affixes = {};
    };
  }
}
