import { CartItems } from '../types/estore';
import { EshopService } from './services/eshop-service';
export const EshopPayments = async () => {
    const bsJs = document.createElement("script")
    const bsCss = document.createElement('link')
    bsCss.href = 'https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css';
    bsCss.integrity = 'sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm';
    bsCss.crossOrigin = 'anonymous'
    const bsJQuery = document.createElement("script");
    bsJQuery.src = 'https://code.jquery.com/jquery-3.2.1.slim.min.js';
    bsJQuery.integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN";
    bsJQuery.crossOrigin="anonymous";
    var CART: CartItems[] = [];
    bsJs.src = "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js";
    bsJs.integrity = "sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p";
    bsJs.crossOrigin = "anonymous";
    const shorpingCart = document.createElement("div")
    shorpingCart.className = "container"
    shorpingCart.id = "shoppingCart"
    shorpingCart.innerHTML = `
    <div class="cartContanier" id='cartContanier' data-toggle="modal" data-target="#mbr-popup-ji">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
        <span id='cartTotal'></span>
    </div>
    `;

    // for development only hook these elements to the head of the page

    const eshopPaymentForm = document.getElementById("po-payment-form")
    if (eshopPaymentForm) {
        document.head.appendChild(bsCss)
  
        document.body.appendChild(shorpingCart)
        const service = new EshopService(CART)
        const cartTotal = document.getElementById('cartTotal')
      
        eshopPaymentForm.classList.add('hidden')
        const link = document.getElementsByTagName("a")
        /**
         * The Login in this Section extracts information form the HTML skeleton and creates a structred object CART
         */
        for (let i = 0; i < link.length; i++) {
            if (link[i].innerHTML === "Order Now") {

                link[i].addEventListener('click', (e) => {
                    e.preventDefault();
                    const pa = link[i].parentElement
                    const price = pa.parentElement.nextElementSibling.children[0].innerHTML
                    const categores = pa.parentElement.previousElementSibling.children
                    const name = categores[0].innerHTML.replace(/[\n\r]/g, ''); // remove \n
                    // @ts-ignore 
                    const category = categores[1].innerText
                    price.replace("R ", "")
                    const unitPrice = Math.ceil(parseInt(price.replace('R ', '')) * 100)
                    // console.log({ name, category, amountInCents })
                    service.addToCart({ name, category, unitPrice })
               
                    cartTotal.innerHTML = '' + service.calculateTotal('itemsInCart')
                    // eshopPaymentForm.classList.toggle('hidden')
                })
            }
        }
        eshopPaymentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(document.querySelector('#po-payment-form'));
            const customer = {}
            for (const [key, value] of formData.entries()) {
                if (value !== '') {
                    customer[key] = value
                    key.replace(' ', '_')
                    key.replace('-', '_')
                    customer[key] = value
                }
            }
            console.log(customer)
        })
        const cartContanier = document.getElementById('cartContanier')
        cartContanier.addEventListener('click', () => {
            eshopPaymentForm.classList.toggle('hidden')
        })
        document.body.appendChild(bsJQuery)
        document.body.appendChild(bsJs)
    }

}

