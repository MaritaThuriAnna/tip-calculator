const amountInput = document.getElementById('amount');
const tipButtons = document.querySelectorAll('.tip-btn');
const customTipInput = document.getElementById('customTipButton');
const calculateBtn = document.getElementById('calculateButton');
const resetBtn = document.getElementById('resetButton');

let isCustomTip = false;
let tipPercentage = 0;

tipButtons.forEach(button => {
    button.addEventListener('click', function (event) {
        tipPercentage = parseInt(event.target.getAttribute('data-percent'));
        customTipInput.value = '';
        isCustomTip = false;

        console.log("Selected tip percentage: " + tipPercentage + "%");

        tipButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
    });
});


customTipInput.addEventListener('input', function () {
    const customTipValue = parseFloat(customTipInput.value);

    if (!isNaN(customTipValue) && customTipValue >= 0 && customTipValue <= 100) {
        isCustomTip = true;
        tipPercentage = customTipValue;
        console.log("Custom tip amount: " + customTipValue);
        tipButtons.forEach(button => button.classList.remove('active'));
    }
    else {
        console.log("Please enter a valid tip amount between 0 and 100!");
    }
});

function calcTipAmount(billTotal, tipPercentage) {
    if (!isNaN(billTotal) && billTotal > 0 && !isNaN(tipPercentage)) {
        const tipAmount = billTotal * (tipPercentage / 100).toFixed(2);
        console.log("Tip Amount: " + tipAmount);
        return parseFloat(tipAmount);
    } else {
        console.log("Please enter a valid bill amount and select a valid tip percentage.");
        return 0;
    }
}


calculateBtn.addEventListener('click', function () {
    const billTotal = parseFloat(amountInput.value);

    if (!isNaN(billTotal) && billTotal > 0) {
        console.log("Entered bill total: " + billTotal.toFixed(2));
        let tip = calcTipAmount(billTotal, tipPercentage);
        sum = billTotal + tip;
        console.log("Sum to pay: " + sum);
    } else {
        console.log("Please enter a valid bill amount.");
    }
});

resetBtn.addEventListener('click', function () {
    amountInput.value = '';
    customTipInput.value = '';
    tipPercentage = 0;
    tipButtons.forEach(button => button.classList.remove('active'));

    console.log("Form has been reset.");
});