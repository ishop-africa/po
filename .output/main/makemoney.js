import { yForm } from "./yoco";
const money = document.getElementById('make-money-with-peter-oracle');
const loader = document.createElement('div');
loader.id = "po-loader-cover-container";
loader.style.width = '100vw';
loader.style.height = '100vH';
loader.style.opacity = "0.6";
loader.innerHTML = `<div  class='po-loader-cover'>
<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
</div>`;
document.body.appendChild(loader);
loader.classList.add('hidden');
export const MakeMoneyOnline = () => {
    var _a;
    if (money) {
        let afliateToekn = "";
        const query = window.location.search;
        const urlParams = new URLSearchParams(query);
        if (urlParams.get('al')) {
            afliateToekn = urlParams.get('al');
        }
        const congratsDiv = document.getElementById('congratulations');
        congratsDiv.classList.add('hidden');
        document.getElementById("isAfflite").classList.toggle("hidden");
        const amount = (_a = sessionStorage.getItem('poAmmount')) === null || _a === void 0 ? void 0 : _a.toString();
        const amountInCents = Math.ceil(parseInt(amount) * 100);
        const publicKey = 'pk_test_ed3c54a6gOol69qa7f45';
        const Afliate = false;
        const emptyfields = [];
        const registerForm = document.getElementById("po-signup-form");
        const title = document.getElementById("po-title");
        const yocoForm = document.getElementById("payment-form");
        yocoForm.classList.add('hidden');
        registerForm.addEventListener('submit', (e) => {
            loader.classList.toggle('hidde');
            e.preventDefault();
            const customer = {};
            const formData = new FormData(document.querySelector('#po-signup-form'));
            for (const [key, value] of formData.entries()) {
                if (value !== '') {
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
            const yocoFormDiv = document.getElementById('YocoForm');
            yocoFormDiv.innerHTML = yForm;
            initYoco(yocoData);
            loader.classList.remove('hidden');
            setTimeout(() => {
                yocoForm.classList.remove('hidden');
                registerForm.classList.add('hidden');
                title.innerHTML = 'Make Payment';
                loader.classList.add('hidden');
            }, 4000);
        });
    }
    else {
        loader.classList.add('hidden');
    }
};
