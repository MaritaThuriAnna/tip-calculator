const amountInput = document.getElementById('amount');
const tipButtons = document.querySelectorAll('.tip-btn');


function calcTipAmount(billTotal, tipPercentage){
    if(!isNaN(billTotal) && billTotal > 0 && !isNaN(tipPercentage)){
        const tipAmount = billTotal * (tipPercentage / 100).toFixed(2);
        console.log("Tip Amount: " + tipAmount);
    }else {
        console.log("Please enter a valid bill amount and select a valid tip percentage.");
    }
}

tipButtons.forEach(button => {
    button.addEventListener('click', function(event) {
        const tipPercentage = parseInt(event.target.getAttribute('data-percent'));
        const billTotal = parseFloat(amountInput.value);

        if (!isNaN(billTotal) && billTotal > 0) {
            console.log("Entered bill total: " + billTotal.toFixed(2));
            calcTipAmount(billTotal, tipPercentage);
        } else {
            console.log("Please enter a valid bill amount.");
        }

        console.log("Selected tip percentage: " + tipPercentage );
    });
});
