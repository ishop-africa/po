var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class PaymentsService {
    constructor(yapeeKey, url) {
        this.yapeeKey = yapeeKey;
        this.url = url;
    }
    YocoPayment(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pay = yield fetch(`${this.url}rec`, {
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
                console.log(error);
            }
            return this.response;
        });
    }
    congrate(response) {
        if (response.success) {
            const { metadata, customer } = response.data;
            document.getElementById('userName').innerHTML = customer.firstName;
            if (metadata.affliate === "yes") {
                document.getElementById("isAfflite").classList.toggle("hidden");
                document.getElementById("isAfflite").innerHTML = `and your alfliation link`;
            }
            document.getElementById('congratulations').classList.toggle('hidden');
            document.getElementById('payment-form').classList.toggle('hidden');
            document.getElementById('po-title').classList.toggle('hidden');
            alert("payment successful");
        }
        else {
            alert("payment failed Please Try Again");
        }
    }
}
