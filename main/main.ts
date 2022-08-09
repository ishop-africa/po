import { YocoPayCustomerDto } from "../types/yoco"
import { initYoco, } from "./yoco"
import { curencies } from './curencies'
import {makePopup} from "./popup"
import { EshopPayments } from "./estore";
let isLoading = false;
const loader = document.createElement('div');
loader.id="po-loader-cover-container";
loader.style.width='100vw';
loader.style.height='100vH';
loader.style.opacity="0.5";
loader.innerHTML=`<div  class='po-loader-cover'>
<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
</div>`;
document.body.appendChild(loader);
if(isLoading) {  loader.classList.toggle('hidde');} else{  loader.classList.add('hidde');}
loader.classList.add('hidden');
(async () => {
     makePopup();
     await curencies()
     await EshopPayments()
     var yoco = document.createElement('script');
     yoco.src = 'https://js.yoco.com/sdk/v1/yoco-sdk-web.js';
     document.head.appendChild(yoco);
     const money = document.getElementById('make-money-with-peter-oracle');
    if(money) {
     money.classList.remove('hidden');
     let afliateToekn = ""
     const query = window.location.search;
     const urlParams = new URLSearchParams(query);
     ////consolele.log(urlParams.get('al'));
     if (urlParams.get('al')) {
          const al = urlParams.get('al');
          afliateToekn = al;
     }
   
 
          // makeMoneyithOracle.appendChild(makDiv);
         
          // makemoneyOnline.appendChild(document.createElement(makeMoneyithOracle))
          const congratsDiv = document.getElementById('congratulations');
          congratsDiv.classList.add('hidden');
          document.getElementById("isAfflite").classList.toggle("hidden");
          const amount = sessionStorage.getItem('poAmmount')?.toString()
          //  @ts-ignore 
          const amountInCents = Math.ceil(parseInt(amount) * 100);
          const publicKey = 'pk_test_ed3c54a6gOol69qa7f45' // Cahnge this when going live
          ////consolele.log(amountInCents, amount)
          const Afliate = false;
          const emptyfields = []
          // let metadata: YocoPayCustomerDto
          let customerData: YocoPayCustomerDto
          //   Signup form 
          const registerForm = document.getElementById("po-signup-form");
          // Yoco Form 
          const title = document.getElementById("po-title");
          // const payAmount = document.getElementById("pay-amount");
          const yocoForm = document.getElementById("payment-form");
          yocoForm.classList.add('hidden') // Hide yoco form forst
          registerForm?.addEventListener('submit', (e) => {
               loader.classList.toggle('hidde');
               e.preventDefault();
               const customer = {}
             
               const formData = new FormData(document.querySelector('#po-signup-form'));
               for (const [key, value] of formData.entries()) {
                    if (value !== '') {
                         ////consolele.log(key, value);
                         customer[key] = value
                    } else {
                         emptyfields.push(key)
                    }
               }
               (afliateToekn !== "") ? customer['affiliate_token'] = afliateToekn : null

               const metadata = { ...customer, }
               //   @ts-ignore 
               delete customer.affliate
               //   @ts-ignore 

               const description = customer.description
               //   @ts-ignore 
               delete customer.description

               const yocoData = {
                    amountInCents, publicKey, metadata, customer, description
               }
                // @ts-ignore
                initYoco(yocoData)
                loader.classList.remove('hidden')
                setTimeout(()=> {
                    yocoForm.classList.remove('hidden')
                    // payAmount.innerHTML = `Pay ${amountInCents}`
                    registerForm.classList.add('hidden')
                    title.innerHTML = 'Make Payment';
                    loader.classList.add('hidden')
                },4000)
             
               // setTimeout(() => {
               //      loader.classList.add('hidde'); 
               //  },4000)
 
              


          })
     }
})()



