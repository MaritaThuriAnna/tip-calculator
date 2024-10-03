const amountInput = document.getElementById('amount');
const tipButtons = document.querySelectorAll('.tip-btn');
const customTipInput = document.getElementById('customTipButton');
const calculateBtn = document.getElementById('calculateButton');
const resetBtn = document.getElementById('resetButton');
const tipAmountDisplay = document.getElementById('tipAmount');
const finalBillDisplay = document.getElementById('finalAmount');


const tippingDetails = document.getElementById('tipping-details');
const splitAmountDisplay = document.getElementById('split-amount');
const personTippingAmountDisplay = document.getElementById('person-tipping-amount');
const otherPersonAmountDisplay = document.getElementById('other-person-amount');

const partySizeInput = document.getElementById('partySize');
const onePersonTipCheckbox = document.getElementById('onePersonTip');
const splitEquallyCheckbox = document.getElementById('splitEqually');
const splitDetails = document.getElementById('split-details');
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
    const partySize = parseInt(partySizeInput.value) || 1; 
    const onePersonTips = onePersonTipCheckbox.checked; 
    const splitEqually = splitEquallyCheckbox.checked; 

    if (!isNaN(billTotal) && billTotal > 0) {
        console.log("Entered bill total: " + billTotal.toFixed(2));

        const tip = calcTipAmount(billTotal, tipPercentage);
        const totalAmount = billTotal + tip;
        
        if (onePersonTips) {
            const billPerPerson = billTotal / partySize;
            const personTippingAmount = billPerPerson + tip; 
            const otherPersonAmount = billPerPerson.toFixed(2); 
            
            personTippingAmountDisplay.textContent = personTippingAmount.toFixed(2);
            otherPersonAmountDisplay.textContent = otherPersonAmount; 
            tippingDetails.style.display = 'block'; 
            splitDetails.style.display = 'none'; 

        } else if (splitEqually) {
            const splitAmount = (totalAmount / partySize).toFixed(2); 
            splitAmountDisplay.textContent = splitAmount; 
            splitDetails.style.display = 'block'; 
            tippingDetails.style.display = 'none'; 
        } else {
            tippingDetails.style.display = 'none';
            splitDetails.style.display = 'none';
        }

        tipAmountDisplay.textContent = tip.toFixed(2);
        finalBillDisplay.textContent = totalAmount.toFixed(2);

        console.log("Sum to pay: " + totalAmount);
    } else {
        console.log("Please enter a valid bill amount.");
    }
});

resetBtn.addEventListener('click', function () {
    amountInput.value = '';
    customTipInput.value = '';
    tipPercentage = 0;
    tipButtons.forEach(button => button.classList.remove('active'));

    tipAmountDisplay.textContent = '0.00';
    finalBillDisplay.textContent = '0.00';

    partySizeInput.value = '1';
    personTippingAmountDisplay.textContent = '0.00'; 
    otherPersonAmountDisplay.textContent = '0.00'; 
    splitAmountDisplay.textContent = '0.00'; 
    tippingDetails.style.display = 'none'; 
    splitDetails.style.display = 'none'; 

    console.log("Form has been reset.");
});

