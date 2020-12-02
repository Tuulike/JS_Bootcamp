let runningTotal = 0;
let buffer = "0"; // mitä näkyy näytöllä
let previousOperator = null;

const screen = document.querySelector('.screen');

//2. Onko nappi, jota on painettu arvoltaan numero vai symboli:
function buttonClick(value) {
  if (isNaN(value)) {
    // this is not a number
    handleSymbol(value);
  }
  else {
    // this is a number
    handleNumber(value);
  }
    screen.innerText = buffer;   // Numerot näkyviin ruudulle
}

// 4. Symbolien käsittely: Käydään läpi kaikki symbolit:
function handleSymbol(symbol){
  /*if (symbol === 'C') {
    buffer = '0';
    runningTotal = 0;
  }*/
  //console.log('handleSymbol', symbol);
  switch (symbol) {
    case 'C':
      buffer = '0';
      runningTotal = 0;
      break;
    case '=':
      if (previousOperator === null) {
        // matikkaan tarvitaan kaksi numeroa..
        return;
      }
      flushOperation(parseInt(buffer));
      previousOperator = null;
      buffer = runningTotal;
      runningTotal = 0;
      break;
    case '←':
      if (buffer.length === 1) {
        buffer = '0';
      } else {
        buffer = buffer.substring(0, buffer.length -1); // vähennetään yksi 'string' lopusta
      }
      break;
    case '+':
    case '−':
    case '×':
    case '÷':
      handleMath(symbol);
      break;

  }
}

// 5. pysytään kärryllä, mitä nappuloita on painettu
function handleMath(symbol){
  //console.log('handleMath', symbol);
  if (buffer === '0') {  // do nothing
    return;
  }

  const intBuffer = parseInt(buffer);  //string numeroksi

  if (runningTotal === 0) {
    runningTotal = intBuffer;  // näytetään '0', jos ei vielä ole tehty mitään laskutoimitusta
  } else {
    flushOperation(intBuffer); //tähän tehdään muualla laskutoimitukset
  }

  previousOperator = symbol; // Pidetään symboli mielessä

  buffer = '0'; // jos painetaan esim. '+', näkyy ruudulla 0.
}

//6. Tässä funktiossa tehdään laskutoimitukset:
function flushOperation(intBuffer) {
  if (previousOperator === '+') {
    runningTotal += intBuffer;
  } else if (previousOperator === '−') {
    runningTotal -= intBuffer;
  } else if (previousOperator === '×') {
    runningTotal *= intBuffer;
  } else {
    runningTotal /= intBuffer;
  }
  //console.log('runningTotal', runningTotal);
}

// 3. Numeroiden käsittely: Mudostetaan numeroista string-jono:
function handleNumber(numberString){
  if (buffer === "0") {
    buffer = numberString;
  } else {
    buffer += numberString;
  }
}

 /// 1. set up: Missä calc-buttoneiden 'click' eventtejä käsitellään: buttonClick()
function init () {
  document.querySelector('.calc-buttons')
    .addEventListener('click', function(event) {
      buttonClick(event.target.innerText);
    })
}

init();
