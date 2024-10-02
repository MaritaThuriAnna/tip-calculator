const amountInput = document.getElementById('amount');
const tipButtons = document.querySelectorAll('.tip-btn');

tipButtons.forEach(button => {
    button.addEventListener('click', function(event) {
        const tipPercentage = parseInt(event.target.getAttribute('data-percent'));
        const billTotal = parseFloat(amountInput.value);

        if (!isNaN(billTotal) && billTotal > 0) {
            console.log("Entered bill total: " + billTotal.toFixed(2));
        } else {
            console.log("Please enter a valid bill amount.");
        }

        console.log("Selected tip percentage: " + tipPercentage );
    });
});
