var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { initYoco } from "./yoco";
(() => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let afliateToekn = "";
    const query = window.location.search;
    const urlParams = new URLSearchParams(query);
    console.log(urlParams.get('al'));
    if (urlParams.get('al')) {
        const al = urlParams.get('al');
        afliateToekn = al;
    }
    const congratsDiv = document.getElementById('congratulations');
    congratsDiv.classList.add('hidden');
    document.getElementById("isAfflite").classList.toggle("hidden");
    const amount = (_a = sessionStorage.getItem('poAmmount')) === null || _a === void 0 ? void 0 : _a.toString();
    const amountInCents = Math.ceil(parseInt(amount) * 100);
    const publicKey = 'pk_test_ed3c54a6gOol69qa7f45';
    console.log(amountInCents, amount);
    const Afliate = false;
    const emptyfields = [];
    let customerData;
    const registerForm = document.getElementById("po-signup-form");
    const title = document.getElementById("po-title");
    const payAmount = document.getElementById("pay-amount");
    const yocoForm = document.getElementById("payment-form");
    yocoForm.classList.add('hidden');
    registerForm === null || registerForm === void 0 ? void 0 : registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const customer = {};
        const formData = new FormData(document.querySelector('#po-signup-form'));
        for (const [key, value] of formData.entries()) {
            if (value !== '') {
                console.log(key, value);
                customer[key] = value;
            }
            else {
                emptyfields.push(key);
            }
        }
        (afliateToekn !== "") ? customer['affiliate_token'] = afliateToekn : null;
        const metadata = Object.assign({}, customer);
        delete customer.affliate;
        const description = customer.description;
        delete customer.description;
        const yocoData = {
            amountInCents, publicKey, metadata, customer, description
        };
        console.log(yocoData);
        yocoForm.classList.remove('hidden');
        payAmount.innerHTML = `Pay ${amountInCents}`;
        registerForm.classList.add('hidden');
        title.innerHTML = 'Make Payment';
        console.log(yocoData);
        initYoco(yocoData);
    });
}))();
