/**
 * Core, heart of this whole app.
 */
class DmgCalc {
  /**
   * Creates a new instance of the heart.
   */
  constructor() {
    let _dmgstat = 0,
      _calcOnValueChanges = true;
    let _dmgboost = [];

    Object.defineProperties(this, {
      calcOnValueChanges: {
        configurable: false,
        enumerable: false,
        get: () => _calcOnValueChanges,
        set: (value) => {
          const t = typeof value;
          if (t === "boolean") _calcOnValueChanges = value;
          else if (t === "number") _calcOnValueChanges = !!!value;
          else throw new TypeError("The value should be a boolean.");
        },
      },
      dmgStat: {
        configurable: false,
        enumerable: true,
        get: () => _dmgstat,
        set: (value) => {
          if (isNaN(value))
            throw new TypeError("The value should be a number.");

          if (typeof value !== "number") value = Number(value);

          if (value < 0) {
            throw new RangeError("The damage stat cannot be negative.");
          }

          _dmgstat = value;
          if (_calcOnValueChanges) {
            this.calcMin();
            this.calcMax();
          }
        },
      },
    });
  }

  addBoost(boost) {
    if (boost instanceof StatBoost) {
    } else {
      throw new TypeError(
        "The boost should be an instance of StatBoost class."
      );
    }
  }

  /**
   * Calculate the minimum final damage.
   */
  calcMin() {}

  /**
   * Calculate the maximum final damage.
   */
  calcMax() {}
}
