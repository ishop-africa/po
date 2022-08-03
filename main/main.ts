import { YocoPayCustomerDto } from "../types/yoco"
import { initYoco,  } from "./yoco"

(async () => {
     var yoco = document.createElement('script');
     yoco.src = 'https://js.yoco.com/sdk/v1/yoco-sdk-web.js';
     document.head.appendChild(yoco);

     let afliateToekn = ""
     const query = window.location.search;
     const urlParams = new URLSearchParams(query);
     ////consolele.log(urlParams.get('al'));
     if (urlParams.get('al')) {
          const al = urlParams.get('al');
          afliateToekn = al;
     }
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
          yocoForm.classList.remove('hidden')
          // payAmount.innerHTML = `Pay ${amountInCents}`
          registerForm.classList.add('hidden')
          title.innerHTML = 'Make Payment';

          // @ts-ignore
          initYoco(yocoData)

     })

})()



