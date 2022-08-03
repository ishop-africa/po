import { PaymentsService } from "./payment-auth";
const paynow = (data) => {
    const payments = new PaymentsService('RyL2mrnk4KeCEHu2Z1HllQdSCkn21EDw2WBl3zArW32OQUYrfjyINzJhCq9nv5Hz', 'https://cloud.yapee.me/');
    payments.YocoPayment(data);
};
export const initYoco = (data) => {
    var sdk = new window.YocoSDK({
        publicKey: data.publicKey
    });
    var inline = sdk.inline({
        layout: 'basic',
        amountInCents: data.amountInCents,
        metadata: data.metadata,
        description: data.description,
        customer: data.customer,
        currency: 'ZAR'
    });
    inline.mount('#card-frame');
    var form = document.getElementById('payment-form');
    var submitButton = document.getElementById('pay-button');
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        submitButton.disabled = true;
        inline.createToken().then(function (result) {
            submitButton.disabled = false;
            if (result.error) {
                const errorMessage = result.error.message;
                errorMessage && alert("error occured: " + errorMessage);
            }
            else {
                const token = result;
                paynow({
                    amountInCents: data.amountInCents,
                    currency: 'ZAR',
                    token: token.id,
                    metadata: data.metadata,
                    customer: data.customer,
                });
            }
        }).catch(function (error) {
            submitButton.disabled = false;
            alert("error occured: " + error);
        });
    });
};
export const popUpYoco = () => {
    var yoco = new window.YocoSDK({
        publicKey: 'pk_test_ed3c54a6gOol69qa7f45',
    });
    var checkoutButton = document.querySelector('#checkout-button');
    checkoutButton.addEventListener('click', function () {
        yoco.showPopup({
            amountInCents: 2799,
            currency: 'ZAR',
            name: 'Your Store or Product',
            description: 'Awesome description',
            callback: function (result) {
                if (result.error) {
                    const errorMessage = result.error.message;
                    alert("error occured: " + errorMessage);
                }
                else {
                    alert("card successfully tokenised: " + result.id);
                }
            }
        });
    });
};
