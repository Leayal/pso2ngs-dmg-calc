// The Evil code
// This is to add some more convenient shortcuts and functions.
void (function (p) {
  if (typeof p.removeItem !== "function") {
    p.removeItem = function (item) {
      const index = this.indexOf(item);
      if (index !== -1) {
        index.splice(index, 1);
      }
    };
  }

  if (typeof p.removeAllItems !== "function") {
    p.removeAllItems = function (item) {
      for (let i = this.length; i--; ) {
        if (this[i] === item) this.splice(i, 1);
      }
    };
  }
})(Array.prototype);
