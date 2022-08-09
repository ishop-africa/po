import { YocoPayCustomerDto } from "../types/yoco"
import { initYoco, } from "./yoco"
import { curencies } from './curencies'
import {makePopup} from "./popup"
import { EshopPayments } from "./estore";
const loader = document.createElement('div');
loader.id="po-loader-cover-container";
loader.style.width='100vw';
loader.style.height='100vH';
loader.style.opacity="0.5";
loader.innerHTML=`<div  class='po-loader-cover'>
<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
</div>`;
document.body.appendChild(loader);
loader.classList.add('hidden');
(async () => {
     makePopup();
     await EshopPayments()
     await curencies()
     var yoco = document.createElement('script');
     yoco.src = 'https://js.yoco.com/sdk/v1/yoco-sdk-web.js';
     document.head.appendChild(yoco);
     const money = document.getElementById('make-money-with-peter-oracle');
    if (money) {
     money.classList.toggle('hidden');
     let afliateToekn = ""
     const query = window.location.search;
     const urlParams = new URLSearchParams(query);
     // if registering with afliate link collact the link
     if (urlParams.get('al')) {
          afliateToekn = urlParams.get('al');
     }
   
          const congratsDiv = document.getElementById('congratulations');
          congratsDiv.classList.add('hidden');
          document.getElementById("isAfflite").classList.toggle("hidden");
          const amount = sessionStorage.getItem('poAmmount')?.toString()
          //  @ts-ignore 
          const amountInCents = Math.ceil(parseInt(amount) * 100);
          const Afliate = false;
          const emptyfields = []
          // let metadata: YocoPayCustomerDto
          let customerData: YocoPayCustomerDto
          //   Signup form 
          const registerForm = document.getElementById("po-signup-form");
          // Yoco Form 
          const title = document.getElementById("po-title");
          const yocoForm = document.getElementById("payment-form");
          yocoForm.classList.add('hidden') // Hide yoco form forst
          registerForm?.addEventListener('submit', (e) => {
               loader.classList.toggle('hidde');
               e.preventDefault();
               const customer = {}
             
               const formData = new FormData(document.querySelector('#po-signup-form'));
               for (const [key, value] of formData.entries()) {
                    if (value !== '') {
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
                    amountInCents, metadata, customer, description
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
          })
     }
})()



