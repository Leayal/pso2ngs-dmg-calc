class StatBoost {
  /**
   * Create a new {@link StatBoost} instance.
   * @param {number} value The numeric value.
   * @param {boolean=} isPercent [Optional] Whether the boost is a percentile or a flat value. If omitted, will be true.
   */
  constructor(value, isPercent) {
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
        __value = parseInt(percentNumStr) / 100;
        if (t_1 !== "boolean") isPercent = true;
      } else if (isNaN(percentNumStr)) {
        throw new TypeError("'value' is not a valid number.");
      } else {
        __value = parseInt(percentNumStr);
      }
    } else if (t_0 === "number") {
      __value = value;
    } else {
      throw new TypeError("'value' is not a valid.");
    }

    if (t_1 === "undefined") isPercent = true;
    else if (t_1 !== "boolean") isPercent = !!!isPercent;

    Object.defineProperties(this, {
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
   * Get a string represent the amount of stat boost of this instance.
   * @param {number} fraction If omitted, the value will be rounded down.
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
   * @param  {...any} boosts One or an array of {@link StatBoost}.
   * @returns {StatBoost} A {@link StatBoost} instance which has value of the total.
   */
  static calcTotalPercent(...boosts) {
    if (!boosts || boosts.length === 0) return 0;
    if (boosts.length === 1 && boosts[0].isenabled) return boosts[0].value;

    let stillPercent;
    let total = 0;
    for (let boost of boosts) {
      const t_boost = typeof boost;
      if (t_boost === "string") boost = new StatBoost(boost);
      else if (t_boost === "number") {
        const isPercentile = boost < 1;
        boost = new StatBoost(boost, isPercentile);
      }

      if (boost instanceof StatBoost) {
        if (boost.isenabled) {
          if (total === 0) {
            total = boost.value;
            stillPercent = boost.ispercent;
          } else {
            if (boost.ispercent) {
              total = (total + 1) * (boost.value + 1) - 1;
            } else {
              total = total * boost.value;
              stillPercent = false;
            }
          }
        }
      }
    }
    return new StatBoost(total, stillPercent);
  }
}
