let currentStep = 0;
let maxSteps = 4;

/**
 * Runs the startup
 */
(function() {
  select("#step").innerHTML = Ajax.get_withCallback('steps/step0.html').responseText;

  Listner.add('#previousStep', 'click', previousStep);
  Listner.add('#nextStep', 'click', nextStep);
})();

function previousStep() {
  if (currentStep > 0) {
    // We can go back
    currentStep--;
    select("#step").innerHTML = Ajax.get_withCallback('steps/step' + currentStep + '.html').responseText;
    console.log("Back");
  }

  else {
    // We can't go back
  }
}

function nextStep() {
  if (currentStep < maxSteps) {
    // We can go to the next step
    console.log("Next");
    currentStep++;
    select("#step").innerHTML = Ajax.get_withCallback('steps/step' + currentStep + '.html').responseText;
  }

  else {
    // We can't go back
  }
}
