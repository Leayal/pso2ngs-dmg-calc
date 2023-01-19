/**
 * Error which is raised when adding a category-overlapped ability.
 */
class OverlappedAbilityError extends Error {
  /**
   * Creates a new instance of {@link OverlappedAbilityError}.
   * @param {string} message The error message.
   * @param {SpecialAbility} ability The {@link SpecialAbility} which is overlapped.
   * @constructor
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
}
