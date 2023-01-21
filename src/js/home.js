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

    AbilityTable.registerAbility({
      name: "Gigas Technique",
      namejp: "ギガス・テクニック",
      level: {
        // Using exact stat ID to declare. This has the least chance getting misinterpreted.
        I: {
          // Flat numeric number will be "literal number"
          [`${StatId.sHP}`]: 5,
          // Percentile number MUST be either a string with "%" symbol. E.g: "1.5"%
          // Or a flat fraction number. E.g: 1.5 percent will be => 0.015.
          // Strongly recommended using string as it's much clearer and has least chance to be misinterpreted.
          [`${StatId.sTechDamage}`]: "1.5%",
        },
        // Using literal stat name to declare. registerData will try to find the ID from literal name.
        // This is the recommended way. As it's less typing and nice looking.
        II: {
          sHP: 10,
          sTechDamage: "2%",
        },
        III: {
          sHP: 15,
          sTechDamage: "2.5%",
        },
        IV: {
          sHP: 20,
          sTechDamage: "3%",
        },
      },
    });

    const newStuff = new UIPSO2AbilitySelect();
    newStuff.appendTo(b);
  });
})(window || this);
