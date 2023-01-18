const func_none = function () {};

/**
 * @constructor
 */
function fakejQuery(obj) {
  this.ready = func_none;
}

var jQuery = jQuery || new fakejQuery();
var DarkReader =
  DarkReader ||
  Object.create({
    setFetchMethod: func_none,
    auto: func_none,
  });
