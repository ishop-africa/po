const initYoco = (data) => {
    var sdk = new window.YocoSDK({
        publicKey: data.publicKey
    });

    // Create a new dropin form instance
    var inline = sdk.inline({
        layout: 'basic',
        amountInCents: data.amountInCents,
        metadata: data.metadata,
        customer: data.customer,
        currency: 'ZAR'
    });
    // this ID matches the id of the element we created earlier.
    inline.mount('#card-frame');

    var form = document.getElementById('payment-form');

    // Run our code when your form is submitted
    var submitButton = document.getElementById('pay-button');
    form.addEventListener('submit', function (event) {
        event.preventDefault()
        // Disable the button to prevent multiple clicks while processing
        submitButton.disabled = true;
        // This is the inline object we created earlier with the sdk
        inline.createToken().then(function (result) {
            // Re-enable button now that request is complete
            // (i.e. on success, on error and when auth is cancelled)
            submitButton.disabled = false;
            if (result.error) {
                const errorMessage = result.error.message;
                errorMessage && alert("error occured: " + errorMessage);
            } else {
                const token = result;
                // Send the data to the backend here
                
                alert("card successfully tokenised: " + token.id);
            }
        }).catch(function (error) {
            // Re-enable button now that request is complete
            submitButton.disabled = false;
            alert("error occured: " + error);
        });
    });
}

export default initYoco