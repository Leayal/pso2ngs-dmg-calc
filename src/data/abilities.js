/**
 * @typedef SpecialAbilityData
 * @property {string} nameen The name of the special ability in English.
 * @property {string} namejp The name of the special ability in Japanese.
 * @property {object} level The object defining the stats of each level.
 */

/**
 * - Special Ability table with the key to be the ability.
 * - Each ability will be 2 entries in the table. One entry's key is the english name and the other one's key is the japanese name.
 * @type {Object.<string, SpecialAbilityData>}
 */
const tbAbilities = {};
Object.defineProperty(window || this, "tbAbilities", {
  configurable: false,
  enumerable: true,
  value: tbAbilities,
  writable: false,
});
