/**
 * Represents a stat modifier (stat boost) in PSO2 NGS game.
 */
class StatBoost {
  /**
   * Create a new {@link StatBoost} instance.
   * @param {number} value The numeric value.
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

      if (value[value.length - 1] === "%") {
        const percentNumStr = value.substring(0, value.length - 1);
        if (isNaN(percentNumStr))
          throw new TypeError("'value' is not a valid percentile number.");

        __value = parseFloat(percentNumStr) / 100;
        if (t_1 !== "boolean") isPercent = true;
      } else if (isNaN(percentNumStr)) {
        throw new TypeError("'value' is not a valid number.");
      } else {
        __value = parseInt(percentNumStr);
      }
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
   * Get a string represent the amount of stat boost of this instance. If the value has fraction, it will be rounded down.
   * @param {number} fraction If omitted, will be 0, which means no fraction number.
   * @returns {string} A string represent the amount of stat boost of this instance.
   */
  toString(fraction) {
    if (this.ispercent) {
      if (!fraction || fraction <= 0) {
        return `${Math.floor(this.value * 100)}%`;
      } else {
        const hun = this.value * 100;
        if (Math.trunc(hun) === hun) {
          return hun;
        }

        return `${hun.toFixed(fraction)}%`;
      }
    } else {
      return String(this.value);
    }
  }

  /**
   * Calculate the total percentile value of all the boosts.
   * @param  {...StatBoost} boosts An array which element can be either {@link StatBoost}, a percentile string or a numeric value.
   * @returns {StatBoost} A {@link StatBoost} instance which has value of the total.
   */
  static calcTotalPercent(...boosts) {
    if (!boosts || boosts.length === 0) return 0;
    if (boosts.length === 1)
      return boosts[0] instanceof StatBoost
        ? boosts[0]
        : new StatBoost(boosts[0]);

    let total = 0;
    for (let boost of boosts) {
      const t_boost = typeof boost;
      if (t_boost === "string") boost = new StatBoost(boost);
      else if (t_boost === "number") {
        boost = new StatBoost(boost, boost < 1, 0);
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
