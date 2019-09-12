const INPUT_SCREEN = document.querySelector(".calculator__screen__input");
const OUTPUT_SCREEN = document.querySelector(".calculator__screen__calculated");
const BTNS = document.querySelectorAll('.btn');
let equationExt = ''; // string of what user sees
let equationInt = ''; // string that js uses to calculate
let result;

function displayInput(num) {
  INPUT_SCREEN.textContent = num;
}

function displayOutput(num) {
  OUTPUT_SCREEN.textContent = num;
}

function startCalc() {
  BTNS.forEach(function(btn){
    btn.addEventListener('click', function(){
      let value = btn.dataset.value;
      let type = btn.dataset.type;
      let display = btn.dataset.display;
      updateEquation(type, value, display);
    });
  });
}

function updateEquation(type, value, display) {
  // an operator or = sign cannot be the first entry by user
  if (equationInt.length == 0) {
    if (type == 'operator' || type == 'result')
      return;
  }

  if (type == 'clear') { // clears equations string
    equationExt = '';
    equationInt = '';
    result = '';
    displayInput(`${equationExt}`);
    displayOutput(`${result}`);
  } else if (type == 'result') { // calls func that does actual math
    // calc result
    result = calculate(equationInt);
    if (result == NaN || result == Infinity) {
      result = 'Error.';
    }
    displayOutput(result);
  } else { // otherwise keep adding to equation string
    equationExt += `${display}`;
    equationInt += `${value}`;
    displayInput(`${equationExt}`);
  }
}

// alternative to eval()
function calculate(equationInt) {
  return new Function('return ' + equationInt)();
}

startCalc();
