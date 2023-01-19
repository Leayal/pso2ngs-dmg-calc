// The Evil code
// This is to add some more convenient shortcuts and functions.

/**
 * @suppress {uselessCode}
 */
void (function (p) {
  if (typeof p.removeItem !== "function") {
    /**
     * Removes an item from the array. Do nothing if the array does not contain the item.
     * @param {*} item The comparand item.
     */
    p.removeItem = function (item) {
      const index = this.indexOf(item);
      if (index !== -1) {
        index.splice(index, 1);
      }
    };
  }

  if (typeof p.removeAllItems !== "function") {
    /**
     * Removes all elements which matched the item from the array. Do nothing if the array does not contain the item.
     * @param {*} item The comparand item.
     * @returns {boolean} Returns a boolean. True if any items matched is found and removed. Otherwise, false.
     */
    p.removeAllItems = function (item) {
      let result = false;
      for (let i = this.length; i--; ) {
        if (this[i] === item) {
          result = true;
          this.splice(i, 1);
        }
      }
      return result;
    };
  }
})(Array.prototype);
