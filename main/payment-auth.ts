import { PaymentDetailsDto, PaymentResponse } from "../types/yoco";

export class PaymentsService {
    // url: string = "http://localhost:6790/";
    response: PaymentResponse;
    constructor(private yapeeKey: string, private url: string){}

    async YocoPayment(data: PaymentDetailsDto, shoper:boolean=false): Promise<PaymentResponse> {
        try {
            const strings= JSON.stringify(data)
            const endpoint = 'shippingAddress' in data.metadata ? 'rec' : 'rec';
        const pay = await fetch(`${this.url}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer  ' + this.yapeeKey
            },
            body: JSON.stringify(data)
        });
        console.log(data)
        this.response = await pay.json().then(res => res);
        this.congrate(this.response);
        console.log(this.response);
        document.getElementById('po-loader-cover-container').classList.toggle('hidden')
        
        console.log({data, strings})
      
    } catch (error) {
        this.response = {
            success: false,
            message: error.message

        }
       console.log(error)
    }
    return this.response;
}
    congrate(response: PaymentResponse) {
        if (response.success) {
            alert("payment successful")
            const {metadata, customer} = response.data;
            document.getElementById('po-loader-cover-container').classList.toggle('hidden')
            document.getElementById('userName').innerHTML = customer.firstName;
            if(metadata.affliate ==="yes") {
                document.getElementById("isAfflite").classList.toggle("hidden");
                document.getElementById("isAfflite").innerHTML = `and your alfliation link`
            }
           document.getElementById('congratulations').classList.toggle('hidden');
           document.getElementById('payment-form').classList.toggle('hidden');
           document.getElementById('po-title').classList.toggle('hidden');
        
        } else {
            alert("payment failed Please Try Again")
            document.getElementById('po-loader-cover-container').classList.toggle('hidden')
        }
    }
}