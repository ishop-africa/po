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
    constructor(yapeeKey) {
        this.yapeeKey = yapeeKey;
        this.url = "http://localhost:6790/";
    }
    YocoPayment(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pay = yield fetch(`${this.url}rec`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + this.yapeeKey
                    },
                    body: JSON.stringify(data)
                });
                this.response = yield pay.json();
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
}
