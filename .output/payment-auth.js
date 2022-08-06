var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ShopingOrderSuccessfull } from "../templates/index";
export class PaymentsService {
    constructor(yapeeKey, url) {
        this.yapeeKey = yapeeKey;
        this.url = url;
        this.loader = document.getElementById('po-loader-cover-container');
    }
    YocoPayment(data, shoper = false) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const strings = JSON.stringify(data);
                const endpoint = 'shippingAddress' in data.metadata ? 'rec' : 'rec';
                const pay = yield fetch(`${this.url}${endpoint}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer  ' + this.yapeeKey
                    },
                    body: JSON.stringify(data)
                });
                this.response = yield pay.json().then(res => res);
                this.congrate(this.response);
            }
            catch (error) {
                this.response = {
                    success: false,
                    message: error.message
                };
            }
            return this.response;
        });
    }
    congrate(response) {
        if (response.success) {
            document.getElementById('po-loader-cover-container').classList.add('hidden');
            if ('shippingAddress' in response.data.metadata) {
                document.getElementById('PaymentDiv').classList.toggle('hidden');
                const successOrder = document.getElementById('order-success');
                const { firstName } = response.data.metadata;
                successOrder.innerHTML = ShopingOrderSuccessfull(`${firstName}`);
                document.getElementById('OrderSuccess').classList.toggle('hidden');
                document.getElementById('orderComplete').addEventListener('click', () => { });
            }
            else {
                const { metadata, customer } = response.data;
                document.getElementById('userName').innerHTML = customer.firstName;
                if (metadata.affliate === "yes") {
                    document.getElementById("isAfflite").classList.toggle("hidden");
                    document.getElementById("isAfflite").innerHTML = `and your alfliation link`;
                }
                document.getElementById('congratulations').classList.toggle('hidden');
                document.getElementById('payment-form').classList.toggle('hidden');
                document.getElementById('po-title').classList.toggle('hidden');
            }
        }
        else {
            alert("payment failed Please Try Again");
            document.getElementById('po-loader-cover-container').classList.toggle('hidden');
        }
    }
}
