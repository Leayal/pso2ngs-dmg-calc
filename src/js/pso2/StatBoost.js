/**
 * @typedef IStatBoost
 * @property {number} statId - The Id of the stat.
 * @property {number} value - The numeric value of the boost. E.g: 0.04 (which is 4%).
 * @property {boolean} ispercent - The boolean determines whether the boost is a modifier or a flat numeric value.
 * @property {boolean} isenabled - The boolean determines whether the boost is enabled or not.
 */

/**
 * Represents a stat modifier (stat boost) in PSO2 NGS game.
 */
class StatBoost {
  /**
   * Create a new {@link StatBoost} instance.
   * @param {(number|string)} value The numeric value or a percentile string.
   * @param {boolean=} isPercent [Optional] Whether the boost is a percentile or a flat value. If omitted, will be undefined, which depends on the 'value' param.
   * @param {number=} statId [Optional] The numeric ID of a stat. If ommitted, will be 0.
   */
  constructor(value, isPercent, statId = 0) {
    const t_0 = typeof value,
      t_1 = typeof isPercent;
    let __value = 0;
    if (t_0 === "string") {
      if (value.length === 0)
        throw new RangeError("'value' cannot be an empty string.");

      const hasPercentileSymbol = value[value.length - 1] === "%";
      const percentNumStr = hasPercentileSymbol
        ? value.substring(0, value.length - 1)
        : value;

      if (isNaN(percentNumStr)) {
        throw new TypeError(
          hasPercentileSymbol
            ? "'value' is not a valid percentile number."
            : "'value' is not a valid number."
        );
      } else {
        if (hasPercentileSymbol && t_1 !== "boolean") isPercent = true;
      }
      __value = parseFloat(percentNumStr) / 100;
    } else if (t_0 === "number") {
      __value = value;
    } else {
      throw new TypeError(
        `'value' is not valid. 'value' is a ${t_0}, and is '${value}'.`
      );
    }

    if (t_1 === "undefined") isPercent = true;
    else if (t_1 !== "boolean") isPercent = !!isPercent;

    Object.defineProperties(this, {
      statId: {
        configurable: false,
        writable: false,
        value: statId,
        enumerable: true,
      },
      value: {
        configurable: false,
        writable: false,
        value: __value,
        enumerable: true,
      },
      ispercent: {
        configurable: false,
        writable: false,
        value: isPercent,
        enumerable: true,
      },
      isenabled: {
        configurable: false,
        writable: true,
        value: true,
        enumerable: true,
      },
    });
  }

  /**
   * @returns {boolean} Determines whether this boost is enabled or not.
   */
  get isenabled() {
    return this.isenabled;
  }

  /**
   * Set enabled or not.
   */
  set isenabled(value) {
    if (typeof value !== "boolean") value = !!value;
    this.isenabled = value;
  }

  /**
   * @returns {boolean} Determines whether this boost is a modifier or a flat numeric value.
   */
  get ispercent() {
    return this.ispercent;
  }

  /**
   * @returns {number} Returns the value of this boost.
   */
  get value() {
    return this.value;
  }

  /**
   * @returns {number} Returns the stat ID of this boost instance.
   */
  get statId() {
    return this.statId;
  }

  /**
   * Get a string represent the amount of stat boost of this instance. If the value has fraction, it will be rounded down.
   * @param {number=} fraction If omitted, will be 0, which means no fraction number.
   * @returns {string} A string represent the amount of stat boost of this instance.
   */
  toString(fraction) {
    if (this.ispercent) {
      if (!fraction || fraction <= 0) {
        return `${Math.floor(this.value * 100)}%`;
      } else {
        const hun = this.value * 100;
        if (Math.trunc(hun) === hun) {
          return hun.toString();
        }

        return `${hun.toFixed(fraction)}%`;
      }
    } else {
      return this.value.toString();
    }
  }

  /**
   * Creates a new {@link StatBoost} which has the percentile value after chained with the chained boost.
   * @param {(StatBoost|string|number)} boost The boost value to be chained. Can be either {@link StatBoost}, a percentile string or a numeric value.
   * @returns {StatBoost} A {@link StatBoost} instance which has value of the total.
   */
  chain(boost) {
    if (typeof boost === "undefined")
      throw new TypeError("'boost' must not be null.");

    const t_boost = typeof boost;
    if (t_boost === "number") {
      boost = new StatBoost(boost || 0, boost < 1, 0);
    } else if (t_boost === "string" || !(boost instanceof StatBoost))
      boost = new StatBoost(boost || "");
    if (!boost.ispercent)
      throw new RangeError("'boost' must be be a percentile boost.");

    const isNegative = boost.value < 0;
    return new StatBoost(
      (isNegative
        ? (1 + this.value) / (1 + Math.abs(boost.value))
        : (1 + this.value) * (1 + boost.value)) - 1,
      true,
      this.statId
    );
  }

  /**
   * Calculate the total percentile value of all the boosts.
   * @param  {...(StatBoost|string|number)} boosts An array which element can be either {@link StatBoost}, a percentile string or a numeric value. The first value in the array will be the base value.
   * @returns {StatBoost} A {@link StatBoost} instance which has value of the total.
   */
  static calcTotalPercent(...boosts) {
    if (!boosts || boosts.length === 0) return new StatBoost(0, true);
    if (boosts.length === 1) {
      return boosts[0] instanceof StatBoost
        ? boosts[0]
        : new StatBoost(boosts[0]);
    }

    let total = 0;
    for (let boost of boosts) {
      const t_boost = typeof boost;
      if (t_boost === "string") boost = new StatBoost(boost || "0%");
      else if (t_boost === "number") {
        boost = new StatBoost(boost || 0, boost < 1, 0);
      }

      if (boost instanceof StatBoost) {
        if (boost.isenabled && boost.ispercent) {
          if (total === 0) {
            total = boost.value;
          } else {
            // I think this is what SEGA used.
            // Offset it with 1 to define "the modifier". E.g: 2.5% = 0.025 => 1.025 is the "modifier".
            // So we offset it +1, do math, then -1 again to get the percentile.
            const isNegative = boost.value < 0;
            if (isNegative) {
              total = (1 + total) / (1 + Math.abs(boost.value)) - 1;
            } else {
              total = (1 + total) * (1 + boost.value) - 1;
            }
          }
        }
      }
    }

    return new StatBoost(total, true);
  }
}
