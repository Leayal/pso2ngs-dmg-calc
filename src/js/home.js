(function (w) {
  // Using "jQuery" function call directly and alias it to $ only for internal func.
  const JQ = w.jQuery;
  JQ(function ($) {
    "use strict";
    const d = w.document,
      jqd = $(d),
      b = d.body,
      jqb = $(b);
    DarkReader.setFetchMethod(window.fetch);
    DarkReader.auto();

    const test1 = StatBoost.calcTotalPercent(
      new StatBoost("4%"),
      new StatBoost("3%"),
      new StatBoost("3%"),
      new StatBoost("3%"),
      new StatBoost("3%")
    ).toString(2);

    const test2 = StatBoost.calcTotalPercent(
      new StatBoost("4%"),
      new StatBoost("2.5%"),
      new StatBoost("3%"),
      new StatBoost("3%"),
      new StatBoost("2.5%"),
      new StatBoost("3%")
    ).toString(2);

    $("#total01").text("Total: " + test1);
    $("#total02").text("Total: " + test2);
  });
})(this);
