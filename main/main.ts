import { YocoPayCustomerDto } from "../types/yoco"
import { initYoco, popUpYoco } from "./yoco"

(async () => {
     const amount = sessionStorage.getItem('poAmmount')?.toString()
     //  @ts-ignore 
     const amountInCents = Math.ceil(parseInt(amount) * 100);
     const publicKey = 'pk_test_ed3c54a6gOol69qa7f45' // Cahnge this when going live
     console.log(amountInCents, amount)
     const Afliate = false;
     const emptyfields = []
     // let metadata: YocoPayCustomerDto
     let customerData: YocoPayCustomerDto
     //   Signup form 
     const registerForm = document.getElementById("po-signup-form");
     // Yoco Form 
     const title = document.getElementById("po-title");
     const payAmount = document.getElementById("pay-amount");
     const yocoForm = document.getElementById("payment-form");
     yocoForm.classList.add('hidden') // Hide yoco form forst
     registerForm?.addEventListener('submit', (e) => {
          e.preventDefault();
          const customer = {}
          const formData = new FormData(document.querySelector('#po-signup-form'));
          for (const [key, value] of formData.entries()) {
               if (value !== '') {
                    console.log(key, value);
                    customer[key] = value
               } else {
                    emptyfields.push(key)
               }
          }
          const metadata = { ...customer }
          //   @ts-ignore 
          delete customer.affliate
          //   @ts-ignore 

          const description = customer.description
          //   @ts-ignore 
          delete customer.description

          const yocoData = {
               amountInCents, publicKey , metadata, customer, description
          }
          console.log(yocoData)
          yocoForm.classList.remove('hidden')
          payAmount.innerHTML = `Pay ${amountInCents}`
          registerForm.classList.add('hidden')
          title.innerHTML = 'Make Payment';

          // console.log(yocoData)
          // @ts-ignore
          initYoco(yocoData)

     })

})()



