const currencyElOne = document.getElementById('currency-one');
const amountElOne = document.getElementById('amount-one');
const currencyElTwo = document.getElementById('currency-two');
const amountElTwo = document.getElementById('amount-two');
const rateEl = document.getElementById('rate');
const swap = document.getElementById('swap');


// Fetch exchange rates and update the DOM
function calculate() {
  const currencyOne = currencyElOne.value;
  const currencyTwo = currencyElTwo.value;

  fetch(`https://open.exchangerate-api.com/v6/latest/${currencyOne}`)
    .then(res => res.json())
    .then(data => {
      // console.log(data);
      const rate = data.rates[currencyTwo]
      rateEl.textContent = `1 ${currencyOne} = ${rate} ${currencyTwo}`;
      amountElTwo.value = (amountElOne.value * rate).toFixed(2);
    });
}


function swapCurrencies() {
  // const temp = currencyElOne.value;
  // currencyElOne.value = currencyElTwo.value;
  // currencyElTwo.value = temp;
  [currencyElOne.value, currencyElTwo.value] = [currencyElTwo.value, currencyElOne.value]
  
  calculate();
}


// Event Listeners
currencyElOne.addEventListener('change', calculate);
amountElOne.addEventListener('input', calculate);
currencyElTwo.addEventListener('change', calculate);
amountElTwo.addEventListener('input', calculate);
swap.addEventListener('click', swapCurrencies);

calculate();
