/**
 * - Stat ID table in PSO2 NGS game.
 * - All the constant names of the stat are prefixed with "s" character (lowercase).
 */
class StatId {
  /**
   * @readonly No stat.
   * @constant
   */
  static sNone = 0;
  /**
   * @readonly Health power.
   * @constant
   */
  static sHP = 1 << 0;
  /**
   * @readonly PP.
   * @constant
   */
  static sPP = 1 << 1;
  /**
   * @readonly Strike damage.
   * @constant
   */
  static sStrikeDamage = 1 << 2;
  /**
   * @readonly Shoot damage.
   * @constant
   */
  static sShootDamage = 1 << 3;
  /**
   * @readonly Tech damage.
   * @constant
   */
  static sTechDamage = 1 << 4;
  /**
   * @readonly Strike + Shoot + Tech damage.
   * @constant
   */
  static sAllDamage =
    StatId.sStrikeDamage | StatId.sShootDamage | StatId.sTechDamage;
  /**
   * @readonly Strike + Shoot damage. --asha capsule usually has thing kind of thing.
   * @constant
   */
  static sStrikeShootDamage = StatId.sStrikeDamage | StatId.sShootDamage; // Or StatId.sAllDamage & ~StatId.sTechDamage.
  /**
   * @readonly Strike + Tech damage. --asha capsule usually has thing kind of thing.
   * @constant
   */
  static sStrikeTechDamage = StatId.sStrikeDamage | StatId.sTechDamage; // Or StatId.sAllDamage & ~StatId.sShootDamage;
  /**
   * @readonly Shoot + Tech damage. --asha capsule usually has thing kind of thing.
   * @constant
   */
  static sShootTechDamage = StatId.sShootDamage | StatId.sTechDamage; // Or StatId.sAllDamage & ~StatId.sStrikeDamage;
  /**
   * @readonly The minimum variance of damage.
   * @constant
   */
  static sDamageVariance = 1 << 5;
  /**
   * @readonly Damage resistance (Damage reduction on receiving damage).
   * @constant
   */
  static sDamageResist = 1 << 6;
  /**
   * @readonly PP recovery naturally by time.
   * @constant
   */
  static sNaturalPPRecovery = 1 << 7;
  /**
   * @readonly PP recovery by successfully hitting a target.
   * @constant
   */
  static sPPRecoveryAttacking = 1 << 8;

  /**
   * @private Field contains table for looking up names by value.
   * @readonly
   */
  static __LookupByValue = ((o) => {
    const tb = {};
    for (const name of Object.keys(o))
      if (typeof o[name] === "number") {
        Object.defineProperty(o, name, {
          configurable: false,
          enumerable: true,
          value: o[name],
          writable: false,
        });
        Object.defineProperty(tb, o[name], {
          configurable: false,
          enumerable: true,
          value: name,
          writable: false,
        });
      }

    return Object.freeze(tb);
  })(StatId);

  /**
   * Gets the numeric ID from a stat name.
   * @param {string} statName The name of the stat.
   * @returns {?number} The numeric ID of the stat if the name is found. Otherwise, null.
   */
  static getId(statName) {
    return StatId.hasOwnProperty(statName) ? StatId[statName] : null;
  }

  /**
   * Gets the stat name from the numeric ID of a stat.
   * @param {number} statId The numeric ID of the stat.
   * @returns {?string} The name of the stat if there is one matched the ID. Otherwise, null.
   */
  static getName(statId) {
    const tb = StatId.__LookupByValue;
    return tb.hasOwnProperty(statId) ? tb[statId] : null;
  }
}
