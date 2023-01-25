/** @suppress {uselessCode} */
let FF_FOUC_FIX;

/** @suppress {uselessCode} */
void ((w) => {
  // Using "jQuery" function call directly and alias it to $ only for internal func.
  /** @suppress {undefinedVars} */
  const JQ = w.jQuery;

  JQ(function ($) {
    "use strict";
    const d = w.document,
      b = d.body,
      jqd = $(d),
      jqb = $(b);

    /** @suppress {undefinedVars} */
    DarkReader.setFetchMethod(window.fetch);
    /** @suppress {undefinedVars} */
    DarkReader.auto();

    const e_mainapp = d.getElementById("mainapp");
    if (e_mainapp) {
      e_mainapp.classList.remove("d-none");
    }
    AbilityTable.eAbilityAdded.register((sender, args) => {
      console.log(sender);
      console.log(args);
    });

    const newStuff = new UIPSO2AbilitySelect();
    newStuff.appendTo(b);
    new UIPSO2AbilitySelect().appendTo(b);
    new UIPSO2AbilitySelect().appendTo(b);
    new UIPSO2AbilitySelect().appendTo(b);
    new UIPSO2AbilitySelect().appendTo(b);
  });
})(window || this);
