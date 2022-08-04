import { PaymentDetailsDto } from './../types/yoco.d';
import { YocoInputDto } from "../types/yoco";
import { PaymentsService } from "./payment-auth";
import {auth} from './key'
const paynow = (data: PaymentDetailsDto) => {
    // Read api key from key.json
    const key = auth.key;
    const url = auth.url;
    const payments = new PaymentsService(key,url);
    payments.YocoPayment(data);
   console.log({auth})
}
export const initYoco = (data: YocoInputDto) => {
    // @ts-ignore 
    var sdk = new window.YocoSDK({
        publicKey: auth.publicKey // Cahnge this when going live
      });
    
      // Create a new dropin form instance
      var inline = sdk.inline({
        layout: 'basic',
        amountInCents: data.amountInCents,
        metadata: data.metadata,
        description: data.description,
        customer: data.customer,
        currency: 'ZAR'
      });
      // this ID matches the id of the element we created earlier.
      inline.mount('#card-frame');
 
      var form = document.getElementById('payment-form');
      var submitButton = document.getElementById('pay-button');
      form.addEventListener('submit', function (event) {
        event.preventDefault()
        // Disable the button to prevent multiple clicks while processing
        // @ts-ignore
        submitButton.disabled = true;
        // This is the inline object we created earlier with the sdk
        inline.createToken().then(function (result) {
          // Re-enable button now that request is complete
          // (i.e. on success, on error and when auth is cancelled)
        // @ts-ignore

          submitButton.disabled = false;
          if (result.error) {
            const errorMessage = result.error.message;
            errorMessage && alert("error occured: " + errorMessage);
          } else {
            const token = result;
            paynow({
              amountInCents: data.amountInCents,
              currency: 'ZAR',
              token: token.id,
              metadata: data.metadata,
              customer: data.customer,
            })
            alert("card successfully tokenised: " + token.id);
          }
        }).catch(function (error) {
          // Re-enable button now that request is complete
        // @ts-ignore

          submitButton.disabled = false;
          alert("error occured: " + error);
        });
      });
    
}

export const popUpYoco = () => {
  // @ts-ignore 
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
        // This function returns a token that your server can use to capture a payment
        if (result.error) {
          const errorMessage = result.error.message;
          alert("error occured: " + errorMessage);
        } else {
          alert("card successfully tokenised: " + result.id);
        }
        // In a real integration - you would now pass this chargeToken back to your
        // server along with the order/basket that the customer has purchased.
      }
    })
  });
}
