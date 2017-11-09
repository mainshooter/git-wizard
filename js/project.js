var StepOne;

var InputAndCode;
// Is a object that contains the id of a imput form and the ID of the code tag

InputAndCode = {
  "folder" : {
    "code" : "zoekFolderCommando",
    "defaultText" : "cd ",
  },
  "cloneUrl" : {
    "code" : "cloneCommand",
    "defaultText" : "git clone ",
  },
  "commitComment" : {
    "code" : "commitCommand",
    "defaultText" : "git commit -a -m"
  }
}

let currentStep = 0;
let maxSteps = 4;

/**
 * Runs the startup
 */
(function() {
  select("#step").innerHTML = Ajax.get_withCallback('steps/step0.html').responseText;

  Listner.add('#previousStep', 'click', previousStep);
  Listner.add('#nextStep', 'click', nextStep);
  disableButtons();
})();

/**
 * Controlls the eventlistners we have for each step
 */
function StepsEventListners() {
      let code = selectAll("code");
      for (var i = 0; i < code.length; i++) {
        code[i].addEventListener('click', function(){copyCommand(this);});
      }

      let inputs = selectAll("input");
      for (var i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener('keyup', function(){processText(this);});
      }
}
/**
 * proceses the text from the input forms
 * @param  {[type]} element [description]
 * @return {[type]}         [description]
 */
function processText(element) {
  let inputText = element.value;

  let codeID = InputAndCode[element.id]['code'];
  let defaultText = InputAndCode[element.id]['defaultText'];

  let checkForSpaces = checkForSpace(inputText);
  if (checkForSpaces == false) {
    // No spaces
    select("#" + codeID).innerHTML = defaultText + inputText;
  }

  else if (checkForSpaces == true) {
    // We have spaces
    select("#" + codeID).innerHTML = defaultText + placeQuotesStartAndEnd(inputText);
  }
  console.log(codeID);
  console.log(defaultText);
}

(function() {
  StepOne = {
    folderLocation: function() {
      let inputResult = select("#folder").value;
      let checkResult = checkForSpace(inputResult);
      if (checkResult == false) {
        // We don't have a space
        select("#zoekFolderCommando").innerHTML = "cd " + inputResult;
      }

      else if (checkResult == true) {
        // We have a space, so we place quotes
        select("#zoekFolderCommando").innerHTML = "cd " + placeQuotesStartAndEnd(inputResult);
      }

    },
    cloneURL: function() {
      let inputResult = select("#cloneUrl").value;
      let checkResult = checkForSpace(inputResult);

      if (checkResult == false) {
        // No spacces
        select("#cloneCommand").innerHTML = "git clone " + inputResult
      }

      else if (checkResult == true) {
        // we ahev spaces
        select("#cloneCommand").innerHTML = "git clone " + placeQuotesStartAndEnd(inputResult);
      }

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
 * Places quotes around a string
 * @param  {[string]} string [The string we want to add the quotes]
 * @return {[string]}        [The string with the quotes]
 */
function placeQuotesStartAndEnd(string) {
  let stringArray = string.split('');
  stringArray.unshift('"');
  stringArray.push('"');
  let stringResult = stringArray.join('');

  return(stringResult);
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
    disableButtons();
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
    disableButtons();
  }

  else {
    // We can't go back
  }
}

/**
 * checks if we are in the last step or if we are at 0 If we are, we disable the button
 */
function disableButtons() {
  select("#previousStep").removeAttribute("disabled");
  select("#nextStep").removeAttribute("disabled");
  // We first enable them so we can later enable them
  if (currentStep == 0) {
    select("#previousStep").setAttribute("disabled", "disabled");
  }

  if (currentStep == maxSteps) {
    select("#nextStep").setAttribute("disabled", "disabled");
  }
}

function copyCommand(element) {
  select("#tmpInput").value = element.innerHTML;
  let textInput = select("#tmpInput");
  textInput.focus();
  textInput.select();
  document.execCommand("Copy");
  alert("Copied the text: " + textInput.value);
}
