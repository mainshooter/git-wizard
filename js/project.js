var StepOne;

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

/**
 * Controlls the eventlistners we have for each step
 */
function StepsEventListners() {
  Listner.remove('#folder', 'keyup', function() { StepOne.folderLocation();});
  Listner.remove("#cloneUrl", 'keyup', function(){StepOne.cloneURL();})
  switch (currentStep) {
    case 0:

      break;
    case 1:
      Listner.add('#folder', 'keyup', function() { StepOne.folderLocation();});
      Listner.add("#cloneUrl", 'keyup', function(){StepOne.cloneURL();})
      break;
    case 2:

      break;
    case 3:

      break;
    case 4:

      break;
  }
}

(function() {
  StepOne = {
    folderLocation: function() {
      select("#zoekFolderCommando").innerHTML = "cd " + select("#folder").value;
    },
    cloneURL: function() {
      select("#cloneCommand").innerHTML = "git clone " + select("#cloneUrl").value;
    }
  }
})();

/**
 * checks if a string has a space
 * @param  {[type]} string [the string we want to check]
 * @return {[type]}        [If there is a space we return true]
 */
function checkForSpace(string) {
  let stringArray = string.split('');
  let result = false;
  for (var i = 0; i < stringArray.length; i++) {
    if (stringArray[i] == ' ') {
      return(true);
    }
  }
  return(result);
}

/**
 * Goes a page back
 */
function previousStep() {
  if (currentStep > 0) {
    // We can go back
    currentStep--;
    select("#step").innerHTML = Ajax.get_withCallback('steps/step' + currentStep + '.html').responseText;
    console.log("Back");
    StepsEventListners();
  }

  else {
    // We can't go back
  }
}

/**
 * Goes a page forward
 */
function nextStep() {
  if (currentStep < maxSteps) {
    // We can go to the next step
    console.log("Next");
    currentStep++;
    select("#step").innerHTML = Ajax.get_withCallback('steps/step' + currentStep + '.html').responseText;
    StepsEventListners();
  }

  else {
    // We can't go back
  }
}
