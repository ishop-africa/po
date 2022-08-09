import { ShopingOrderSuccessfull } from "../templates/index";
import { AuthSecrets, PaymentDetailsDto, PaymentResponse } from "../types/yoco";

export class PaymentsService {
    // url: string = "http://localhost:6790/";
    response: PaymentResponse;
    loader = document.getElementById('po-loader-cover-container')
    constructor(private yapeeKey: string, private url: string) { }

    async YocoPayment(data: PaymentDetailsDto, shoper: boolean = false): Promise<PaymentResponse> {
        try {
            const strings = JSON.stringify(data)
            // Change this endpoint at some point when stablizing the sysyem.
            const endpoint = 'shippingAddress' in data.metadata ? 'rec' : 'rec';
            const pay = await fetch(`${this.url}${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer  ' + this.yapeeKey
                },
                body: JSON.stringify(data)
            });
            //console.log(data)
            this.response = await pay.json().then(res => res);
            this.congrate(this.response);


        } catch (error) {
            this.response = {
                success: false,
                message: error.message

            }
            //console.log(error)
        }
        return this.response;
    }
    congrate(response: PaymentResponse) {
        if (response.success) {
            document.getElementById('po-loader-cover-container').classList.add('hidden')
            
            if ('shippingAddress' in response.data.metadata) {
                // process shopper welcome information here
                document.getElementById('PaymentDiv').classList.toggle('hidden')
                const successOrder = document.getElementById('order-success')
                const { firstName } = response.data.metadata;
                successOrder.innerHTML = ShopingOrderSuccessfull(`${firstName}`);
                document.getElementById('OrderSuccess').classList.toggle('hidden')
                document.getElementById('orderComplete').addEventListener('click', () => { })

            } else {

                const { metadata, customer } = response.data;
                document.getElementById('userName').innerHTML = customer.firstName;
                if (metadata.affliate === "yes") {
                    document.getElementById("isAfflite").classList.toggle("hidden");
                    document.getElementById("isAfflite").innerHTML = `and your alfliation link`
                }
                document.getElementById('congratulations').classList.toggle('hidden');
                document.getElementById('payment-form').classList.toggle('hidden');
                document.getElementById('po-title').classList.toggle('hidden');
            }


        } else {
            alert("payment failed Please Try Again")
            document.getElementById('po-loader-cover-container').classList.toggle('hidden')
        }
    }

    async getClientKeys(provider: string='YOCO'): Promise<AuthSecrets> {
        try {
            const keys = await fetch(`${this.url}auth-client-keys`, {
                method: 'POST',
                body: JSON.stringify({provider}),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + this.yapeeKey
                }
            });
            const resp = await keys.json().then(res => res);
            console.log(resp)
            sessionStorage.setItem('yapee-00', resp.secrets.pubKey);
            return resp
        } catch (error) {
            console.log({error, provider})
        }
    }
    async  getPubKey(): Promise<string> {
        const key = sessionStorage.getItem('yapee-00');
        if (key) {
            console.log(key)
            return key;
        }else{
            await this.getClientKeys();
        }
        return sessionStorage.getItem('yapee-00');
    }
}