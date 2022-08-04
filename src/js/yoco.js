var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { PaymentsService } from "./payment-auth";
import { auth } from './key';
const paynow = (data) => {
    const key = auth.key;
    const url = auth.url;
    const payments = new PaymentsService(key, url);
    payments.YocoPayment(data);
};
export const initYoco = (data) => __awaiter(void 0, void 0, void 0, function* () {
    var sdk = yield new window.YocoSDK({
        publicKey: auth.publicKey
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
});
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
