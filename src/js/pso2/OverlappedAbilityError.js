/**
 * Error which is raised when adding a category-overlapped ability.
 */
class OverlappedAbilityError extends Error {
  /**
   * Creates a new instance of {@link OverlappedAbilityError}.
   * @param {SpecialAbility} ability The {@link SpecialAbility} which is overlapped.
   */
  constructor(ability) {
    super(`Ability '${ability.name}' is overlapped.`);

    Object.defineProperty(this, "ability", {
      configurable: false,
      enumerable: true,
      value: ability,
      writable: false,
    });
  }

  /**
   * @returns {SpecialAbility} The special ability which caused the overlap.
   */
  get ability() {
    return this.ability;
  }
}
