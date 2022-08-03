import { PaymentDetailsDto, PaymentResponse } from "../types/yoco";

export class PaymentsService {
    // url: string = "http://localhost:6790/";
    response: PaymentResponse;
    
    constructor(private yapeeKey: string, private url: string){}

    async YocoPayment(data: PaymentDetailsDto): Promise<PaymentResponse> {
        try {
        const pay = await fetch(`${this.url}rec`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer  ' + this.yapeeKey
            },
            body: JSON.stringify(data)
        });
        this.response = await pay.json().then(res => res);
        this.congrate(this.response);
    } catch (error) {
        this.response = {
            success: false,
            message: error.message

        }
        console.log(error)
    }
    console.log(this.response)
    return this.response;
}
    congrate(response: PaymentResponse) {
        if (response.success) {
            const {metadata, customer} = response.data;
            console.log(response)
            document.getElementById('userName').innerHTML = customer.firstName;
            if(metadata.affliate ==="yes") {
                document.getElementById("isAfflite").classList.toggle("hidden");
                document.getElementById("isAfflite").innerHTML = `and your alfliation link`
            }
           document.getElementById('congratulations').classList.toggle('hidden');
           document.getElementById('payment-form').classList.toggle('hidden');
           document.getElementById('po-title').classList.toggle('hidden');
        } else {
            alert("payment failed")
        }
    }
}