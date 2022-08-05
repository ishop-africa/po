import { CartItems } from '../types/estore';
import { EshopService } from './services/eshop-service';
export const EshopPayments = async () => {
    const bsJs = document.createElement("script")
    const bsCss = document.createElement('link')
    bsCss.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css';
    bsCss.integrity = 'sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3';
    bsCss.crossOrigin = 'anonymous'
    var CART: CartItems[] = [];
    bsJs.src = "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js";
    bsJs.integrity = "sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p";
    bsJs.crossOrigin = "anonymous";
    // for development only hook these elements to the head of the page

    const eshopPaymentForm = document.getElementById("po-payment-form")
    if (eshopPaymentForm) {
        const service = await new EshopService(CART)
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
                    service.addToCart({name, category, unitPrice})
                    console.log(service.getCart())
                    service.calculateTotal('amountInCents').then(d=> console.log(d.option/100))
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
        document.head.appendChild(bsCss)
        document.head.appendChild(bsJs)
    }

}

