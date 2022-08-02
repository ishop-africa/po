import { PaymentDetailsDto, PaymentResponse } from "../types/yoco";

export class PaymentsService {
    url: string = "http://localhost:6790/";
    response: PaymentResponse;
    
    constructor(private yapeeKey: string){}

    async YocoPayment(data: PaymentDetailsDto): Promise<PaymentResponse> {
        try {
        const pay = await fetch(`${this.url}rec`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.yapeeKey
            },
            body: JSON.stringify(data)
        });
        this.response = await pay.json();
    } catch (error) {
        this.response = {
            success: false,
            message: error.message

        }
        console.log(error)
    }
    return this.response;
}
    
}