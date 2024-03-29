/**
 * Represents a special ability in PSO2 NGS game.
 */
class SpecialAbility {
  /**
   * Creates a new {@link SpecialAbility} instance.
   * @param {string} name The name of this special ability.
   * @param {number} category The numeric ID of the category of this special ability.
   * @param {Array<StatBoost>} boosts An array which contains stat boosts information.
   */
  constructor(name, category, boosts) {
    Object.defineProperties(this, {
      name: {
        configurable: false,
        enumerable: true,
        value: name,
        writable: false,
      },
      category: {
        configurable: false,
        enumerable: true,
        value: category,
        writable: false,
      },
      boosts: {
        configurable: false,
        enumerable: true,
        value: Object.freeze(boosts),
        writable: false,
      },
    });
  }

  /**
   * @returns {number} The numeric ID of the category of this special ability.
   */
  get category() {
    return this.category;
  }

  /**
   * @returns {Array<StatBoost>} Returns an array of {@link StatBoost}.
   */
  get boosts() {
    return this.boosts;
  }

  /**
   * @returns {string} Returns name of this special ability instance.
   */
  get name() {
    return this.name;
  }
}
